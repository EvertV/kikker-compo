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
    const { log, name, displayMode } = this.props;
    const { fromNowDate, showDeleteModal } = this.state;
    return (
      <div className="list-group-item">
        <p>
          <big>
            {log.reason + " "}
            <span className="float-right">
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
          {log.competitorName}
        </p>
        <p>
          <span
            className="text-muted font-weight-normal"
            title={log.date.format("H:mm:ss - dddd D MMM 'YY")}
          >
            {displayMode ? fromNowDate : log.date.format("Humm")}&nbsp;
            <small
              className={
                displayMode
                  ? "font-weight-lighter d-none"
                  : "font-weight-lighter"
              }
            >
              {log.date.format("D MMM")}
            </small>
          </span>
          <button
            className="btn btn-link btn-sm float-right"
            onClick={this.handleShowDeleteModal}
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
              Wil je <strong>{log.amount}</strong> kikkerpunt{" "}
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
