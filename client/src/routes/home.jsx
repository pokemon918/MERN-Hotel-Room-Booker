import React from "react";
import HotelList from "../components/hotellist";
import Header from "../components/header";

const Home = (props) => {
  return (
    <React.Fragment>
      <Header
        handleDateChange={props.handleDateChange}
        searchkey={props.searchkey}
        handleSearchChange={props.handleSearchChange}
        filterBySearch={props.filterBySearch}
        filterByType={props.filterByType}
        type={props.type}
      />
      <div className="home">
        <div className="container">
          <HotelList
            user={props.user}
            rooms={props.rooms}
            fromDate={props.fromDate}
            searchkey={props.searchkey}
            toDate={props.toDate}
            loading={props.loading}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
