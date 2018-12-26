import React, { Component } from "react";
import * as moment from "moment";

class Log extends Component {
  state = {
    date: this.props.date,
    amount: this.props.amount,
    reason: this.props.reason
  };
  render() {
    moment.locale("nl-be");
    const date = this.state.date.format("h:mm:ss, D MMM");
    return (
      <tr>
        <td>{date}</td>
        <td>{this.state.amount}</td>
        <td>{this.state.reason}</td>
        <td>
          <button
            className="btn btn-danger btn-sm"
            onClick={this.props.onDelete}
          >
            <i className="glyphicon glyphicon-trash" />
          </button>
        </td>
      </tr>
    );
  }
}

export default Log;
