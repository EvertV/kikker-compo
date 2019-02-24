import React, { Component } from "react";
import Log from "./log";
import * as moment from "moment";
import Octicon from "react-octicon";

class Competitor extends Component {
  state = {
    newName: this.props.competitor.name,
    showDeleteModal: false,
    showEditModal: false,
    showDetailsButtonOnHover: false
  };

  render() {
    const {
      competitor,
      onCalculatePointsFromLogs,
      logs,
      onDeleteLog,
      isSignedIn
    } = this.props; // argument destruction

    moment.locale("nl-be");
    return (
      <React.Fragment>
        <tr
          onClick={() => this.onShowDetailsCompetitorHelper(competitor.name)}
          onMouseEnter={() => this.handleMouseEnterRow()}
          onMouseLeave={() => this.handleMouseLeaveRow()}
        >
          <td className="text-center">{competitor.name}</td>
          <td>
            <p>
              {onCalculatePointsFromLogs(logs)}&nbsp;&nbsp;
              <span className="float-right" style={this.getHoverStyle()}>
                <button className={this.getShowDetailsCompetitorClasses()}>
                  <Octicon
                    name="x"
                    style={{
                      display: competitor.showDetailsCompetitor
                        ? "inline-block"
                        : "none"
                    }}
                  />
                  <Octicon
                    name={isSignedIn ? "pencil" : "chevron-down"}
                    style={{
                      display: competitor.showDetailsCompetitor
                        ? "none"
                        : "inline-block"
                    }}
                  />
                </button>
              </span>
            </p>
          </td>
        </tr>
        <tr className="fold-out">
          <td
            colSpan="3"
            style={{
              display: competitor.showDetailsCompetitor ? "table-cell" : "none",
              paddingBottom: 15,
              borderTop: this.state.isActiveRow ? "0" : "1px solid #ddd"
            }}
          >
            <div className="row">
              <div className="col-sm">
                <div className="card mx-auto" style={{ maxWidth: 500 }}>
                  <div className="card-body" style={{
                        display: isSignedIn ? "inline" : "none"
                      }}>
                    {/*<h4 className="card-title">
                      {competitor.name}{" "}
                      <span className="float-right">
                        <small className="d-none d-sm-inline">Totaal: </small>
                        <span className="badge badge-pill badge-info">
                          {onCalculatePointsFromLogs(logs)}
                        </span>
                      </span>
          </h4>*/}
                    <form
                      onSubmit={this.onAddLogHelper}
                      
                    >
                      <div className="input-group">
                        <label htmlFor="inputNewLogReason" className="sr-only">
                          Reden
                        </label>
                        <input
                          type="text"
                          className="form-control new-log-reason-input"
                          id="inputNewLogReason"
                          placeholder="Geef een reden"
                          autoComplete="off"
                          value={this.state.newLogReason}
                          onChange={this.handleNewLogReasonChange}
                          onKeyDown={this.handleEnter}
                          ref={input => {
                            this.inputNewLogReason = input;
                          }}
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
                          ref={input => {
                            this.inputNewLogAmount = input;
                          }}
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
                  <div
                    className="list-group list-group-flush"
                    style={{ maxWidth: 500 }}
                  >
                    {logs
                      .sort(this.compareDate)
                      .slice(0, this.state.showLogsAmount)
                      .map(log => (
                        <Log
                          key={log.id}
                          log={log}
                          name={competitor.name}
                          onDeleteLog={(name, id) => onDeleteLog(name, id)}
                          isSignedIn={this.props.isSignedIn}
                        />
                      ))}

                    <button
                      className="btn btn-link btn-block"
                      onClick={this.handleLoadMore}
                      style={{
                        display:
                          this.state.showLogsAmount >= logs.length
                            ? "none"
                            : "inline-block"
                      }}
                    >
                      Meer laden...
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/*<div className="row">
              <div className="col-sm mt-2 text-center">
                <button
                  className="btn btn-link btn-sm"
                  onClick={this.handleShowEditModal}
                >
                  {isSignedIn ? "Bewerk/bekijk" : "Bekijk"} details{" "}
                  {competitor.name} &raquo;
                </button>
              </div>
                    </div>*/}

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
  handleLoadMore = () => {
    this.setState(prevState => ({
      showLogsAmount: prevState.showLogsAmount + 5
    }));
  };
  handleMouseEnterRow = () => {
    this.setState({
      showDetailsButtonOnHover: true
    });
  };
  handleMouseLeaveRow = () => {
    this.setState({
      showDetailsButtonOnHover: false
    });
  };
  getHoverStyle = () => {
    if (window.innerWidth > 960) {
      return {
        visibility:
          this.state.showDetailsButtonOnHover ||
          this.props.competitor.showDetailsCompetitor
            ? "visible"
            : "hidden"
      };
    }
  };
  handleEnter(event) {
    if (event.keyCode === 13) {
      const form = event.target.form;
      const index = Array.prototype.indexOf.call(form, event.target);
      form.elements[index + 1].focus();
      event.preventDefault();
    }
  }
  handleNewLogAmountChange = e => {
    this.setState({ newLogAmount: e.target.value });
  };
  handleNewLogReasonChange = e => {
    this.setState({ newLogReason: e.target.value });
  };

  onAddLogHelper = e => {
    e.preventDefault();
    if (
      this.props.onAddLog(
        this.props.competitor.name,
        this.state.newLogAmount,
        this.state.newLogReason
      )
    ) {
      this.setState({
        newLogAmount: "",
        newLogReason: ""
      });
    }

    this.inputNewLogReason.focus();
  };


  getShowDetailsCompetitorClasses = () => {
    const classes = "btn btn-sm btn-";
    return this.props.competitor.showDetailsCompetitor
      ? classes + "outline-danger"
      : classes + "link";
  };
  onShowDetailsCompetitorHelper = name => {
    this.setState({ showLogsAmount: 3 });
    this.props.onShowDetailsCompetitor(name);
  };
}

export default Competitor;
