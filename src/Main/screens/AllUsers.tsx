import axios from "axios";
import { Table } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

type ItemData = {
  _id: string;
  username: string;
  password: string;
  role: string;
};

function AllUsers() {
  const [data, setdata] = useState([]);
  useEffect(() => {
    const getdata = async () => {
      const userData = await axios.get(
        "https://secure-refuge-14993.herokuapp.com/list_users"
      );
      setdata(userData?.data?.data);
      console.log(userData.data.data, "------>");
    };
    getdata();
  }, []);

  return (
    <div>
      <Navbar />
      <Table striped bordered hover variant="light">
        <thead>
          <tr>
            <th>#</th>
            <th>User Name</th>
            <th>Password</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item: ItemData, i: number) => {
            return (
              <tr>
                <td>{i}</td>
                <td>{item.username}</td>
                <td>{item.password}</td>
                <td>{item.role}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default AllUsers;
