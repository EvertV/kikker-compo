import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";
import Octicon from "react-octicon";
import * as moment from "moment";
require("moment/locale/nl-be.js");

class SignInScreen extends React.Component {
  // Configure FirebaseUI.
  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    // We will display Google and Facebook as auth providers.
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false
    }
  };
  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    this.props.onSetSignedInState();
  }

  render() {
    if (!this.props.isSignedIn) {
      return (
        <div className="container">
          <div className="card mb-2 mt-5 mx-auto" 
          style={{maxWidth:500}}>
            <div className="card-body">
            <h5 className="card-title text-center mb-3">Inloggen</h5>
            
              <StyledFirebaseAuth
                uiConfig={this.uiConfig}
                firebaseAuth={firebase.auth()}
              />
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="container">
        <div className="card mb-2 mt-5 mx-auto"
          style={{maxWidth:500}}>
          <div className="card-body">
            <h5 className="card-title">
              <img
                src={firebase.auth().currentUser.photoURL}
                alt={
                  "Profielfoto van" + firebase.auth().currentUser.displayName
                }
                className="img-thumbnail"
                width="50"
              />{" "}
              {firebase.auth().currentUser.displayName}
            </h5>
            <p className="lead text-muted">
              <small>
                Je bent ingelogd sinds
                <br />
              </small>
              {moment(
                firebase.auth().currentUser.metadata.lastSignInTime
              ).format("lll")}
            </p>
          </div>

          <div className="card-footer">
            <button
              className="btn btn-sm btn-secondary float-right"
              onClick={() => firebase.auth().signOut()}
            >
              <Octicon name="sign-out" />
              &nbsp;Uitloggen
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default SignInScreen;
