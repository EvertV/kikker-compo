import React, { Component } from "react";
import "./App.css";
import TableCompetitors from "./components/tableCompetitors";
import ManageCompetitors from "./components/manageCompetitors";
import * as moment from "moment";

class App extends Component {
  state = {
    competitors: [
      {
        name: "Mike",
        dateAdded: moment(),
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
        logs: [
          {
            date: moment(),
            id: "Mike&&" + moment().millisecond(),
            amount: 15,
            reason: "Kikkeren in de stoel"
          }
        ]
      },
      {
        name: "Sieger",
        dateAdded: moment(),
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
        <ManageCompetitors
          competitors={this.state.competitors}
          onAddCompetitor={this.handleAddCompetitor}
        />

        <h2 className="mt-2">Scorebord</h2>
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
        />
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
    }
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
    if (reason && reason.length < 150 && amount !== 0 && amount !== "") {
      var competitors = this.state.competitors;
      competitors.forEach(e => {
        if (e.name === name) {
          e.logs = [
            ...e.logs,
            {
              date: moment(),
              reason: reason,
              id: name + "&&" + moment().millisecond(),
              amount: parseInt(amount)
            }
          ];
        }
      });

      this.setState(prevState => ({
        competitors: competitors
      }));
    }
  };
  handleCalculatePointsFromLogs = logArray => {
    return logArray.reduce(function(totalAmount, log) {
      return totalAmount + log.amount;
    }, 0);
  };
}

export default App;
