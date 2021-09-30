import React from "react";

const AllBookings = (props) => {
  return (
    <React.Fragment>
      <h5>All Rooms</h5>
      <table className="table table-bordered table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th scope="col">Booking Id</th>
            <th scope="col">User Id</th>
            <th scope="col">Room</th>
            <th scope="col">From</th>
            <th scope="col">To</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {props.bookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking._id}</td>
              <td>{booking.userId}</td>
              <td>{booking.room}</td>
              <td>{booking.fromDate}</td>
              <td>{booking.toDate}</td>
              <td>{booking.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default AllBookings;
