import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { userCOntext } from "../../../context/context";
import { axios } from "../../../utils/axios";

function GetUsers() {
  // axios.get("/getUsers").then((data) => setUsers(data)).catch(err => console.log("get users err ",err));

  const [users, setUsers] = useState(null);

  //   const { users } = useContext(userCOntext);
  useEffect(() => {
    axios
      .get("/getUsers")
      .then((data) => {
        console.log(data.data.data);
        setUsers(data.data.data);
      })
      .catch((err) => console.log("get users err ", err));
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Bussiness Name</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.reverse().map((user, i) => {
              return (
                <tr key={user.id}>
                  <td>{i + 1}</td>
                  <td>{user.fullName}</td>
                  <td>{user.email}</td>
                  <td> {user.address.substring(0, 8)}...</td>
                  <td>{user.businessName}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default GetUsers;
