import React, { Component } from "react";
import Log from "./log";

class AllLogs extends Component {
  state = {
    showRecentLogsAmount: 20
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
            competitorName: c.name,
            addedBy: l.addedBy
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
            competitorName: log.competitorName,
            addedBy: log.addedBy
          }
        ];
      });
    });

    const recentLogs = logsInOneArray
      .sort(this.compareDate)
      .slice(0, this.state.showRecentLogsAmount);

    return (
      <div
        className="card container mt-3 mb-5 recent-logs"style={{maxWidth: 600}}
      >
        <div className="card-body">
          <h3 className="card-title">Alle logs</h3>
        </div>
        <div className="list-group list-group-flush">
          {recentLogs.sort(this.compareDate).map(log => (
            <Log
              key={log.id + "display"}
              log={log}
              name={log.name}
              displayMode={true}
              isSignedIn={this.props.isSignedIn}
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
      showRecentLogsAmount: prevState.showRecentLogsAmount + 10
    }));
  };
}

export default AllLogs;
