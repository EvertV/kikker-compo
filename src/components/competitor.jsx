import React, { Component } from "react";

class Competitor extends Component {
  state = {
    points: this.props.points,
    name: this.props.name
  };

  render() {
    return (
      <tr>
        <td>{this.state.name}</td>
        <td>{this.state.points}</td>
        <td className="text-center">
          <button
            onClick={this.handleIncrement}
            className="btn btn-success btn-sm"
          >
            <i className="glyphicon glyphicon-plus" />
          </button>{" "}
          <button
            onClick={this.handleDecrease}
            className="btn btn-danger btn-sm"
          >
            <i className="glyphicon glyphicon-minus" />
          </button>
        </td>
      </tr>
    );
  }

  handleDecrease = () => {
    this.setState(prevState => ({ points: prevState.points - 1 }));
  };
  handleIncrement = () => {
    this.setState(prevState => ({ points: prevState.points + 1 }));
  };
}

export default Competitor;
