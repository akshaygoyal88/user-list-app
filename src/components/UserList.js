import React from "react";
import { Link } from "react-router-dom";

function UserList({ searchTerm, setSearchTerm, status, filteredUsers }) {
  return (
    <>
      <h1>User List</h1>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {status === "loading" ? (
        <p>Loading...</p>
      ) : status === "failed" ? (
        <p>Error loading users</p>
      ) : (
        <ul>
          {filteredUsers.map((user) => (
            <li key={user.id}>
              <Link to={`/user/${user.id}`}>
                {user.firstName} {user.lastName} - {user.email} - {user.phone} -{" "}
                {user.company.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default UserList;
