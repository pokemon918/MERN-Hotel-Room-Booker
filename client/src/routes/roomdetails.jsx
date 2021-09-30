import React, { Component } from "react";
import { getRoom } from "../services/roomService";
import RoomSlide from "../components/room-carousel";
import { saveBooking } from "../services/bookingService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRupeeSign } from "@fortawesome/free-solid-svg-icons";
import StripeCheckout from "react-stripe-checkout";
import moment from "moment";
import { stripePublicKey } from "../config.json";

class RoomDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      room: {},
      images: [],
      booking: {},
      ratePerDay: 1500,
    };
  }

  async componentDidMount() {
    const { data: room } = await getRoom(this.props.match.params.id);
    this.setState({ room });
    const images = this.state.room.imageurls;
    this.setState({ images });

    const toDate = moment(this.props.toDate, "DD-MM-YYYY");
    const fromDate = moment(this.props.fromDate, "DD-MM-YYYY");
    const totalDays = moment.duration(toDate.diff(fromDate)).asDays() + 1;
    const totalamount = +this.state.ratePerDay * +totalDays;

    const booking = {
      name: this.props.user.name,
      room: this.state.room.name,
      roomId: this.state.room._id,
      userId: this.props.user._id,
      fromDate: fromDate,
      toDate: toDate,
      totalAmount: totalamount,
      totalDays: totalDays,
    };
    this.setState({ booking });
  }

  // handleSubmit = async () => {
  //   await saveBooking(this.state.booking);
  // };

  onToken = async (token) => {
    const bookingDetail = { ...this.state.booking };
    const data = {
      name: bookingDetail.name,
      room: bookingDetail.room,
      roomId: bookingDetail.roomId,
      userId: bookingDetail.userId,
      fromDate: bookingDetail.fromDate,
      toDate: bookingDetail.toDate,
      totalAmount: bookingDetail.totalAmount,
      totalDays: bookingDetail.totalDays,
      token: token,
    };
    await saveBooking(data);
  };
  render() {
    const publicKey = stripePublicKey;
    return (
      <div className="booking-page">
        <RoomSlide images={this.state.images} />
        <h1
          className="bg-light text-dark p-2"
          style={{ position: "absolute", top: "12rem", left: "1rem" }}
        >
          {this.state.room.name}
        </h1>
        <div className="container-fluid">
          <div className="row my-5">
            <div className="col-6 d-flex align-items-center justify-content-center border d-md-block d-none">
              <img className="w-100" src={this.state.images[0]} alt="" />
            </div>
            <div className="col-md-6 border p-3">
              <h3 className="mt-4">Booking Detail :</h3>
              <hr />
              <p>
                <b>Name : </b> {this.state.booking.name}
              </p>
              <p>
                <b>From Date : </b>
                {this.props.fromDate}
              </p>
              <p>
                <b>To Date : </b>
                {this.props.toDate}
              </p>
              <p>
                <b>Max Count : </b>
                {this.state.room.maxcount}
              </p>
              <hr />
              <p>
                <b>Amount</b>
              </p>
              <hr />
              <p>
                <b>Total Days : </b>
                {this.state.booking.totalDays}
              </p>
              <p>
                <b>Rent Per Day :</b>
                <FontAwesomeIcon className="mx-1" icon={faRupeeSign} />
                {this.state.ratePerDay}
              </p>
              <h5>
                <b>Total Amount :</b>
                <FontAwesomeIcon className="mx-1" icon={faRupeeSign} />
                {this.state.booking.totalAmount}
              </h5>

              <StripeCheckout
                token={this.onToken}
                amount={this.state.booking.totalAmount * 100}
                currency="INR"
                stripeKey={publicKey}
              >
                <button className="btn btn-primary w-100 mt-2">Pay Now</button>
              </StripeCheckout>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RoomDetails;
