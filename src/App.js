import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "./redux/usersSlice";

function App() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const status = useSelector((state) => state.users.status);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
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
              {user.firstName} {user.lastName} - {user.email} - {user.phone} -{" "}
              {user.company.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
