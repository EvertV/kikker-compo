import React, { Component } from "react";
import Log from "./log";

class Competitor extends Component {
  state = {
    name: this.props.name,
    logs: this.props.logs,
    showEditCompetitor: false,
    showLogCompetitor: true,
    entryReason: "",
    entryPoints: 0,
    isActiveRow: false,
    newName: this.props.name
  };

  render() {
    return (
      <React.Fragment>
        <tr className={this.state.isActiveRow ? "active" : ""}>
          <td>{this.state.name}</td>
          <td>{this.calculatePointsFromLogs()}</td>
          <td>
            <button
              className={this.getShowEditCompetitorClasses()}
              onClick={this.handleShowEditCompetitor}
            >
              <i className="glyphicon glyphicon-pencil" />
            </button>
            &nbsp;
            <button
              className={this.getShowLogCompetitorClasses()}
              onClick={this.handleShowLogCompetitor}
            >
              <i className="glyphicon glyphicon-th-list" />
            </button>
          </td>
        </tr>
        <tr className="active">
          <td
            colSpan="3"
            style={{
              display: this.state.showEditCompetitor ? "table-cell" : "none",
              paddingBottom: 15
            }}
          >
            <form
              className="form-inline"
              onSubmit={this.handleEditCompetitorName}
            >
              <div className="input-group form-group">
                <label htmlFor="inputName" className="sr-only">
                  Naam
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputName"
                  placeholder="Naam"
                  autoComplete="off"
                  value={this.state.newName}
                  onChange={this.handleEditCompetitorNameChange}
                  ref={input => {
                    this.inputName = input && input.focus();
                  }}
                />
                <span className="input-group-btn">
                  <button type="submit" className="btn btn-primary">
                    <i className="glyphicon glyphicon-ok" /> Naam wijzigen
                  </button>
                </span>
              </div>
            </form>
            <br />
            <form className="form" onSubmit={this.handleDeleteCompetitor}>
              <div className="form-group">
                <button type="submit" className="btn btn-secondary">
                  <i className="glyphicon glyphicon-trash" /> Verwijder kikker
                </button>
              </div>
            </form>
          </td>
        </tr>
        <tr className="active">
          <td
            colSpan="3"
            style={{
              display: this.state.showLogCompetitor ? "table-cell" : "none",
              paddingBottom: 15
            }}
          >
            <h4>
              Kikker {this.state.name}&nbsp;
              <small>Overzicht</small>
            </h4>
            <h5>Nieuwe log</h5>
            <form
              className="form-inline"
              onSubmit={this.onAddLogCompetitorHelper}
            >
              <div className="form-group input-group">
                <label htmlFor="inputEntryPoints" className="sr-only">
                  Aantal
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="inputEntryPoints"
                  placeholder="Aantal"
                  autoComplete="off"
                  onChange={this.handleEntryPointsChange}
                />
                <span className="input-group-btn" />
              </div>
              <div className="input-group form-group">
                <label htmlFor="inputEntryPoints" className="sr-only">
                  Reden
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputEntryReason"
                  placeholder="Reden"
                  autoComplete="off"
                  onChange={this.handleEntryReasonChange}
                  value={this.state.entryReason}
                />
                <span className="input-group-btn">
                  <button type="submit" className="btn btn-success">
                    <i className="glyphicon glyphicon-plus" />
                  </button>
                </span>
              </div>
            </form>
            <h5>Historiek</h5>
            {this.state.logs.map(log => (
              <Log
                key={log.id}
                id={log.id}
                date={log.date}
                amount={log.amount}
                reason={log.reason}
                name={this.state.name}
                onDeleteLog={(name, id) => this.props.onDeleteLog(name, id)}
              />
            ))}
          </td>
        </tr>
      </React.Fragment>
    );
  }

  handleEditCompetitorNameChange = e => {
    this.setState({ newName: e.target.value });
  };

  handleEditCompetitorName = e => {
    e.preventDefault();
    this.setState(prevState => ({ name: prevState.newName }));
    this.handleShowEditCompetitor();
  };

  handleDeleteCompetitor = e => {
    e.preventDefault();
    this.props.onDeleteCompetitor(this.state.name);
  };

  handleEntryReasonChange = e => {
    e.preventDefault();
    this.setState({ entryReason: e.target.value });
  };

  handleShowEditCompetitor = () => {
    this.setState(prevState => ({
      showEditCompetitor: !prevState.showEditCompetitor,
      showLogCompetitor: false,
      isActiveRow: !prevState.showEditCompetitor ? true : false
    }));
  };

  handleShowLogCompetitor = () => {
    this.setState(prevState => ({
      showEditCompetitor: false,
      showLogCompetitor: !prevState.showLogCompetitor,
      isActiveRow: !prevState.showLogCompetitor ? true : false
    }));
  };

  getShowEditCompetitorClasses = () => {
    const classes = "btn btn-default btn-sm ";
    return this.state.showEditCompetitor ? classes + "active" : classes;
  };
  getShowLogCompetitorClasses = () => {
    const classes = "btn btn-default btn-sm ";
    return this.state.showLogCompetitor ? classes + "active" : classes;
  };
  calculatePointsFromLogs() {
    return this.state.logs.reduce(function(tot, record) {
      return tot + record.amount;
    }, 0);
  }
}

export default Competitor;
