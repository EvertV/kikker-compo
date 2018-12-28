import React, { Component } from "react";
import Octicon from "react-octicon";

class ManageCompetitors extends Component {
  state = {
    showAddCompetitor: false,
    newCompetitorName: ""
  };
  render() {
    return (
      <React.Fragment>
        <div className="text-center mt-3">
          <button
            type="button"
            className={this.getShowAddCompetitorClasses()}
            onClick={this.handleShowAddCompetitor}
          >
            <Octicon name="person" />
            &nbsp;Nieuwe deelnemer
          </button>
        </div>
        <div
          style={{
            display: this.state.showAddCompetitor ? "block" : "none"
          }}
          className="card text-center mt-3"
        >
          <div className="card-header">Nieuwe deelnemer toevoegen</div>
          <div className="card-body">
            <form
              className="form"
              style={{ display: "inline-block" }}
              onSubmit={this.onAddCompetitorHelper}
            >
              <input
                type="text"
                className="form-control"
                id="inputName"
                placeholder="Kikker-naam"
                autoComplete="off"
                onChange={this.handleNameChange}
                value={this.state.newCompetitorName}
                onKeyDown={this.handleKeyDown}
                ref={input => {
                  this.inputName = input && input.focus();
                }}
              />
              <small className="form-text text-muted">
                De kikker-naam moet uniek zijn en max. 50 tekens.
              </small>
              <button type="submit" className="btn btn-primary mt-2">
                <Octicon name="plus" />
                &nbsp;Toevoegen
              </button>
            </form>
          </div>
        </div>
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
  handleKeyDown = event => {
    if (event.keyCode === 27) {
      this.handleShowAddCompetitor();
    }
  };
  onAddCompetitorHelper = e => {
    e.preventDefault();
    if (this.props.onAddCompetitor(this.state.newCompetitorName)) {
      this.setState({ newCompetitorName: "" });
    }
  };

  getShowAddCompetitorClasses = () => {
    const classes = "btn btn-outline-secondary ";
    return this.state.showAddCompetitor ? classes + "active" : classes;
  };
}

export default ManageCompetitors;
