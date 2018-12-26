import React, { Component } from "react";
import * as moment from "moment";

class Log extends Component {
  state = {
    id: this.props.id,
    date: this.props.date,
    amount: this.props.amount,
    reason: this.props.reason
  };
  render() {
    moment.locale("nl-be");
    const date = (
      <span>
        <>{this.state.date.format("H:mm:ss")}</>&nbsp;
        <small>{this.state.date.format("D MMMM")}</small>
      </span>
    );
    return (
      <div className="list-group" style={{ maxWidth: 400 }}>
        <div className="list-group-item">
          {/*<span className="badge">{this.state.amount}</span>*/}
          <h4 className="list-group-item-heading">
            {this.state.reason}&nbsp;
            <span className="pull-right">
              <small>Punten:&nbsp;</small>
              <span className="label label-info">{this.state.amount}</span>
            </span>
          </h4>
          <br />
          <p className="list-group-item-text">
            {date}
            <button
              className="btn btn-danger text-danger btn-xs pull-right"
              onClick={() =>
                this.props.onDeleteLog(this.props.name, this.state.id)
              }
            >
              <i className="glyphicon glyphicon-trash" />
            </button>
          </p>
        </div>
      </div>
    );
  }
}

export default Log;
