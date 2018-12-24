import React, { Component } from "react";
import "./App.css";
import Scoreboard from "./components/scoreboard";
import Header from "./components/header";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Scoreboard />
      </React.Fragment>
    );
  }
}

export default App;
