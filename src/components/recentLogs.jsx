import React, { Component } from "react";
import Log from "./log";

class RecentLogs extends Component {
  state = {
    showRecentLogsAmount: 3
  };
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

    const recentLogs = logsInOneArray
      .sort(this.compareDate)
      .slice(0, this.state.showRecentLogsAmount);

    return (
      <div
        className="card float-right d-none d-xxl-block recent-logs"
        style={{ width: 320, maxHeight: 500 }}
      >
        <div className="card-body">
          <h3 className="card-title">Recent</h3>
        </div>
        <div className="list-group list-group-flush" style={{ maxWidth: 500 }}>
          {recentLogs.sort(this.compareDate).map(log => (
            <Log
              key={log.id + "display"}
              log={log}
              name={log.name}
              displayMode={true}
              onDeleteLog={(name, id) => this.props.onDeleteLog(name, id)}
            />
          ))}
        </div>
        <button
          className="btn btn-link btn-block"
          onClick={this.handleLoadMore}
          style={{
            display:
              this.state.showRecentLogsAmount > recentLogs.length
                ? "none"
                : "inline-block"
          }}
        >
          Meer laden...
        </button>
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
  handleLoadMore = () => {
    this.setState(prevState => ({
      showRecentLogsAmount: prevState.showRecentLogsAmount + 5
    }));
  };
}

export default RecentLogs;
