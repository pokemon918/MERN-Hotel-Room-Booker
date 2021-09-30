import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRupeeSign } from "@fortawesome/free-solid-svg-icons";
import { getBooking } from "./../services/bookingService";
import { cancelBooking } from "./../services/bookingService";

class UserBookings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookings: [],
    };
  }

  async componentDidMount() {
    const { data: bookings } = await getBooking(this.props.match.params.id);
    this.setState({ bookings });
  }

  cancelBooking = async (booking) => {
    const data = { bookingId: booking._id, roomId: booking.roomId };
    await cancelBooking(data);
    window.location = `/profile/mybookings/${this.props.user._id}`;
  };
  render() {
    return (
      <React.Fragment>
        <h5>My Bookings</h5>
        <br />
        <div className="list-group">
          {this.state.bookings.map((booking) => (
            <div className="list-group-item pb-3">
              <h5>{booking.room}</h5>
              <p className="my-1">
                <b>Booking Id : </b> {booking._id}
              </p>
              <p className="my-1">
                <b>Transaction Id : </b> {booking.transactionId}
              </p>
              <p className="my-1">
                <b>Check In : </b> {booking.fromDate}
              </p>
              <p className="my-1">
                <b>Check Out : </b> {booking.toDate}
              </p>
              <p className="my-1">
                <b>Amount : </b>
                <FontAwesomeIcon icon={faRupeeSign} /> {booking.totalAmount}
              </p>

              <div class="d-flex w-100 justify-content-between align-items-center my-0 flex-wrap flex-md-nowrap">
                <p className="my-1">
                  <b>Status : </b>
                  {booking.status === "booked" ? (
                    <span className="badge bg-warning text-dark">
                      Confirmed
                    </span>
                  ) : (
                    <span className="badge bg-danger text-white">
                      Cancelled
                    </span>
                  )}
                </p>
                {booking.status === "booked" ? (
                  <button
                    className="btn btn-dark btn-sm"
                    onClick={() => {
                      this.cancelBooking(booking);
                    }}
                  >
                    Cancel Booking
                  </button>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default UserBookings;
