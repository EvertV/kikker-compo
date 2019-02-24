import React, { Component } from "react";
import Octicon from "react-octicon";
import firebase from "firebase";
import { NavLink } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <NavLink exact className="navbar-brand" to="/">
          Kikker Compo
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item" >
              <NavLink exact className="nav-link" to="/">
                Scoreboard 
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/logs">
                Logs
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/deelnemers">
                Deelnemers
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ">
            <li className="nav-item">
              <NavLink className="nav-link" to="/account">
                <Octicon name="person" />{" "}{firebase.auth().currentUser ? `${firebase.auth().currentUser.displayName ? firebase.auth().currentUser.displayName : "Mijn Account"}` : "Inloggen"}
              </NavLink>
            </li>
          </ul>
          {/*<form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Zoek naam"
              onChange={this.props.onChangeSearch}
            />
            <button className="btn btn-outline-light my-2 my-sm-0" type="submit">
              Zoek
            </button>
          </form>*/}
        </div>
      </nav>
    );
  }
}

export default Navbar;
