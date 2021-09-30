import React from "react";

const AllUsers = (props) => {
  return (
    <React.Fragment>
      <h5>All Users</h5>
      <table className="table table-bordered table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th scope="col">User Id</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">isAdmin</th>
          </tr>
        </thead>
        <tbody>
          {props.users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.isAdmin}</td>
            </tr>
          ))}
        </tbody>
      </table>
      ;
    </React.Fragment>
  );
};

export default AllUsers;
