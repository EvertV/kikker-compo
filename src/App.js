import React, { Component } from "react";
import TableCompetitors from "./components/tableCompetitors";
import ManageCompetitors from "./components/manageCompetitors";
import RecentLogs from "./components/recentLogs";
import * as moment from "moment";
import firebase from "firebase";

class App extends Component {
  state = {
    competitors: [
      {
        name: "Mike",
        dateAdded: moment(),
        showDetailsCompetitor: false,
        logs: [
          {
            date: moment(),
            id: "Mike&&" + moment().millisecond(),
            amount: 10,
            reason: "Adje"
          }
        ]
      },
      {
        name: "Ken",
        dateAdded: moment(),
        showDetailsCompetitor: false,
        logs: [
          {
            date: moment(),
            id: "Ken&&" + moment().millisecond(),
            amount: 15,
            reason: "Kikkeren in de stoel"
          }
        ]
      },
      {
        name: "Sieger",
        dateAdded: moment(),
        showDetailsCompetitor: false,
        logs: [
          {
            date: moment(),
            id: "Sieger&&" + moment().millisecond(),
            amount: 50,
            reason: "Nen bak gekocht"
          }
        ]
      }
    ]
  };
  writeToDatabase = () => {
    this.state.competitors.forEach(competitor => {
      console.log(competitor);
      firebase
        .database()
        .ref("competitors/" + competitor.name)
        .set({
          name: competitor.name,
          dateAdded: competitor.dateAdded.format(),
          showDetailsCompetitor: competitor.showDetailsCompetitor,
          logs: competitor.logs.map(log => {
            return {
              date: log.date.format(),
              id: log.id,
              amount: log.amount,
              reason: log.reason
            };
          })
        });
    });
  };
  getFromDatabase = () => {
    const dbCompetitors = firebase.database().ref("competitors/");
    dbCompetitors.on("value", snapshot => {
      console.log(snapshot.val());
      this.updateCompetitors(snapshot.val());
    });
  };
  updateCompetitors = arrayCompetitors => {
    arrayCompetitors = Object.values(arrayCompetitors);

    arrayCompetitors = arrayCompetitors.map(competitor => {
      return {
        name: competitor.name,
        dateAdded: moment(competitor.dateAdded),
        showDetailsCompetitor: false,
        logs: competitor.logs
          ? competitor.logs.map(log => {
              return {
                date: moment(log.date),
                id: log.id,
                amount: log.amount,
                reason: log.reason
              };
            })
          : []
      };
    });

    console.log(arrayCompetitors);
    if (arrayCompetitors.length > 0)
      this.setState({ competitors: arrayCompetitors });
    console.log(this.state.competitors);
  };
  componentDidMount() {
    this.getFromDatabase();
  }
  componentWillMount() {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        databaseURL: "https://kikker-compo.firebaseio.com/"
      });
    }
  }
  render() {
    return (
      <React.Fragment>
        <div className="mt-2 page-header text-center">
          <h1 className="display-4">
            Kikker&nbsp;Compo
            <p className="text-muted lead">Gateway&nbsp;Gaming</p>
          </h1>
        </div>
        <RecentLogs competitors={this.state.competitors} />
        <div className="container">
          <ManageCompetitors
            competitors={this.state.competitors}
            onAddCompetitor={this.handleAddCompetitor}
          />
          <TableCompetitors
            competitors={this.state.competitors}
            onDeleteLogCompetitor={(name, id) =>
              this.handleDeleteLogCompetitor(name, id)
            }
            onDeleteCompetitor={name => this.handleDeleteCompetitor(name)}
            onUpdateCompetitorName={(oldName, newName) =>
              this.handleUpdateCompetitorName(oldName, newName)
            }
            onAddLogCompetitor={(name, amount, reason) =>
              this.handleAddLogCompetitor(name, amount, reason)
            }
            onCalculatePointsFromLogs={logArray =>
              this.handleCalculatePointsFromLogs(logArray)
            }
            onShowDetailsCompetitor={name =>
              this.handleShowDetailsCompetitor(name)
            }
          />
        </div>
      </React.Fragment>
    );
  }
  confirmed() {
    console.log("confirmed");
  }
  cancelled() {
    console.log("cancelled");
  }
  handleAddCompetitor = name => {
    if (
      name.trim() !== "" &&
      !this.state.competitors.some(
        c => c["name"].toLowerCase().trim() === name.toLowerCase().trim()
      ) &&
      name.length < 50
    ) {
      this.setState(prevState => ({
        competitors: [
          ...prevState.competitors,
          {
            name: name,
            dateAdded: moment(),
            showDetailsCompetitor: false,
            logs: [
              {
                date: moment(),
                reason: "Nieuwe kikker",
                id: name + "&&" + moment().millisecond(),
                amount: 1
              }
            ]
          }
        ]
      }));
      this.writeToDatabase();
      return true;
    }
    return false;
  };
  handleDeleteLogCompetitor = (name, id) => {
    var comps = this.state.competitors;
    comps.forEach(e => {
      if (e.name === name) {
        e.logs = e.logs.filter(el => el.id !== id);
      }
    });

    this.setState(prevState => ({
      competitors: comps
    }));
    this.writeToDatabase();
  };
  handleDeleteCompetitor = name => {
    this.setState(prevState => ({
      competitors: prevState.competitors.filter(el => el.name !== name)
    }));
    firebase
      .database()
      .ref("competitors/" + name)
      .remove();
  };
  handleUpdateCompetitorName = (oldName, newName) => {
    var comps = this.state.competitors;
    comps.forEach(e => {
      if (e.name === oldName) {
        e.name = newName;
      }
    });

    this.setState(prevState => ({
      competitors: comps
    }));
    this.writeToDatabase();
  };
  handleAddLogCompetitor = (name, amount, reason) => {
    if (amount !== "") {
      amount = parseInt(amount);
      if (reason && reason.length < 150 && amount !== 0) {
        var competitors = this.state.competitors;
        competitors.forEach(e => {
          if (e.name === name) {
            e.logs = [
              ...e.logs,
              {
                date: moment(),
                reason: reason,
                showDetailsCompetitor: false,
                id: name + "-log-" + moment() + "-nr-" + e.logs.length,
                amount: parseInt(amount)
              }
            ];
          }
        });
        this.setState(prevState => ({
          competitors: competitors
        }));
        this.writeToDatabase();
        return true;
      }
    }
    return false;
  };
  handleCalculatePointsFromLogs = logArray => {
    return logArray.reduce(function(totalAmount, log) {
      return totalAmount + log.amount;
    }, 0);
  };

  handleShowDetailsCompetitor = name => {
    var competitors = this.state.competitors.slice(0);
    competitors.map(e => {
      if (e.name === name) {
        e.showDetailsCompetitor = !e.showDetailsCompetitor;
      } else {
        e.showDetailsCompetitor = false;
      }
      return e;
    });

    this.setState({ competitors });
  };
}

export default App;
