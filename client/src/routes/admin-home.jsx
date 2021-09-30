import React, { Component } from "react";
import { Link, Route, Switch, Redirect } from "react-router-dom";
import NotFound from "./not-found";
import AllBookings from "./allbookings";
import AllRooms from "./allrooms";
import AddRooms from "./addrooms";
import AllUsers from "./allusers";
import { getRooms } from "./../services/roomService";
import { getBookings } from "./../services/bookingService";
import { getUsers } from "../services/userService";

class AdminHome extends Component {
  constructor() {
    super();
    this.state = {
      rooms: [],
      users: [],
      bookings: [],
    };
  }

  async componentDidMount() {
    const { data: rooms } = await getRooms();
    this.setState({ rooms });

    const { data: bookings } = await getBookings();
    this.setState({ bookings });

    const { data: users } = await getUsers();
    this.setState({ users });
  }

  render() {
    return (
      <div className="admin-home container-fluid position-absolute">
        <ul className="nav nav-tabs overflow-visible position-absolute bg-white mt-2">
          <li className="nav-item">
            <Link to="/admin/all-bookings" className="nav-link text-dark">
              Bookings
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin/all-rooms" className="nav-link text-dark">
              Rooms
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin/add-rooms" className="nav-link text-dark">
              Add Rooms
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin/all-users" className="nav-link text-dark">
              Users
            </Link>
          </li>
        </ul>
        <div className="admin-menus px-4">
          <Switch>
            <Route path="/admin/not-found" component={NotFound} />
            <Route path="/admin/add-rooms" component={AddRooms} />
            <Route
              path="/admin/all-users"
              render={(props) => (
                <AllUsers {...props} users={this.state.users} />
              )}
            />
            <Route
              path="/admin/all-rooms"
              render={(props) => (
                <AllRooms {...props} rooms={this.state.rooms} />
              )}
            />
            <Route
              path="/admin/all-bookings"
              render={(props) => <AllBookings bookings={this.state.bookings} />}
            />
            <Redirect from="/admin" exact to="/admin/all-bookings" />
            <Redirect to="/admin/not-found" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default AdminHome;
