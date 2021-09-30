import React, { Component } from "react";
import { saveRoom } from "../services/roomService";

class AddRooms extends Component {
  constructor() {
    super();
    this.state = {
      room: {
        name: "",
        rentperday: "",
        type: "",
        maxcount: "",
        phonenumber: "",
        description: "",
        img1: "",
        img2: "",
        img3: "",
      },
    };
  }

  handleChange = (e) => {
    const room = { ...this.state.room };
    room[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ room });
  };

  handleOnSubmit = async (e) => {
    const data = {
      name: this.state.room.name,
      rentperday: this.state.room.rentperday,
      type: this.state.room.type,
      maxcount: this.state.room.maxcount,
      phonenumber: this.state.room.phonenumber,
      description: this.state.room.description,
      imageurls: [
        this.state.room.img1,
        this.state.room.img2,
        this.state.room.img2,
      ],
    };

    await saveRoom(data);
    this.props.history.push("/admin/all-rooms");
  };

  render() {
    return (
      <React.Fragment>
        <h1>Add Rooms</h1>
        <form onSubmit={this.handleOnSubmit}>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 g-2">
            <div className="col">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Name"
                name="name"
                value={this.state.room.name}
                onChange={this.handleChange}
              />
            </div>
            <div className="col">
              <select
                className="form-select form-select-sm"
                value={this.state.room.type}
                onChange={this.handleChange}
                name="type"
              >
                <option value="">Select Room Type</option>
                <option value="Delux">Delux</option>
                <option value="Non-Delux">Non-Delux</option>
              </select>
            </div>
            <div className="col">
              <input
                type="number"
                className="form-control form-control-sm"
                placeholder="Rent Per Day"
                name="rentperday"
                value={this.state.room.rentperday}
                onChange={this.handleChange}
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Image Url 1"
                name="img1"
                value={this.state.room.img1}
                onChange={this.handleChange}
              />
            </div>
            <div className="col">
              <input
                type="number"
                className="form-control form-control-sm"
                placeholder="Max Count"
                name="maxcount"
                value={this.state.room.maxcount}
                onChange={this.handleChange}
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Image Url 2"
                name="img2"
                value={this.state.room.img2}
                onChange={this.handleChange}
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Description"
                name="description"
                value={this.state.room.description}
                onChange={this.handleChange}
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Image Url 3"
                name="img3"
                value={this.state.room.img3}
                onChange={this.handleChange}
              />
            </div>
            <div className="col">
              <input
                type="number"
                className="form-control form-control-sm"
                placeholder="Phone Number"
                name="phonenumber"
                value={this.state.room.phonenumber}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <button type="submit" className="btn btn-dark btn-sm my-2 me-0">
            Add Rooms
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default AddRooms;
