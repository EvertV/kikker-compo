import React, { Component } from "react";
import * as moment from "moment";
import Octicon from "react-octicon";

class Log extends Component {
  render() {
    moment.locale("nl-be");
    return (
      <div className="list-group-item">
        <h5>
          {this.props.log.reason}&nbsp;
          <span className="float-right">
            <small>Punten:&nbsp;</small>
            <span className={this.getLabelClasses()}>
              {this.props.log.amount}
            </span>
          </span>
        </h5>
        <p class="text-muted">
          <span>
            {this.props.log.date.format("Humm")}&nbsp;
            <small>{this.props.log.date.format("D MMM")}</small>
          </span>
          <button
            className="btn btn-link btn-sm float-right"
            onClick={() =>
              this.props.onDeleteLog(this.props.name, this.props.log.id)
            }
          >
            <Octicon name="trashcan" style={{ paddingLeft: 3 }} />
          </button>
        </p>
      </div>
    );
  }
  getLabelClasses() {
    return "badge badge-" + (this.props.log.amount > 0 ? "primary" : "danger");
  }
}

export default Log;
