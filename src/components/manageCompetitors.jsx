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
            className={this.getShowAddCompetitorClasses()}
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
              <label htmlFor="inputName" className="sr-only">
                Naam
              </label>
              <div className="input-group">
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
                <span className="input-group-btn">
                  <button type="submit" className="btn btn-primary">
                    <i className="glyphicon glyphicon-plus" /> Toevoegen
                  </button>
                </span>
              </div>
            </div>
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

  getShowAddCompetitorClasses = () => {
    const classes = "btn btn-default ";
    return this.state.showAddCompetitor ? classes + "active" : classes;
  };
}

export default ManageCompetitors;
