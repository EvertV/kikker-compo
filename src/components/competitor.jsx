import React, { Component } from "react";
import Log from "./log";
import * as moment from "moment";
import Octicon from "react-octicon";
import Modal from "react-bootstrap4-modal";

class Competitor extends Component {
  state = {
    newName: this.props.competitor.name,
    newLogAmount: "",
    newLogReason: "",
    showDeleteModal: false
  };

  render() {
    const {
      competitor,
      onCalculatePointsFromLogs,
      logs,
      onDeleteLog,
      onShowEditCompetitor,
      onShowLogCompetitor
    } = this.props; // argument destruction

    moment.locale("nl-be");
    return (
      <React.Fragment>
        <tr>
          <td>{competitor.name}</td>
          <td>{onCalculatePointsFromLogs(logs)}</td>
          <td>
            <button
              className={this.getShowEditCompetitorClasses()}
              onClick={() => onShowEditCompetitor(competitor.name)}
            >
              <Octicon name="pencil" />
            </button>
            &nbsp;
            <button
              className={this.getShowLogCompetitorClasses()}
              onClick={() => onShowLogCompetitor(competitor.name)}
            >
              <Octicon name="tasklist" />
            </button>
          </td>
        </tr>
        <tr>
          <td
            colSpan="3"
            className=""
            style={{
              display: competitor.showEditCompetitor ? "table-cell" : "none",
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
                      <strong>{competitor.name}</strong>
                    </p>
                    <p>
                      Kikkerpunten
                      <br />
                      <strong>{onCalculatePointsFromLogs(logs)}</strong>
                    </p>
                    <p>
                      Aantal logs
                      <br />
                      <strong>{logs.length}</strong>
                    </p>
                    <p>
                      Aangemaakt
                      <br />
                      <strong>
                        {competitor.dateAdded.format("D/MM/YY, H:mm:ss")}
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
                      onSubmit={this.handleShowDeleteModal}
                    >
                      <div className="form-group">
                        <button type="submit" className="btn btn-secondary">
                          <Octicon name="trashcan" />
                          &nbsp;Verwijder {competitor.name}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td
            colSpan="3"
            style={{
              display: competitor.showLogCompetitor ? "table-cell" : "none",
              paddingBottom: 15,
              borderTop: this.state.isActiveRow ? "0" : "1px solid #ddd"
            }}
          >
            <div className="row">
              <div className="col-sm">
                <div className="card">
                  <div className="card-header">
                    Kikkerpunten voor {competitor.name} toevoegen
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
                </div>
                <div className="card mt-2">
                  <div className="card-header">
                    Historiek van {competitor.name}
                  </div>
                  <div className="card-body">
                    <div
                      className="list-group list-group-flush mx-auto"
                      style={{ maxWidth: 500 }}
                    >
                      {logs.sort(this.compareDate).map(log => (
                        <Log
                          key={log.id}
                          log={log}
                          name={competitor.name}
                          onDeleteLog={(name, id) => onDeleteLog(name, id)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Modal
              visible={this.state.showDeleteModal}
              onClickBackdrop={this.handleCancelModal}
            >
              <div className="modal-header">
                <h5 className="modal-title">Ben je zeker?</h5>
              </div>
              <div className="modal-body">
                <p>
                  Wil je <strong>{competitor.name}</strong> verwijderen?
                </p>
                <p className="text-muted">
                  Het verwijderen van {competitor.name} zorgt ervoor dat de{" "}
                  <strong>volledige historiek</strong> van {competitor.name} zal
                  verwijderd worden.
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={this.handleCancelModal}
                >
                  Annuleren
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={this.onDeleteCompetitorHelper}
                >
                  Verwijderen
                </button>
              </div>
            </Modal>
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
  handleShowDeleteModal = e => {
    e.preventDefault();
    this.setState({ showDeleteModal: true });
  };
  handleCancelModal = () => {
    this.setState({ showDeleteModal: false });
  };
  onDeleteCompetitorHelper = () => {
    this.setState({ showDeleteModal: false });
    this.props.onDeleteCompetitor(this.props.competitor.name);
  };
  handleEnter(event) {
    if (event.keyCode === 13) {
      const form = event.target.form;
      const index = Array.prototype.indexOf.call(form, event.target);
      form.elements[index + 1].focus();
      event.preventDefault();
    }
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

  onUpdateCompetitorName = e => {
    e.preventDefault();
    this.props.onUpdateCompetitorName(
      this.props.competitor.name,
      this.state.newName
    );
    this.props.onShowEditCompetitor(this.props.competitor.name);
  };

  getShowEditCompetitorClasses = () => {
    return this.getShowButtonClasses(
      this.props.competitor.showEditCompetitor,
      "outline-secondary"
    );
  };
  getShowLogCompetitorClasses = () => {
    return this.getShowButtonClasses(
      this.props.competitor.showLogCompetitor,
      "outline-info"
    );
  };
  getShowButtonClasses = (state, style) => {
    const classes = "btn btn-" + style + " btn-sm ";
    return state ? classes + "active" : classes;
  };
}

export default Competitor;
