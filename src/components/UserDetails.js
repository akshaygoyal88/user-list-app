import React from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";

function UserDetails() {
  const { id } = useParams();
  const user = useSelector((state) =>
    state.users.users.find((user) => user.id === parseInt(id))
  );

  if (!user) {
    return <p>User not found</p>;
  }

  return (
    <div>
      <h1>User Details</h1>
      <p>
        <strong>First Name:</strong> {user.firstName}
      </p>
      <p>
        <strong>Last Name:</strong> {user.lastName}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Phone:</strong> {user.phone}
      </p>
      <p>
        <strong>Company Name:</strong> {user.company.name}
      </p>
      <p>
        <strong>Company Address:</strong> {user.company.address.address}
      </p>
      <p>
        <strong>Company Department:</strong> {user.company.department}
      </p>
      <p>
        <strong>Company Title:</strong> {user.company.title}
      </p>

      <Link to="/">Back to User List</Link>
    </div>
  );
}

export default UserDetails;
