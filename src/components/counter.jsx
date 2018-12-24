import React, { Component } from "react";

class Counter extends Component {
  state = {
    count: 0,
    competitors: ["Ken", "Mike", "Sieger"]
  };

  render() {
    return (
      <div>
        <h4>
          Alle deelnemers{" "}
          <span className="label label-info">
            {this.formatCompetitorAmount()}
          </span>
        </h4>
        {this.state.competitors.length === 0 && "Voeg deelnemers toe!"}
        {this.renderCompetitors()}
        <button
          onClick={this.handleIncrement}
          className="btn btn-secondary btn-sm"
        >
          Increment
        </button>{" "}
        <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
      </div>
    );
  }

  renderCompetitors() {
    if (this.state.competitors.length === 0)
      return <p>Er zijn geen deelnemers :(</p>;

    return (
      <ul>
        {this.state.competitors.map(competitor => (
          <li key={competitor}>{competitor}</li>
        ))}
      </ul>
    );
  }

  handleIncrement = () => {
    this.setState(prevState => ({
      count: prevState.count + 1
    }));
  };

  getBadgeClasses() {
    let badge = "label label-";
    badge += this.state.count === 0 ? "warning" : "primary";
    return badge;
  }

  formatCount() {
    const { count } = this.state;
    return count === 0 ? "Zero" : count;
  }
  formatCompetitorAmount = () => {
    const amount = this.state.competitors.length;
    return amount === 0 ? "Zero" : amount;
  };
}

export default Counter;
