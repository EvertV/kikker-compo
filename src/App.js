import React, { Component } from "react";
import TableCompetitors from "./components/tableCompetitors";
import ManageCompetitors from "./components/manageCompetitors";
import RecentLogs from "./components/recentLogs";
import * as moment from "moment";

class App extends Component {
  state = {
    competitors: [
      {
        name: "Mike",
        dateAdded: moment(),
        showEditCompetitor: false,
        showLogCompetitor: false,
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
        showEditCompetitor: false,
        showLogCompetitor: false,
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
        showEditCompetitor: false,
        showLogCompetitor: false,
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
  render() {
    return (
      <React.Fragment>
        <div className="page-header text-center">
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
            onShowEditCompetitor={name => this.handleShowEditCompetitor(name)}
            onShowLogCompetitor={name => this.handleShowLogCompetitor(name)}
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
  };
  handleDeleteCompetitor = name => {
    this.setState(prevState => ({
      competitors: prevState.competitors.filter(el => el.name !== name)
    }));
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
                showEditCompetitor: false,
                showLogCompetitor: false,
                id: name + "-log-" + moment() + "-nr-" + e.logs.length,
                amount: parseInt(amount)
              }
            ];
          }
        });
        this.setState(prevState => ({
          competitors: competitors
        }));
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

  handleShowEditCompetitor = name => {
    var competitors = this.state.competitors;
    competitors.forEach(e => {
      if (e.name === name) {
        e.showEditCompetitor = !e.showEditCompetitor;
        e.showLogCompetitor = false;
      } else {
        e.showEditCompetitor = false;
        e.showLogCompetitor = false;
      }
      return e;
    });

    this.setState({ competitors });
  };

  handleShowLogCompetitor = name => {
    var competitors = this.state.competitors;
    competitors.map(e => {
      if (e.name === name) {
        e.showEditCompetitor = false;
        e.showLogCompetitor = !e.showLogCompetitor;
      } else {
        e.showEditCompetitor = false;
        e.showLogCompetitor = false;
      }
      return e;
    });

    this.setState({ competitors });
  };
}

export default App;
