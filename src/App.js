import React, { Component } from "react";
import TableCompetitors from "./components/tableCompetitors";
import ManageCompetitors from "./components/manageCompetitors";
import RecentLogs from "./components/recentLogs";
import * as moment from "moment";
import firebase from "firebase";
import LeftCol from "./components/leftCol";

class App extends Component {
  state = {
    showAddCompetitor: false,
    isSignedIn: false,
    competitors: [
      {
        name: "Bezig met laden...",
        dateAdded: moment(),
        showDetailsCompetitor: false,
        logs: [
          {
            date: moment(),
            id: "xdxpx3",
            amount: 0,
            reason: "Bezig met laden..."
          }
        ]
      }
    ]
  };
  writeToDatabase = () => {
    this.state.competitors.forEach(competitor => {
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

    if (arrayCompetitors.length > 0)
      this.setState({ competitors: arrayCompetitors });
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
        <LeftCol
          isSignedIn={this.state.isSignedIn}
          onSetSignedInState={state => this.handleSetSignedInState(state)}
        />
        <RecentLogs
          competitors={this.state.competitors}
          isSignedIn={this.state.isSignedIn}
          onDeleteLog={(name, id) => this.handleDeleteLogCompetitor(name, id)}
        />
        <div className="container">
          <ManageCompetitors
            isSignedIn={this.state.isSignedIn}
            competitors={this.state.competitors}
            onAddCompetitor={this.handleAddCompetitor}
            onShowAddCompetitor={this.handleShowAddCompetitor}
            showAddCompetitor={this.state.showAddCompetitor}
          />
          <TableCompetitors
            isSignedIn={this.state.isSignedIn}
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
            logs: []
          }
        ],
        showAddCompetitor: false
      }));

      firebase
        .database()
        .ref("competitors/" + name)
        .set({
          name,
          dateAdded: moment().format(),
          showDetailsCompetitor: false,
          logs: []
        });
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
    var competitors = this.state.competitors;
    var newCompetitorData = {};
    competitors.forEach(e => {
      if (e.name === oldName) {
        e.name = newName;
        newCompetitorData = e;
      }
    });

    this.setState({ competitors });
    firebase
      .database()
      .ref("competitors/" + oldName)
      .remove();

    firebase
      .database()
      .ref("competitors/" + newCompetitorData.name)
      .set({
        name: newCompetitorData.name,
        dateAdded: newCompetitorData.dateAdded.format(),
        showDetailsCompetitor: newCompetitorData.showDetailsCompetitor,
        logs: newCompetitorData.logs.map(log => {
          return {
            date: log.date.format(),
            id: log.id,
            amount: log.amount,
            reason: log.reason
          };
        })
      });
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

    this.setState({ competitors, showAddCompetitor: false });
  };

  handleShowAddCompetitor = () => {
    var competitors = this.state.competitors.slice(0);
    competitors.map(e => {
      e.showDetailsCompetitor = false;
      return e;
    });
    this.setState(prevState => ({
      competitors,
      showAddCompetitor: !prevState.showAddCompetitor
    }));
  };
  handleSetSignedInState = state => {
    this.setState({ isSignedIn: state });
  };
}

export default App;
