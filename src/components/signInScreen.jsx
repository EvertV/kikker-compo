import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";
import Octicon from "react-octicon";
import * as moment from "moment";
require("moment/locale/nl-be.js");

const config = {
  apiKey: "AIzaSyA9-EzlXM_COSeuN8R9MZZ34unSgzqYoZw",
  authDomain: "kikker-compo.firebaseapp.com",
  databaseURL: "https://kikker-compo.firebaseio.com",
  projectId: "kikker-compo",
  storageBucket: "kikker-compo.appspot.com",
  messagingSenderId: "211299776551"
};
firebase.initializeApp(config);

class SignInScreen extends React.Component {
  // Configure FirebaseUI.
  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        requireDisplayName: false
      },
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false
    }
  };

  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      this.props.onSetSignedInState(!!user);
    });
  }

  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    if (!this.props.isSignedIn) {
      return (
        <div className="card mb-2">
          <div className="card-body">
            <h3 className="card-title">Account</h3>
            <StyledFirebaseAuth
              uiConfig={this.uiConfig}
              firebaseAuth={firebase.auth()}
            />
          </div>
        </div>
      );
    }
    return (
      <div className="card mb-2">
        <div className="card-body">
          <h5 className="card-title">
            <img
              src={firebase.auth().currentUser.photoURL}
              alt={"Profielfoto van" + firebase.auth().currentUser.displayName}
              className="img-thumbnail"
              width="50"
            />{" "}
            {firebase.auth().currentUser.displayName}
          </h5>
          <p className="lead">
            <small>
              Je bent ingelogd sinds
              <br />
            </small>
            {moment(firebase.auth().currentUser.metadata.lastSignInTime).format(
              "lll"
            )}
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
    );
  }
}
export default SignInScreen;
