import React from "react";

const AllRooms = (props) => {
  return (
    <React.Fragment>
      <h5>All Rooms</h5>
      <table className="table table-bordered table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th scope="col">Room Id</th>
            <th scope="col">Name</th>
            <th scope="col">Type</th>
            <th scope="col">Rent Per Day</th>
            <th scope="col">Max Count</th>
            <th scope="col">Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {props.rooms.map((room) => (
            <tr key={room._id}>
              <td>{room._id}</td>
              <td>{room.name}</td>
              <td>{room.type}</td>
              <td>{room.rentperday}</td>
              <td>{room.maxcount}</td>
              <td>{room.phonenumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default AllRooms;
