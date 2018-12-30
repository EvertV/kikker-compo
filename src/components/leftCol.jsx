import React, { Component } from "react";
import PointsInfo from "./pointsInfo";
import SignInScreen from "./signInScreen";

class LeftCol extends Component {
  render() {
    return (
      <div className="float-left" style={{ width: 320, maxHeight: 500 }}>
        <SignInScreen
          isSignedIn={this.props.isSignedIn}
          onSetSignedInState={state => this.props.onSetSignedInState(state)}
        />
        <PointsInfo />
      </div>
    );
  }
}

export default LeftCol;
