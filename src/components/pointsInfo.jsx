import React, { Component } from "react";

class pointInfo extends Component {
  render() {
    const infoElements = [
      {
        naam: "pintje",
        points: 1
      },
      {
        naam: "Vuile fart",
        points: 3
      },
      {
        naam: "Adje",
        points: 5
      },
      {
        naam: "Axel-fart",
        points: 7
      },
      {
        naam: "Luide boer",
        points: 2
      },
      {
        naam: "Gooien me nootjes",
        points: 2
      }
    ];
    return (
      <div
        className="card float-left d-none d-xxl-block"
        style={{ width: 320, maxHeight: 500 }}
      >
        <div className="card-body">
          <h3 className="card-title">Info</h3>
        </div>
        <div className="list-group list-group-flush" style={{ maxWidth: 500 }}>
          {infoElements
            .sort(function(a, b) {
              return a.points - b.points;
            })
            .map(element => (
              <div className="list-group-item">
                {element.naam}
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
