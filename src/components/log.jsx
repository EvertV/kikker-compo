import React, { Component } from "react";
import Octicon from "react-octicon";
import Modal from "react-bootstrap4-modal";
require("moment/locale/nl-be.js");

class Log extends Component {
  state = {
    showDeleteModal: false,
    fromNowDate: this.props.log.date.fromNow()
  };
  componentDidMount() {
    this.interval = setInterval(this.updateFromNowTime.bind(this), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  updateFromNowTime = () => {
    this.setState({ fromNowDate: this.props.log.date.fromNow() });
  };

  render() {
    const { log, displayMode, isSignedIn } = this.props;
    const { fromNowDate, showDeleteModal } = this.state;
    const name = this.props.name || this.props.log.competitorName;
    return (
      <div className="list-group-item">
        <p>
          <big>
            {log.reason + " "}
            <span
              className="float-right"
              style={{
                display: log.amount !== 0 ? "block" : "none"
              }}
            >
              <small className={displayMode ? "d-none" : "d-none d-sm-inline"}>
                Punten:&nbsp;
              </small>
              <span className={this.getLabelClasses()}>{log.amount}</span>
            </span>
          </big>
        </p>
        <p
          className="lead"
          style={{
            display: displayMode ? "block" : "none"
          }}
        >
          {name}
        </p>
        <p>
          <small
            className="text-muted font-weight-normal"
            title={log.date.format("HH:mm:ss - dddd D MMM 'YY")}
          >
            {displayMode ? fromNowDate : log.date.format("HHumm")}{" "}
            <span
              className={
                displayMode
                  ? "font-weight-lighter d-none"
                  : "font-weight-lighter"
              }
            >
              {log.date.format("D MMM")}
            </span>
            <span
              style={{
                display: log.addedBy ? "inline" : "none"
              }}
            >
              {" "}
              - <span className="font-italic">{log.addedBy}</span>
            </span>
          </small>
          <button
            className="btn btn-link btn-sm float-right"
            onClick={this.handleShowDeleteModal}
            style={{ display: isSignedIn ? "inline" : "none" }}
          >
            <Octicon name="trashcan" />
          </button>
        </p>

        <Modal visible={showDeleteModal} onClickBackdrop={this.handleCancel}>
          <div className="modal-header">
            <h5 className="modal-title">Ben je zeker?</h5>
          </div>
          <div className="modal-body">
            <p>
              Wil je <strong>{log.amount}</strong> kikkerpunt
              {log.amount === 1 ? "" : "en"} van <strong>{name}</strong>{" "}
              verwijderen?
            </p>
            <p className="text-muted">Reden: {log.reason}</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={this.handleCancel}
            >
              Annuleren
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={this.handleOk}
            >
              <Octicon name="trashcan" />
              &nbsp;Verwijderen
            </button>
          </div>
        </Modal>
      </div>
    );
  }
  getLabelClasses() {
    return (
      "badge badge-pill badge-" +
      (this.props.log.amount >= 0 ? "dark" : "danger")
    );
  }

  handleShowDeleteModal = () => {
    this.setState({ showDeleteModal: true });
  };
  handleCancel = () => {
    this.setState({ showDeleteModal: false });
  };
  handleOk = () => {
    this.setState({ showDeleteModal: false });
    const name = this.props.name || this.props.log.competitorName;
    this.props.onDeleteLog(name, this.props.log.id);
  };
}

export default Log;
