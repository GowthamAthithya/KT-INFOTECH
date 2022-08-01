import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./dashboard.css";
import { message, Button } from "antd";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function Dashboardnav() {
  let location = useLocation();

  const userData = cookies.get("userData");
  const navigate = useNavigate();
  const [nav, setNav] = useState("/dashboard");

  const handleLogout = () => {
    navigate("/");
    message.success(`You have been logged out successfully`);
    cookies.remove("userData");
  };

  useEffect(() => {
    setNav(location.pathname);
  }, [location]);

  const handleNav = (url) => {
    navigate(url);
  };
  return (
    <div>
      <div className="dashboard-Navigation-box">
        <ul className="dashboard-Navigation">
          <li
            className={nav == "/dashboard" ? "active" : ""}
            onClick={() => handleNav("/dashboard")}
          >
            {" "}
            Dashboard
          </li>
          <li
            className={nav == "/announcement" ? "active" : ""}
            onClick={() => handleNav("/announcement")}
          >
            Announcement
          </li>
          {!userData.isAdmin ? (
            <li
              className={nav == "/attendance" ? "active" : ""}
              onClick={() => handleNav("/attendance")}
            >
              Attendance
            </li>
          ) : (
            ""
          )}
          <li
            className={nav == "/task" ? "active" : ""}
            onClick={() => handleNav("/task")}
          >
            Task
          </li>
          {userData.isAdmin ? (
            <li
              className={nav == "/employees" ? "active" : ""}
              onClick={() => handleNav("/employees")}
            >
              Employees
            </li>
          ) : (
            ""
          )}
          {userData.isAdmin ? (
            <li
              className={nav == "/employeeAttendence" ? "active" : ""}
              onClick={() => handleNav("/employeeAttendence")}
            >
              EmployeeAttendence
            </li>
          ) : (
            ""
          )}

          {userData.isAdmin ? <li>Leave</li> : ""}

          {/* <li  onClick={handleLogout}>Logout</li> */}
        </ul>
      </div>
    </div>
  );
}
