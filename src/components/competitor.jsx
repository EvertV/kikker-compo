import React, { Component } from "react";
import Log from "./log";
import * as moment from "moment";

class Competitor extends Component {
  state = {
    dateAdded: this.props.competitor.dateAdded,
    logs: this.props.logs,
    newName: this.props.competitor.name,
    showEditCompetitor: false,
    showLogCompetitor: false,
    isActiveRow: false,
    newLogAmount: 0,
    newLogReason: ""
  };

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        logs: nextProps.logs
      });
    }
  }

  render() {
    moment.locale("nl-be");
    return (
      <React.Fragment>
        <tr className={this.state.isActiveRow ? "default" : ""}>
          <td>{this.props.competitor.name}</td>
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
        <tr className="default">
          <td
            colSpan="3"
            className="container row"
            style={{
              display: this.state.showEditCompetitor ? "table-cell" : "none",
              paddingBottom: 15,
              borderTop: this.state.isActiveRow ? "0" : "1px solid #ddd"
            }}
          >
            <div className="col-sm-6">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <strong>Overzicht</strong>
                </div>
                <div className="panel-body">
                  <ul>
                    <li>Naam: {this.props.competitor.name}</li>
                    <li>Kikkerpunten: {this.calculatePointsFromLogs()}</li>
                    <li>Aantal logs: {this.state.logs.length}</li>
                    <li>
                      Toegevoegd op:{" "}
                      {this.state.dateAdded.format("D/MM/YY, H:mm:ss")}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <strong>Bewerk deelnemer</strong>
                </div>
                <div className="panel-body">
                  <form
                    className="form-inline"
                    onSubmit={this.onUpdateCompetitorName}
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
                        onChange={this.handleNameChange}
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
                        <i className="glyphicon glyphicon-trash" /> Verwijder
                        kikker
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </td>
        </tr>
        <tr className="default">
          <td
            colSpan="3"
            className="container row"
            style={{
              display: this.state.showLogCompetitor ? "table-cell" : "none",
              paddingBottom: 15,
              borderTop: this.state.isActiveRow ? "0" : "1px solid #ddd"
            }}
          >
            <div className="col-sm-6">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <strong>Kikkerpunten toevoegen</strong>
                </div>
                <div className="panel-body">
                  <form onSubmit={this.onAddLogHelper}>
                    <div className="input-group">
                      <label htmlFor="inputNewLogReason" className="sr-only">
                        Reden
                      </label>
                      <input
                        type="text"
                        className="form-control new-log-reason-input"
                        id="inputName"
                        placeholder="Geef een reden"
                        autoComplete="off"
                        value={this.state.newLogReason}
                        onChange={this.handleNewLogReasonChange}
                      />
                      <span className="input-group-btn" />
                      <label htmlFor="inputNewLogAmount" className="sr-only">
                        Aantal
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="inputNewLogAmount"
                        placeholder="Aantal"
                        autoComplete="off"
                        style={{ maxWidth: 65 }}
                        value={this.state.newLogAmount}
                        onChange={this.handleNewLogAmountChange}
                      />
                      <span className="input-group-btn" />
                      <span className="input-group-btn">
                        <button type="submit" className="btn btn-primary">
                          <i className="glyphicon glyphicon-plus" />
                          &nbsp;Toevoegen
                        </button>
                      </span>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="list-group col-sm-6" style={{ maxWidth: 600 }}>
              <div className="panel panel-default">
                <div className="panel-heading">
                  <strong>Historiek</strong>
                </div>
                <div className="panel-body">
                  {this.state.logs.sort(this.compareDate).map(log => (
                    <Log
                      key={log.id}
                      log={log}
                      name={this.props.competitor.name}
                      onDeleteLog={(name, id) =>
                        this.props.onDeleteLog(name, id)
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
          </td>
        </tr>
      </React.Fragment>
    );
  }
  compareDate(a, b) {
    const userDateA = a.date;
    const userDateB = b.date;

    let comparison = 0;
    if (userDateA < userDateB) {
      comparison = 1;
    } else if (userDateA > userDateB) {
      comparison = -1;
    }
    return comparison;
  }

  handleNameChange = e => {
    this.setState({ newName: e.target.value });
  };
  handleNewLogAmountChange = e => {
    this.setState({ newLogAmount: e.target.value });
  };
  handleNewLogReasonChange = e => {
    this.setState({ newLogReason: e.target.value });
  };

  onAddLogHelper = e => {
    e.preventDefault();
    this.props.onAddLog(
      this.props.competitor.name,
      this.state.newLogAmount,
      this.state.newLogReason
    );
    this.setState({
      newLogAmount: 0,
      newLogReason: ""
    });
  };

  onUpdateCompetitorName = e => {
    e.preventDefault();
    this.props.onUpdateCompetitorName(
      this.props.competitor.name,
      this.state.newName
    );
    this.handleShowEditCompetitor();
  };

  handleDeleteCompetitor = e => {
    e.preventDefault();
    this.props.onDeleteCompetitor(this.props.competitor.name);
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
    return this.getShowButtonClasses(this.state.showEditCompetitor);
  };
  getShowLogCompetitorClasses = () => {
    return this.getShowButtonClasses(this.state.showLogCompetitor);
  };
  getShowButtonClasses = state => {
    const classes = "btn btn-default btn-sm ";
    return state ? classes + "active" : classes;
  };
  calculatePointsFromLogs = () => {
    return this.state.logs.reduce(function(tot, record) {
      return tot + record.amount;
    }, 0);
  };
}

export default Competitor;
