import './App.css';
import './commonstyle.css'
import HomePage from './homepage';
import AdminLogin from './adminLogin';
import LoginPage from './login-Page';
import NameList1 from './nameList1';
import NameList2 from './nameList2';
import data from './data';
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, /*Link*/ } from "react-router-dom";
import Dashboard from './dashboard/dashboard'
import Announcement from './dashboard/announcement'
import Employees from './dashboard/employees'
import EmployeeAttendence from './dashboard/employeeAttendence'
import Attendance from './dashboard/attendance'
import Leave from './dashboard/leaveRequest'
import Task from './dashboard/task'
import { db } from './Firebase/firebase'
import { addDoc, collection, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Provider } from 'react-redux'

function App() {

  const [users, setUsers] = useState();
  const usersRef = collection(db, 'Users')
  const announcementsRef = collection(db, 'Announcements')
  const leavesRef = collection(db, 'Leaves')
  const tasksRef = collection(db, 'Tasks')


  useEffect(async () => {
    const data = await getDocs(usersRef);
    const dataAnnouncements = await getDocs(announcementsRef);
    const dataLeaves = await getDocs(leavesRef);
    const dataTasks = await getDocs(tasksRef);

    setUsers(data)
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminLogin />} />
          <Route path="/adminLogin" index element={<AdminLogin />} />
          <Route path="/login-page" element={<LoginPage />} />
          <Route path="/nameList1" element={<NameList1 data={data} />} />
          <Route path="/nameList2" element={<NameList2 data={data} />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/announcement" element={<Announcement />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/task" element={<Task />} /> 
          <Route path="/leaveRequest" element={<Leave />} />
          <Route path="/employeeAttendence" element={<EmployeeAttendence />} />
          <Route path="/employees" element={<Employees />} />
        </Routes>
      </BrowserRouter>


    </div>
  );
}

export default App;
