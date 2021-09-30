import React from "react";
import { DatePicker, Space } from "antd";
import "antd/dist/antd.css";

const Header = (props) => {
  const { RangePicker } = DatePicker;
  return (
    <div className="page-header overflow-visible position-absolute bg-white border-bottom px-4 my-0 d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <div className="container ">
        <div className="row">
          <div className="col-md-4">
            <RangePicker
              onChange={props.handleDateChange}
              format="DD-MM-YYYY"
            />
          </div>
          <div className="col-md-4">
            <input
              className="form-control form-control-sm"
              type="text"
              id="search"
              name="query"
              value={props.searchkey}
              onChange={(e) => props.handleSearchChange(e.currentTarget.value)}
              onKeyUp={props.filterBySearch}
              placeholder="Serach Rooms"
            />
          </div>
          <div className="col-md-4">
            <select
              className="form-select form-select-sm"
              value={props.type}
              onChange={(e) => props.filterByType(e.currentTarget.value)}
            >
              <option value="all">All</option>
              <option value="delux">Delux</option>
              <option value="non-delux">Non-Delux</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
