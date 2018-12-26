import React, { Component } from "react";
import Competitor from "./competitor";

class TableCompetitors extends Component {
  state = {
    competitors: this.props.competitors
  };

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        competitors: nextProps.competitors
      });
    }
  }

  render() {
    return (
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Naam</th>
              <th>Punten</th>
              <th>Acties</th>
            </tr>
          </thead>
          <tbody>
            {this.state.competitors.sort(this.comparePoints).map(c => (
              <Competitor
                key={c.name}
                name={c.name}
                points={c.points}
                logs={c.logs}
                onDeleteLog={(name, id) =>
                  this.props.onDeleteLogCompetitor(name, id)
                }
                onDeleteCompetitor={name => this.props.onDeleteCompetitor(name)}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  comparePoints(a, b) {
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
