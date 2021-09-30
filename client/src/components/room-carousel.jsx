import React from "react";

const RoomSlide = (props) => {
  return (
    <div
      id="roomSlideCarousel"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div
        className="carousel-inner"
        style={{ height: "17rem", width: "100%", objectFit: "cover" }}
      >
        <div className="carousel-item active">
          <img
            src={props.images[0]}
            className="d-block w-100"
            alt="..."
            style={{ height: "17rem", width: "100%", objectFit: "cover" }}
          />
        </div>
        <div className="carousel-item">
          <img
            src={props.images[1]}
            className="d-block w-100"
            alt="..."
            style={{ height: "17rem", width: "100%", objectFit: "cover" }}
          />
        </div>
        <div className="carousel-item">
          <img
            src={props.images[2]}
            className="d-block w-100"
            alt="..."
            style={{ height: "17rem", width: "100%", objectFit: "cover" }}
          />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#roomSlideCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#roomSlideCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};
export default RoomSlide;
