import React, { Component } from "react";
import Competitor from "./competitor";

class TableCompetitors extends Component {
  render() {
    return (
      <div /*className="table-responsive"*/>
        <table className="table">
          <thead>
            <tr>
              <th>Naam</th>
              <th>Kikkerpunten</th>
              <th>Acties</th>
            </tr>
          </thead>
          <tbody>
            {this.props.competitors.sort(this.comparePoints).map(c => (
              <Competitor
                key={c.name}
                competitor={c}
                logs={c.logs}
                onDeleteLog={(name, id) =>
                  this.props.onDeleteLogCompetitor(name, id)
                }
                onAddLog={(name, amount, reason) =>
                  this.props.onAddLogCompetitor(name, amount, reason)
                }
                onDeleteCompetitor={name => this.props.onDeleteCompetitor(name)}
                onUpdateCompetitorName={(oldName, newName) =>
                  this.props.onUpdateCompetitorName(oldName, newName)
                }
                onCalculatePointsFromLogs={logArray =>
                  this.props.onCalculatePointsFromLogs(logArray)
                }
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  comparePoints = (a, b) => {
    const userPointsA = this.props.onCalculatePointsFromLogs(a.logs);
    const userPointsB = this.props.onCalculatePointsFromLogs(b.logs);

    let comparison = 0;
    if (userPointsA < userPointsB) {
      comparison = 1;
    } else if (userPointsA > userPointsB) {
      comparison = -1;
    }
    return comparison;
  };
}

export default TableCompetitors;
