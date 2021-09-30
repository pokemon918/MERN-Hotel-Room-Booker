import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Route, Switch, Redirect } from "react-router-dom";
import NotFound from "./not-found";
import ProfileDetails from "./profile-details";
import UserBookings from "./user-bookings";

class Profile extends Component {
  render() {
    return (
      <div className="profile-page container-fluid position-absolute">
        <ul className="nav nav-tabs overflow-visible position-absolute bg-white mt-2">
          <li className="nav-item">
            <Link to="/profile/myprofile" className="nav-link text-dark">
              Profile
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to={`/profile/mybookings/${this.props.user._id}`}
              className="nav-link text-dark"
            >
              Bookings
            </Link>
          </li>
        </ul>
        <div className="profile-menus px-4">
          <Switch>
            <Route path="/not-found" component={NotFound} />
            <Route
              path="/profile/myprofile"
              render={(props) => (
                <ProfileDetails {...props} user={this.props.user} />
              )}
            />
            <Route
              path="/profile/mybookings/:id"
              render={(props) => (
                <UserBookings {...props} user={this.props.user} />
              )}
            />
            <Redirect from="/profile" exact to="/profile/myprofile" />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Profile;
