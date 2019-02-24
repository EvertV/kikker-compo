import React, { Component } from "react";
import TableCompetitors from "./components/tableCompetitors";
import ManageCompetitors from "./components/manageCompetitors";
import RecentLogs from "./components/recentLogs";
import AllLogs from "./components/allLogs";
import * as moment from "moment";
import firebase from "firebase";
import SignInScreen from "./components/signInScreen";
import NavBar from "./components/navBar";
import { Route, Switch } from "react-router-dom";

const config = {
  apiKey: "AIzaSyA9-EzlXM_COSeuN8R9MZZ34unSgzqYoZw",
  authDomain: "kikker-compo.firebaseapp.com",
  databaseURL: "https://kikker-compo.firebaseio.com",
  projectId: "kikker-compo",
  storageBucket: "kikker-compo.appspot.com",
  messagingSenderId: "211299776551"
};
firebase.initializeApp(config);
class App extends Component {
  state = {
    showAddCompetitor: false,
    isSignedIn: false,
    competitors: [
      {
        name: "Bezig met laden...",
        dateAdded: moment(),
        showDetailsCompetitor: false,
        logs: [
          {
            date: moment(),
            id: "xdxpx3",
            amount: 0,
            reason: "Bezig met laden..."
          }
        ]
      }
    ]
  };
  writeToDatabase = () => {
    this.state.competitors.forEach(competitor => {
      firebase
        .database()
        .ref("competitors/" + competitor.name)
        .set({
          name: competitor.name,
          dateAdded: competitor.dateAdded.format(),
          showDetailsCompetitor: competitor.showDetailsCompetitor,
          addedBy: competitor.addedBy,
          logs: competitor.logs.map(log => {
            return {
              date: log.date.format(),
              id: log.id,
              amount: log.amount,
              reason: log.reason,
              addedBy: log.addedBy
            };
          })
        });
    });
  };
  getFromDatabase = () => {
    const dbCompetitors = firebase.database().ref("competitors/");
    dbCompetitors.on("value", snapshot => {
      this.updateCompetitors(snapshot.val());
    });
  };
  updateCompetitors = arrayCompetitors => {
    arrayCompetitors = Object.values(arrayCompetitors);

    arrayCompetitors = arrayCompetitors.map(competitor => {
      return {
        name: competitor.name,
        dateAdded: moment(competitor.dateAdded),
        showDetailsCompetitor: false,
        addedBy: competitor.addedBy,
        logs: competitor.logs
          ? competitor.logs.map(log => {
              return {
                date: moment(log.date),
                id: log.id,
                amount: log.amount,
                reason: log.reason,
                addedBy: log.addedBy
              };
            })
          : []
      };
    });

    if (arrayCompetitors.length > 0)
      this.setState({ competitors: arrayCompetitors });
  };
  componentDidMount() {
    this.getFromDatabase();
    this.handleSetSignedInState(); // Listen to the Firebase Auth state and set the local state.
  }
  componentWillMount() {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        databaseURL: "https://kikker-compo.firebaseio.com/"
      });
    }
  }

  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Switch>
          <Route
            path="/account"
            render={props => (
              <SignInScreen
                {...props}
                isSignedIn={this.state.isSignedIn}
                onSetSignedInState={state => this.handleSetSignedInState(state)}
              />
            )}
          />
          <Route
            path="/logs"
            render={props => (
              <AllLogs
                {...props}
                competitors={this.state.competitors}
                isSignedIn={this.state.isSignedIn}
                onDeleteLog={(name, id) =>
                  this.handleDeleteLogCompetitor(name, id)
                }
              />
            )}
          />
          <Route
            path="/deelnemers"
            render={props => (
              <ManageCompetitors
                {...props}
                isSignedIn={this.state.isSignedIn}
                competitors={this.state.competitors}
                onAddCompetitor={this.handleAddCompetitor}
                onShowAddCompetitor={this.handleShowAddCompetitor}
                showAddCompetitor={this.state.showAddCompetitor}
                onCalculatePointsFromLogs={logArray =>
                  this.handleCalculatePointsFromLogs(logArray)
                }
                onUpdateCompetitorName={(oldName, newName) =>
                  this.handleUpdateCompetitorName(oldName, newName)
                }
                onDeleteCompetitor={name => this.handleDeleteCompetitor(name)}
              />
            )}
          />
          <Route
            path="/"
            render={props => (
              <div className="container-fluid">
                <div className="mt-2 page-header text-center">
                  <h1 className="display-4">
                    Kikker&nbsp;Compo
                    <p className="text-muted lead">Gateway&nbsp;Gaming</p>
                  </h1>
                </div>

                <RecentLogs
                  competitors={this.state.competitors}
                  isSignedIn={this.state.isSignedIn}
                  onDeleteLog={(name, id) =>
                    this.handleDeleteLogCompetitor(name, id)
                  }
                />
                <div className="container">
                  <TableCompetitors
                    isSignedIn={this.state.isSignedIn}
                    competitors={this.state.competitors}
                    onDeleteLogCompetitor={(name, id) =>
                      this.handleDeleteLogCompetitor(name, id)
                    }
                    onAddLogCompetitor={(name, amount, reason) =>
                      this.handleAddLogCompetitor(name, amount, reason)
                    }
                    onCalculatePointsFromLogs={logArray =>
                      this.handleCalculatePointsFromLogs(logArray)
                    }
                    onShowDetailsCompetitor={name =>
                      this.handleShowDetailsCompetitor(name)
                    }
                  />
                </div>
              </div>
            )}
          />
        </Switch>
      </React.Fragment>
    );
  }
  handleAddCompetitor = name => {
    if (
      name.trim() !== "" &&
      !this.state.competitors.some(
        c => c["name"].toLowerCase().trim() === name.toLowerCase().trim()
      ) &&
      name.length < 50
    ) {
      this.setState(prevState => ({
        competitors: [
          ...prevState.competitors,
          {
            name: name,
            dateAdded: moment(),
            showDetailsCompetitor: false,
            addedBy: firebase.auth().currentUser.displayName,
            logs: []
          }
        ],
        showAddCompetitor: false
      }));

      firebase
        .database()
        .ref("competitors/" + name)
        .set({
          name,
          dateAdded: moment().format(),
          showDetailsCompetitor: false,
          addedBy: firebase.auth().currentUser.displayName,
          logs: []
        });
      return true;
    }
    return false;
  };
  handleDeleteLogCompetitor = (name, id) => {
    var comps = this.state.competitors;
    comps.forEach(e => {
      if (e.name === name) {
        e.logs = e.logs.filter(el => el.id !== id);
      }
    });

    this.setState(prevState => ({
      competitors: comps
    }));
    this.writeToDatabase();
  };
  handleDeleteCompetitor = name => {
    this.setState(prevState => ({
      competitors: prevState.competitors.filter(el => el.name !== name)
    }));
    firebase
      .database()
      .ref("competitors/" + name)
      .remove();
  };
  handleUpdateCompetitorName = (oldName, newName) => {
    var competitors = this.state.competitors;
    var newCompetitorData = {};
    competitors.forEach(e => {
      if (e.name === oldName) {
        e.name = newName;
        newCompetitorData = e;
      }
    });

    this.setState({ competitors });
    firebase
      .database()
      .ref("competitors/" + oldName)
      .remove();

    firebase
      .database()
      .ref("competitors/" + newCompetitorData.name)
      .set({
        name: newCompetitorData.name,
        dateAdded: newCompetitorData.dateAdded.format(),
        showDetailsCompetitor: newCompetitorData.showDetailsCompetitor,
        logs: newCompetitorData.logs.map(log => {
          return {
            date: log.date.format(),
            id: log.id,
            amount: log.amount,
            reason: log.reason,
            addedBy: log.addedBy
          };
        })
      });
  };
  handleAddLogCompetitor = (name, amount, reason) => {
    if (amount !== "") {
      amount = parseInt(amount);
      if (reason && reason.length < 150 && amount !== 0) {
        var competitors = this.state.competitors;
        competitors.forEach(e => {
          if (e.name === name) {
            e.logs = [
              ...e.logs,
              {
                date: moment(),
                reason: reason,
                showDetailsCompetitor: false,
                id: name + "-log-" + moment() + "-nr-" + e.logs.length,
                amount: parseInt(amount),
                addedBy: firebase.auth().currentUser.displayName
              }
            ];
          }
        });
        this.setState(prevState => ({
          competitors: competitors
        }));
        this.writeToDatabase();
        return true;
      }
    }
    return false;
  };
  handleCalculatePointsFromLogs = logArray => {
    return logArray.reduce(function(totalAmount, log) {
      return totalAmount + log.amount;
    }, 0);
  };

  handleShowDetailsCompetitor = name => {
    var competitors = this.state.competitors.slice(0);
    competitors.map(e => {
      if (e.name === name) {
        e.showDetailsCompetitor = !e.showDetailsCompetitor;
      } else {
        e.showDetailsCompetitor = false;
      }
      return e;
    });

    this.setState({ competitors, showAddCompetitor: false });
  };

  handleShowAddCompetitor = () => {
    var competitors = this.state.competitors.slice(0);
    competitors.map(e => {
      e.showDetailsCompetitor = false;
      return e;
    });
    this.setState(prevState => ({
      competitors,
      showAddCompetitor: !prevState.showAddCompetitor
    }));
  };
  handleSetSignedInState = () => {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user });
    });
  };
}

export default App;
