import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Navbar from "../components/navbar";
import Home from "./home";
import RoomDetails from "./roomdetails";
import moment from "moment";
import SignUp from "./signup";
import Login from "./login";
import NotFound from "./not-found";
import { getRooms } from "../services/roomService";
import ForgotPassword from "./forgot-password";
import { getMe } from "../services/currentUserService";
import Logout from "./logout";
import Profile from "./profile";
import AdminHome from "./admin-home";
import { filterBySearch } from "../utils/search-room";
import { filterByDates } from "./../utils/availlable-room";
import { filterByType } from "./../utils/type-room";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      rooms: [],
      user: {},
      dates: {},
      searchkeys: "",
      type: "all",
      loading: false,
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });

    const { data: rooms } = await getRooms();
    this.setState({ rooms });

    const { data: user } = await getMe();
    this.setState({ user });

    this.setState({ loading: false });
  }

  handleDateChange = (date) => {
    const dates = {
      fromDate: moment(date[0]).format("DD-MM-YYYY"),
      toDate: moment(date[1]).format("DD-MM-YYYY"),
    };
    this.setState({ dates });
  };

  handleSearchChange = (query) => {
    this.setState({ searchkeys: query });
  };

  handleFilterByType = (e) => {
    this.setState({ type: e });
  };

  render() {
    const { rooms, searchkeys, dates, type, user } = this.state;
    const avilableRooms = dates !== "" ? filterByDates(rooms, dates) : rooms;
    const typeOfRooms = filterByType(avilableRooms, type);
    const allRooms = filterBySearch(typeOfRooms, searchkeys);

    return (
      <div className="position-absolute" id="wrapper">
        <Navbar user={user} />
        <div className="content position-absolute overflow-hidden">
          <Switch>
            <Route path="/not-found" component={NotFound} />
            <Route path="/logout" component={Logout} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route path="/login" component={Login} />
            <Route path="/register-user" component={SignUp} />
            <Route
              path="/profile"
              render={(props) => <Profile user={user} {...props} />}
            />
            <Route
              path="/admin"
              render={(props) => <AdminHome {...props} user={user} />}
            />
            <Route
              path="/home/room/:id"
              render={(props) => (
                <RoomDetails
                  {...props}
                  fromDate={this.state.dates.fromDate}
                  toDate={this.state.dates.toDate}
                  user={user}
                />
              )}
            />
            <Route
              path="/home"
              render={(props) => (
                <Home
                  {...props}
                  handleDateChange={this.handleDateChange}
                  rooms={allRooms}
                  user={user}
                  fromDate={this.state.dates.fromDate}
                  toDate={this.state.dates.toDate}
                  searchkey={this.state.searchkeys}
                  type={this.state.type}
                  handleSearchChange={this.handleSearchChange}
                  // filterBySearch={this.handleFilterBySearch}
                  filterByType={this.handleFilterByType}
                  loading={this.state.loading}
                />
              )}
            />
            <Redirect from="/" exact to="/home" />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Dashboard;
