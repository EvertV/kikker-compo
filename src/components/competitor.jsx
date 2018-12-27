import React, { Component } from "react";
import Log from "./log";
import * as moment from "moment";
import Octicon from "react-octicon";

class Competitor extends Component {
  state = {
    newName: this.props.competitor.name,
    showEditCompetitor: false,
    showLogCompetitor: false,
    isActiveRow: false,
    newLogAmount: "",
    newLogReason: ""
  };

  render() {
    moment.locale("nl-be");
    return (
      <React.Fragment>
        <tr className={this.state.isActiveRow ? "table-light" : ""}>
          <td>{this.props.competitor.name}</td>
          <td>{this.props.onCalculatePointsFromLogs(this.props.logs)}</td>
          <td>
            <button
              className={this.getShowEditCompetitorClasses()}
              onClick={this.handleShowEditCompetitor}
            >
              <Octicon name="pencil" />
            </button>
            &nbsp;
            <button
              className={this.getShowLogCompetitorClasses()}
              onClick={this.handleShowLogCompetitor}
            >
              <Octicon name="tasklist" />
            </button>
          </td>
        </tr>
        <tr className="table-light">
          <td
            colSpan="3"
            className=""
            style={{
              display: this.state.showEditCompetitor ? "table-cell" : "none",
              paddingBottom: 15,
              borderTop: this.state.isActiveRow ? "0" : "1px solid #ddd"
            }}
          >
            <div className="row">
              <div className="col-sm">
                <div className="card mb-2">
                  <div className="card-header">Overzicht</div>
                  <div className="card-body">
                    <p>
                      Naam
                      <br />
                      <strong>{this.props.competitor.name}</strong>
                    </p>
                    <p>
                      Kikkerpunten
                      <br />
                      <strong>
                        {this.props.onCalculatePointsFromLogs(this.props.logs)}
                      </strong>
                    </p>
                    <p>
                      Aantal logs
                      <br />
                      <strong>{this.props.logs.length}</strong>
                    </p>
                    <p>
                      Aangemaakt
                      <br />
                      <strong>
                        {this.props.competitor.dateAdded.format(
                          "D/MM/YY, H:mm:ss"
                        )}
                      </strong>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-sm">
                <div className="card">
                  <div className="card-header">Bewerk deelnemer</div>
                  <div className="card-body">
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
                          /*ref={input => {
                          this.inputName = input && input.focus();
                        }}*/
                        />
                        <span className="input-group-append">
                          <button type="submit" className="btn btn-primary">
                            <Octicon name="check" />
                            &nbsp;Naam wijzigen
                          </button>
                        </span>
                      </div>
                    </form>
                    <br />
                    <form
                      className="form"
                      onSubmit={this.handleDeleteCompetitor}
                    >
                      <div className="form-group">
                        <button type="submit" className="btn btn-secondary">
                          <Octicon name="trashcan" />
                          &nbsp;Verwijder {this.props.competitor.name}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
        <tr className="table-light">
          <td
            colSpan="3"
            style={{
              display: this.state.showLogCompetitor ? "table-cell" : "none",
              paddingBottom: 15,
              borderTop: this.state.isActiveRow ? "0" : "1px solid #ddd"
            }}
          >
            <div className="row">
              <div className="col-sm">
                <div className="card">
                  <div className="card-header">
                    Kikkerpunten voor {this.props.competitor.name} toevoegen
                  </div>
                  <div className="card-body">
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
                          placeholder="#"
                          autoComplete="off"
                          style={{ maxWidth: 75 }}
                          value={this.state.newLogAmount}
                          onChange={this.handleNewLogAmountChange}
                        />
                        <span className="input-group-append">
                          <button type="submit" className="btn btn-primary">
                            <Octicon name="diff-added" />
                          </button>
                        </span>
                      </div>
                      <small className="form-text text-muted">
                        De reden mag max. 150 tekens lang zijn en de
                        kikkerpunten niet gelijk aan 0.
                      </small>
                    </form>
                  </div>
                </div>
                <div className="card mt-2 mx-auto" style={{ maxWidth: 500 }}>
                  <div className="card-header">
                    Historiek van {this.props.competitor.name}
                  </div>
                  <div className="card-body">
                    <div className="list-group list-group-flush">
                      {this.props.logs.sort(this.compareDate).map(log => (
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
      newLogAmount: "",
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
    return this.getShowButtonClasses(
      this.state.showEditCompetitor,
      "outline-secondary"
    );
  };
  getShowLogCompetitorClasses = () => {
    return this.getShowButtonClasses(
      this.state.showLogCompetitor,
      "outline-info"
    );
  };
  getShowButtonClasses = (state, style) => {
    const classes = "btn btn-" + style + " btn-sm ";
    return state ? classes + "active" : classes;
  };
}

export default Competitor;
