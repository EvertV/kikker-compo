import React, { Component } from "react";
import Log from "./log";

class Competitor extends Component {
  state = {
    name: this.props.name,
    logs: this.props.logs,
    showEditCompetitor: false,
    showLogCompetitor: false,
    entryReason: "",
    entryPoints: 0,
    isActiveRow: false
  };

  render() {
    return (
      <React.Fragment>
        <tr className={this.state.isActiveRow ? "active" : ""}>
          <td>{this.state.name}</td>
          <td>{this.calculatePointsFromLogs()}</td>
          <td>
            {/*<button
            onClick={this.handleIncrement}
            className="btn btn-success btn-sm"
          >
            <i className="glyphicon glyphicon-plus" />
          </button>{" "}
          <button
            onClick={this.handleDecrease}
            className="btn btn-danger btn-sm"
          >
            <i className="glyphicon glyphicon-minus" />
          </button>*/}
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
              onSubmit={this.onEditCompetitorHelper}
            >
              <h4>
                Edit {this.state.name}&nbsp;
                <small>Nieuwe log</small>
              </h4>

              <div className="form-group input-group col-lg-1">
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
              <div className="input-group form-group col-lg-11">
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
              Bekijk {this.state.name}&nbsp;
              <small>Alle logs</small>
            </h4>
            <div className="table-responsive">
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>Datum</th>
                    <th>Aantal</th>
                    <th>Reden</th>
                    <th>Verwijder</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.logs.map(log => (
                    <Log
                      key={log.date}
                      date={log.date}
                      amount={log.amount}
                      reason={log.reason}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </td>
        </tr>
      </React.Fragment>
    );
  }

  handleEntryReasonChange = e => {
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
