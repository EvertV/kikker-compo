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
        logs: [
          {
            date: moment(),
            id: "Mike&&" + moment().millisecond(),
            amount: 10,
            reason: "haha mike"
          }
        ]
      },
      {
        name: "Ken",
        logs: [
          {
            date: moment(),
            id: "Mike&&" + moment().millisecond(),
            amount: 1560,
            reason: "haha kennn"
          }
        ]
      },
      {
        name: "Sieger",
        logs: [
          {
            date: moment(),
            id: "Sieger&&" + moment().millisecond(),
            amount: 53,
            reason: "haha SIEGER 3"
          }
        ]
      }
    ]
  };
  render() {
    return (
      <React.Fragment>
        <div className="page-header">
          <h1>
            Kikker Compo <small>Gateway Gaming</small>
          </h1>
        </div>
        <ManageCompetitors
          competitors={this.state.competitors}
          onAddCompetitor={this.handleAddCompetitor}
        />

        <h3>Scorebord</h3>
        <TableCompetitors
          competitors={this.state.competitors}
          onDeleteLogCompetitor={(name, id) =>
            this.handleDeleteLogCompetitor(name, id)
          }
          onDeleteCompetitor={name => this.handleDeleteCompetitor(name)}
          onUpdateCompetitorName={name => this.handleUpdateCompetitorName(name)}
          onAddLogCompetitor={(name, amount, reason) =>
            this.handleAddLogCompetitor(name, amount, reason)
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
  handleUpdateCompetitorName = name => {
    /* PAS NAAM AAN
    Zodat DELETE ook werkt als de naam gewijzigd is*/
  };
  handleAddLogCompetitor = (name, amount, reason) => {
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
  };
}

export default App;
