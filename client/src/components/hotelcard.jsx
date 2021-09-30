import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRupeeSign } from "@fortawesome/free-solid-svg-icons";
import { Modal, Button, Carousel } from "react-bootstrap";

const HotelCard = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <React.Fragment>
      <div className="card mb-3 shadow">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={props.imgUrl}
              className="img-fluid rounded-start p-3"
              alt="..."
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{props.hotelName}</h5>
              <span className="badge bg-warning text-dark">Parking</span>
              <span className="badge bg-warning text-dark ms-1">Reception</span>
              <span className="badge bg-warning text-dark ms-1">Free Wifi</span>
              <p className="card-text my-1">
                <b>Max Count :</b> {props.maxCount}
              </p>
              <p className="card-text my-1">
                <b>Phone Number :</b> {props.phoneNumber}
              </p>
              <p className="card-text my-1">
                <b>Room Type :</b> {props.roomType}
              </p>
              <p className="card-text my-1">
                <b>Rent per Day :</b>
                <FontAwesomeIcon className="mx-1" icon={faRupeeSign} />
                {props.rentperday}
              </p>
              <Button variant="dark" size="sm" onClick={handleShow}>
                View Details
              </Button>

              <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                  <Modal.Title>{props.hotelName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Carousel>
                    <Carousel.Item>
                      <img
                        className="d-block w-100"
                        src={props.img1}
                        alt="First slide"
                      />
                    </Carousel.Item>
                    <Carousel.Item>
                      <img
                        className="d-block w-100"
                        src={props.img2}
                        alt="Second slide"
                      />
                    </Carousel.Item>
                    <Carousel.Item>
                      <img
                        className="d-block w-100"
                        src={props.img2}
                        alt="Third slide"
                      />
                    </Carousel.Item>
                  </Carousel>
                  <h4 className="mt-3">Description :</h4>
                  <p>{props.description}</p>
                  <p>
                    <b>Rent Per Day : </b> {props.rentperday}
                  </p>
                  <p>
                    <b>Max Count : </b> {props.maxCount}
                  </p>
                  <p>
                    <b>Room Type : </b> {props.roomType}
                  </p>
                  <p>
                    <b>Phone Number : </b> (+91) {props.phoneNumber}
                  </p>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="danger" size="sm" onClick={handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>

              {props.user.name && props.fromDate && props.toDate && (
                <Link
                  to={`/home/room/${props.id}`}
                  className="btn btn-sm btn-dark ms-2"
                >
                  Book Now
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default HotelCard;
