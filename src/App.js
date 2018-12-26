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
                amount: 1
              }
            ]
          }
        ]
      }));
    }
  };
  handleDeleteLogCompetitor = (name, id) => {
    console.log(
      name,
      id,
      this.state.competitors.find(el => el.name === name),
      this.state.competitors
        .find(el => el.name === name)
        .find(el => el.logs.id === id)
    );
  };
  handleDeleteCompetitor = name => {
    this.setState(prevState => ({
      competitors: prevState.competitors.filter(el => el.name !== name)
    }));
  };
}

export default App;
