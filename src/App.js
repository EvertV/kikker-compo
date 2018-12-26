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
            amount: 10,
            reason: "haha mike"
          },
          {
            date: moment(),
            amount: 25,
            reason: "haha mike 2"
          }
        ]
      },
      {
        name: "Ken",
        logs: [
          {
            date: moment(),
            amount: 1560,
            reason: "haha kennn"
          },
          {
            date: moment(),
            amount: 13,
            reason: "haha jken 2"
          },
          {
            date: moment(),
            amount: 53,
            reason: "haha jken 3"
          }
        ]
      },
      {
        name: "Sieger",
        logs: []
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
          onDeleteLogCompetitor={this.handleDeleteLogCompetitor}
        />
      </React.Fragment>
    );
  }
  handleAddCompetitor = name => {
    if (
      name.trim() !== "" &&
      !this.state.competitors.some(
        c => c["name"].toLowerCase().trim() === name.toLowerCase().trim()
      )
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
  handleDeleteLogCompetitor = () => {
    console.log("del log");
  };
}

export default App;
