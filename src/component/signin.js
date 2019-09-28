import React, { Component } from "react";
import withFirebaseAuth from "react-with-firebase-auth";
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../firebaseConfig";

const firebaseApp = firebase.initializeApp(firebaseConfig);

class Signin extends Component {
  render() {
    const { user, signOut, signInWithGoogle } = this.props;

    return (
      <React.Fragment>
        <header>
          {user ? (
            <div>
              <img src={user.photoURL} />
              <p>Hello, {user.displayName}</p>{" "}
            </div>
          ) : (
            <p>Please sign in.</p>
          )}

          {user ? (
            <button onClick={signOut}>Sign out</button>
          ) : (
            <button onClick={signInWithGoogle}>Sign in with Google</button>
          )}
        </header>
      </React.Fragment>
    );
  }
}

const firebaseAppAuth = firebaseApp.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider()
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth
})(Signin);
