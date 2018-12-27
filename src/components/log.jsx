import React, { Component } from "react";
import * as moment from "moment";

class Log extends Component {
  render() {
    moment.locale("nl-be");
    return (
      <div className="list-group-item">
        <h4 className="list-group-item-heading">
          {this.props.log.reason}&nbsp;
          <span className="pull-right">
            <small>Punten:&nbsp;</small>
            <span className={this.getLabelClasses()}>
              {this.props.log.amount}
            </span>
          </span>
        </h4>
        <i>{this.props.name}</i>
        <p className="list-group-item-text">
          <span>
            {this.props.log.date.format("Humm")}&nbsp;
            <small>{this.props.log.date.format("D MMMM")}</small>
          </span>
          <button
            className="btn btn-link btn-xs pull-right"
            onClick={() =>
              this.props.onDeleteLog(this.props.name, this.props.log.id)
            }
          >
            <i className="glyphicon glyphicon-trash" />
          </button>
        </p>
      </div>
    );
  }
  getLabelClasses() {
    return "label label-" + (this.props.log.amount > 0 ? "info" : "danger");
  }
}

export default Log;
