import React, { Component } from "react";
import Octicon from "react-octicon";
import Modal from "react-bootstrap4-modal";

class ManageCompetitor extends Component {
  state = {
    newName: this.props.competitor.name,
    showDeleteModal: false,
    showEditModal: false,
    showDetailsButtonOnHover: false,
    showPencilIcon:false
  };

  render() {
    const { isSignedIn, onCalculatePointsFromLogs, competitor } = this.props;
    return (<>
      <li
        className="list-group-item list-group-item-action"
        onClick={this.handleShowEditModal}
        onMouseEnter={() => this.handleMouseEnterItem()}
        onMouseLeave={() => this.handleMouseLeaveItem()}
        style={{cursor:"pointer"}}
      >
        {competitor.name}
        <Octicon name={isSignedIn ? "pencil" : "search"} className="float-right pt-1" 
                    style={{
                      display: this.state.showPencilIcon
                        ? "block"
                        : "none"
                    }}/>
      </li>
      <Modal
      visible={this.state.showEditModal}
      onClickBackdrop={this.handleCancelEditModal}
    >
      <div className="modal-header">
        <h5 className="modal-title">Details {competitor.name}</h5>
      </div>
      <div className="modal-body">
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
              <strong>{onCalculatePointsFromLogs(competitor.logs)}</strong>
            </p>
            <p>
              Aantal logs
              <br />
              <strong>{competitor.logs.length}</strong>
            </p>
            <p>
              Aangemaakt op
              <br />
              <strong>
                {competitor.dateAdded.format("D/MM/YY, H:mm:ss")}
              </strong>
            </p>
            {competitor.addedBy && <p>
              Aangemaakt door
              <br />
              <strong>
                {competitor.addedBy}
              </strong>
            </p>}
          </div>
        </div>
        <div
          className="card mb-3"
          style={{
            display: isSignedIn ? "block" : "none"
          }}
        >
          <div className="card-header">Bewerk {competitor.name}</div>
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
                />
                <span className="input-group-append">
                  <button type="submit" className="btn btn-primary">
                    <Octicon name="check" />
                    &nbsp;Naam wijzigen
                  </button>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div
        className="modal-footer"
        style={{display:"inline-block"}}
      >
        <button
          type="submit"
          className="btn btn-danger float-left"
          onClick={this.handleShowDeleteModal}
          style={{
            display: isSignedIn ? "inline" : "none"
          }}
        >
          <Octicon name="trashcan" />
          &nbsp;Verwijder {competitor.name}
        </button>
        <button
          type="submit"
          className="btn btn-secondary float-right"
          onClick={this.handleCancelEditModal}
        >
          <Octicon name="x" />
          &nbsp;Sluit
        </button>
      </div>
    </Modal>

    <Modal
      visible={this.state.showDeleteModal}
      onClickBackdrop={this.handleCancelDeleteModal}
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
          onClick={this.handleCancelDeleteModal}
        >
          Annuleren
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={this.onDeleteCompetitorHelper}
        >
          <Octicon name="trashcan" />
          &nbsp;Verwijderen
        </button>
      </div>
    </Modal>
    </>
    )
  }

  onUpdateCompetitorName = e => {
    e.preventDefault();
    this.props.onUpdateCompetitorName(
      this.props.competitor.name,
      this.state.newName
    );
  };
  handleNameChange = e => {
    this.setState({ newName: e.target.value });
  };
  handleShowDeleteModal = () => {
    this.setState({ showDeleteModal: true });
  };
  handleCancelDeleteModal = () => {
    this.setState({ showDeleteModal: false });
  };
  onDeleteCompetitorHelper = () => {
    this.setState({ showDeleteModal: false });
    this.props.onDeleteCompetitor(this.props.competitor.name);
  };
  handleShowEditModal = e => {
    e.preventDefault();
    this.setState({ showEditModal: true });
  };
  handleCancelEditModal = () => {
    this.setState({ showEditModal: false });
  };
  handleMouseEnterItem = () => {
    this.setState({ showPencilIcon: true });
  }
  handleMouseLeaveItem = () => {
    this.setState({ showPencilIcon: false });
  }
}

export default ManageCompetitor;
