import React from "react";
import HotelCard from "./hotelcard";

const HotelList = (props) => {
  return (
    <div className="list-group my-2">
      {props.rooms.map((room) => {
        return (
          <HotelCard
            key={room._id}
            id={room._id}
            imgUrl={room.imageurls[0]}
            hotelName={room.name}
            maxCount={room.maxcount}
            phoneNumber={room.phonenumber}
            roomType={room.type}
            rentperday={room.rentperday}
            user={props.user}
            fromDate={props.fromDate}
            toDate={props.toDate}
            description={room.description}
            img1={room.imageurls[0]}
            img2={room.imageurls[1]}
            img3={room.imageurls[2]}
          />
        );
      })}
    </div>
  );
};

export default HotelList;
