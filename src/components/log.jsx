import React, { Component } from "react";
import * as moment from "moment";

class Log extends Component {
  state = {
    id: this.props.log.id,
    date: this.props.log.date,
    amount: this.props.log.amount,
    reason: this.props.log.reason
  };
  render() {
    moment.locale("nl-be");
    const date = (
      <span>
        {this.state.date.format("Humm")}&nbsp;
        <small>{this.state.date.format("D MMMM")}</small>
      </span>
    );
    return (
      <div className="list-group-item">
        {/*<span className="badge">{this.state.amount}</span>*/}
        <h4 className="list-group-item-heading">
          {this.state.reason}&nbsp;
          <span className="pull-right">
            <small>Punten:&nbsp;</small>
            <span className={this.getLabelClasses()}>{this.state.amount}</span>
          </span>
        </h4>
        <i>{this.props.name}</i>
        <p className="list-group-item-text">
          {date}
          <button
            className="btn btn-link btn-xs pull-right"
            onClick={() =>
              this.props.onDeleteLog(this.props.name, this.state.id)
            }
          >
            <i className="glyphicon glyphicon-trash" />
          </button>
        </p>
      </div>
    );
  }
  getLabelClasses() {
    return "label label-" + (this.state.amount > 0 ? "info" : "danger");
  }
}

export default Log;
