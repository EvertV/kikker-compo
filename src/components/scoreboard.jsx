import React, { Component } from "react";
import TableCompetitors from "./tableCompetitors";

class Scoreboard extends Component {
  state = {
    competitors: [
      { name: "Mike", points: 50 },
      { name: "Ken", points: 5 },
      { name: "Sieger", points: 15 }
    ],
    showAddCompetitor: false,
    newCompetitorName: ""
  };
  render() {
    return (
      <React.Fragment>
        <div>
          <div className="btn-group" role="group" aria-label="...">
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.handleShowAddCompetitor}
            >
              <i className="glyphicon glyphicon-plus" />
            </button>
            <button type="button" className="btn btn-secondary">
              <i className="glyphicon glyphicon-trash" />
            </button>
          </div>
        </div>
        <div
          className="well"
          style={{
            display: this.state.showAddCompetitor ? "block" : "none",
            marginTop: 10
          }}
        >
          <form className="form-inline">
            <div className="form-group">
              <label htmlFor="inputName">Naam</label>
              <input
                type="text"
                className="form-control"
                id="inputName"
                placeholder="Nieuwe kikker"
                autoComplete="off"
                onChange={this.handleNameChange}
                value={this.state.newCompetitorName}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={this.handleAddCompetitor}
            >
              Toevoegen
            </button>
          </form>
        </div>
        <h3>Scorebord</h3>
        <TableCompetitors competitors={this.state.competitors} />
      </React.Fragment>
    );
  }
  handleNameChange = e => {
    this.setState({ newCompetitorName: e.target.value });
  };

  handleShowAddCompetitor = () => {
    this.setState(prevState => ({
      showAddCompetitor: !prevState.showAddCompetitor
    }));
  };
  handleAddCompetitor = () => {
    if (
      this.state.newCompetitorName.trim() !== "" &&
      !this.state.competitors.some(
        c =>
          c["name"].toLowerCase().trim() ===
          this.state.newCompetitorName.toLowerCase().trim()
      )
    ) {
      this.setState(prevState => ({
        competitors: [
          ...prevState.competitors,
          {
            name: this.state.newCompetitorName,
            points: 0
          }
        ]
      }));
    }
    this.setState({ newCompetitorName: "" });
    console.log(this.state.competitors);
  };
}

export default Scoreboard;
