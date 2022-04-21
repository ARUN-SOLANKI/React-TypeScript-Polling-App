import React from "react";
import "../Styles/NavbarStyle.css";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="listContainer">
        <ul className="unorderList">
          <li className="orderListItem">
            <Link to="/home" className="NavLink">
              Home
            </Link>
          </li>
          <li className="orderListItem">
            <Link to="/Home/AllPolls" className="NavLink">
              All Polls
            </Link>
          </li>
          <li className="orderListItem">
            <Link to="/Home/CreatePolls" className="NavLink">
              Create Polls
            </Link>
          </li>
          <li className="orderListItem">
            <Link to="/Home/AllUsers" className="NavLink">
              User List
            </Link>
          </li>
        </ul>
        <button
          className="LogoutButton"
          onClick={() => {
            localStorage.clear();
            navigate("/");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
