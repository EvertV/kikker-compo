import React, { Component } from "react";
import Log from "./log";

class RecentLogs extends Component {
  render() {
    const competitors = this.props.competitors.slice(0);
    const allLogs = competitors
      .filter(c => {
        if (c.logs.length <= 0) {
          return false; // skip
        }
        return true;
      })
      .map(c => {
        return c.logs.map(l => {
          return {
            date: l.date,
            id: l.id,
            amount: l.amount,
            reason: l.reason,
            competitorName: c.name
          };
        });
      });

    let logsInOneArray = [];
    allLogs.forEach(array => {
      array.forEach(log => {
        logsInOneArray = [
          ...logsInOneArray,
          {
            date: log.date,
            id: log.id,
            amount: log.amount,
            reason: log.reason,
            competitorName: log.competitorName
          }
        ];
      });
    });

    const recentLogs = logsInOneArray.sort(this.compareDate).slice(0, 3);

    return (
      <div className="card mt-2 float-right">
        <div className="card-header">Recent verdiende kikkerpunten</div>
        <div className="card-body">
          <div
            className="list-group list-group-flush mx-auto"
            style={{ maxWidth: 500 }}
          >
            {recentLogs.map(log => (
              <Log key={log.id + "display"} log={log} displayMode={true} />
            ))}
          </div>
        </div>
      </div>
    );
  }
  compareDate(a, b) {
    const userDateA = a.date;
    const userDateB = b.date;

    let comparison = 0;
    if (userDateA < userDateB) {
      comparison = 1;
    } else if (userDateA > userDateB) {
      comparison = -1;
    }
    return comparison;
  }
}

export default RecentLogs;
