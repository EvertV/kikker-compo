import React, { Component } from "react";

class pointInfo extends Component {
  render() {
    const infoElements = [
      {
        reason: "PINTEU",
        points: 1
      },
      {
        reason: "Vuile fart",
        points: 3
      },
      {
        reason: "Adje",
        points: 5
      },
      {
        reason: "Axel-fart",
        points: 7
      },
      {
        reason: "Luide boer",
        points: 2
      },
      {
        reason: "Gooien me nootjes",
        points: 2
      }
    ];
    return (
      <div className="card d-none d-xxl-block">
        <div className="card-body">
          <h3 className="card-title">Info</h3>
        </div>
        <div className="list-group list-group-flush" style={{ maxWidth: 500 }}>
          {infoElements
            .sort(function(a, b) {
              return a.points - b.points;
            })
            .map(element => (
              <div key={element.reason} className="list-group-item">
                {element.reason}
                <small className="d-none d-sm-inline float-right">
                  Punten:&nbsp;
                  <span className="badge badge-pill badge-dark">
                    {element.points}
                  </span>
                </small>
              </div>
            ))}
        </div>
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

export default pointInfo;
