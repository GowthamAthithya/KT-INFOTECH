import React, { useState, useEffect } from "react";
import HeaderNav from "../headernav";
import Dashboardnav from "./dashboardnav";
import "./dashboard.css";
import { Button, Modal } from "antd";
import { LoginOutlined, LogoutOutlined } from "@ant-design/icons";
import {
  addDoc,
  collection,
  getDocs,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import moment from "moment";
import { db } from "../Firebase/firebase";
import { Link, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";
import { async } from "@firebase/util";

const cookies = new Cookies();

export default function Dashboard() {
  const [clockToggle, setClockToggle] = useState(false);
  const [clockIn, _clockIn] = useState();
  const [clockInTime, _clockInTime] = useState();

  let location = useLocation();

  let today = new Date();

  const userData = cookies.get("userData");

  const usersRef = doc(db, "Users", userData?.id);

  useEffect(() => {
    if (cookies.get("clockIn")) {
      _clockInTime(true);
      _clockIn(cookies.get("clockIn"));
    } else {
      _clockInTime(false);
    }
  }, [location]);

  const handleClockIn = async () => {
    setClockToggle(true);
    _clockInTime(true);

    let Date = moment().format("YYYY/MM/DD").toString();

    const currentTime = moment().format("HH:mm:ss");
    const data = await updateDoc(usersRef, {
      date: [
        {
          date: Date,
          loginStatus: "loggedIn",
          clockIn: currentTime,
        },
      ],
    });
    _clockIn(currentTime);
    cookies.set("clockIn", currentTime);
  };

  const handleClockOut = async () => {
    setClockToggle(false);
    _clockInTime(false);
    let Date = moment().format("YYYY/MM/DD");
    const endTime = moment().format("HH:mm:ss");
    let enDTime = moment(endTime, "HH:mm:ss");
    let starTTime = moment(clockIn, "HH:mm:ss");
    let diff = enDTime.diff(starTTime);

    const duration = moment.utc(diff).format("HH:mm:ss");

    const getData = await getDoc(usersRef);
    const getUserData = getData.data();
    const dataWithoutCurrentDate = getUserData.date.filter(
      (d) => d.date !== Date
    );

    const data = await updateDoc(usersRef, {
      date: [
        ...dataWithoutCurrentDate,
        {
          hours: moment(duration).format("HH:mm:ss:SS"),
          loginStatus: "loggedOut",
          date: Date,
          clockIn: clockIn,
          clockOut: moment().format("HH:mm:ss"),
        },
      ],
    });

    cookies.remove("clockIn");
  };

  /*payslip modal */
  const [isPayslip, setisPayslip] = useState(false);

  const payslipmodal = () => {
    setisPayslip(true);
  };

  const payslipOk = () => {
    setisPayslip(false);
  };

  const payslipCancel = () => {
    setisPayslip(false);
  };

  /*leave modal */
  const [isLeaveReq, setisLeaveReq] = useState(false);

  const leaveRequestModal = () => {
    setisLeaveReq(true);
  };

  const leaveReqOk = () => {
    setisLeaveReq(false);
  };

  const leaveReqCancel = () => {
    setisLeaveReq(false);
  };

  return (
    <div>
      <HeaderNav />
      <div className="dashboard">
        <Dashboardnav />
        <div className="dashboardLeftRight">
          <div className="profileContainer">
            <h1>Profile</h1>
            <p>User Name: {userData?.name} </p>
            <p>Designation: {userData?.isAdmin ? "Admin" : "Employee"}</p>
            {!clockInTime ? (
              <Button onClick={handleClockIn} className="clockButton">
                Clock in
                <LoginOutlined />
              </Button>
            ) : (
              <Button onClick={handleClockOut} className="clockButton">
                Clock out
                <LogoutOutlined />
              </Button>
            )}
          </div>
          {userData.isAdmin ? (
            ""
          ) : (
            <div className="dashboardRightside">
              <div className="payslip">
                <button type="primary" onClick={payslipmodal} href="">
                  Payslip
                </button>
                <Modal
                  title="Payslip"
                  visible={isPayslip}
                  onOk={payslipOk}
                  onCancel={payslipCancel}
                >
                  <button>Download payslip</button>
                </Modal>
              </div>
              <div className="leaveRequest">
                <button type="primary" onClick={leaveRequestModal} href="">
                  Leave Request
                </button>
                <Modal
                  title="Leave Request"
                  visible={isLeaveReq}
                  footer={null}
                  onCancel={leaveReqCancel}
                >
                  <fieldset>
                    <p id="today-date"></p>
                    <p>Reason for leave</p>
                    <textarea type="textarea" style={{ resize: "none" }} />
                    <button style={{ display: "block" }} onClick={leaveReqOk}>
                      Submit Request
                    </button>
                  </fieldset>
                </Modal>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
