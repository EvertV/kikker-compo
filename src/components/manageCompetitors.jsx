import React, { Component } from "react";

class ManageCompetitors extends Component {
  state = {
    competitors: this.props.competitors,
    showAddCompetitor: false,
    newCompetitorName: ""
  };
  render() {
    return (
      <React.Fragment>
        <div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.handleShowAddCompetitor}
          >
            <i className="glyphicon glyphicon-plus" /> Nieuwe deelnemer
          </button>
        </div>
        <div
          style={{
            display: this.state.showAddCompetitor ? "block" : "none",
            marginTop: 10
          }}
        >
          <form
            className="form-inline well"
            style={{ display: "inline-block" }}
            onSubmit={this.onAddCompetitorHelper}
          >
            <div className="form-group">
              <label htmlFor="inputName" className="hidden">
                Naam
              </label>
              <input
                type="text"
                className="form-control"
                id="inputName"
                placeholder="Nieuwe kikker"
                autoComplete="off"
                onChange={this.handleNameChange}
                value={this.state.newCompetitorName}
                ref={input => {
                  this.inputName = input && input.focus();
                }}
              />
            </div>
            <button type="submit" className="btn btn-default">
              <i className="glyphicon glyphicon-plus" />
            </button>
          </form>
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

  onAddCompetitorHelper = e => {
    e.preventDefault();
    this.setState({ newCompetitorName: "" });
    this.props.onAddCompetitor(this.state.newCompetitorName);
  };
}

export default ManageCompetitors;
