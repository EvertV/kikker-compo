import React, { Component } from "react";
import "./App.css";
import TableCompetitors from "./components/tableCompetitors";
import ManageCompetitors from "./components/manageCompetitors";

class App extends Component {
  state = {
    competitors: [
      { name: "Mike", points: 50 },
      { name: "Ken", points: 5 },
      { name: "Sieger", points: 15 }
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
        <TableCompetitors competitors={this.state.competitors} />
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
            points: 0
          }
        ]
      }));
    }
  };
}

export default App;
