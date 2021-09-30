import React from "react";

const ProfileDetails = (props) => {
  return (
    <div>
      <h5>My Profile</h5>
      <br />
      <p>
        <b>User Name : </b> {props.user.name}
      </p>
      <p>
        <b>Email : </b> {props.user.email}
      </p>
      <p>
        <b>isAdmin : </b> {props.user.isAdmin ? "Yes" : "No"}
      </p>
    </div>
  );
};

export default ProfileDetails;
