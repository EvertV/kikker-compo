import React, { Component } from "react";
import Competitor from "./competitor";

class TableCompetitors extends Component {
  state = {
    competitors: this.props.competitors
  };

  componentWillReceiveProps(nextProps) {
    if (this.props != nextProps) {
      this.setState({
        competitors: nextProps.competitors
      });
    }
  }

  render() {
    return (
      <table className="table table-responsive">
        <thead>
          <tr>
            <th>Naam</th>
            <th>Punten</th>
            <th className="text-center">Acties</th>
          </tr>
        </thead>
        <tbody>
          {this.state.competitors.sort(this.comparePoints).map(c => (
            <Competitor key={c.name} name={c.name} points={c.points} />
          ))}
        </tbody>
      </table>
    );
  }
  comparePoints(a, b) {
    // Use toUpperCase() to ignore character casing
    const userPointsA = a.points;
    const userPointsB = b.points;

    let comparison = 0;
    if (userPointsA < userPointsB) {
      comparison = 1;
    } else if (userPointsA > userPointsB) {
      comparison = -1;
    }
    return comparison;
  }
}

export default TableCompetitors;
