import React, { Component } from "react";
import * as moment from "moment";
import Octicon from "react-octicon";
import Modal from "react-bootstrap4-modal";

class Log extends Component {
  state = {
    showDeleteModal: false
  };
  render() {
    moment.locale("nl-be");
    const { log, name, displayMode } = this.props;
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
          <span className="text-muted font-weight-normal">
            {log.date.format("Humm")}&nbsp;
            <small className="font-weight-lighter">
              {log.date.format("D MMM")}
            </small>
          </span>
          <button
            className="btn btn-link btn-sm float-right"
            style={{
              display: displayMode ? "none" : "inline-block"
            }}
            onClick={this.handleShowDeleteModal}
          >
            <Octicon name="trashcan" />
          </button>
        </p>

        <Modal
          visible={this.state.showDeleteModal}
          onClickBackdrop={this.handleCancel}
        >
          <div className="modal-header">
            <h5 className="modal-title">Ben je zeker?</h5>
          </div>
          <div className="modal-body">
            <p>
              <strong>{log.amount}</strong> kikkerpunten van{" "}
              <strong>{name}</strong> verwijderen?
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
      (this.props.log.amount > 0 ? "dark" : "danger")
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
    this.props.onDeleteLog(this.props.name, this.props.log.id);
  };
}

export default Log;
