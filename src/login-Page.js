import React, { useState, useEffect } from 'react';
import { Link, Router } from 'react-router-dom';
import HeaderNav from './headernav';
import { db } from './Firebase/firebase'
import { addDoc, collection, getDocs } from 'firebase/firestore'


const LoginPage = async () => {
    const [name, setName] = useState();
    const [password, setPassword] = useState();
    const [data, setData] = useState();

    const usersRef = collection(db, 'Users')
    const announcementsRef = collection(db, 'Announcements')
    const leavesRef = collection(db, 'Leaves')
    const tasksRef = collection(db, 'Tasks')








    const handleChange = async (e, type) => {
        const dataUsers = await getDocs(usersRef);

        if (type == 'name') {
            setName(e.target.value);
        } else if (type == 'password') {
            setPassword(e.target.value)
        }
    }

    const handleSubmit = async () => {
        const dataAnnouncements = await getDocs(announcementsRef);
        const dataLeaves = await getDocs(leavesRef);
        const dataTasks = await getDocs(tasksRef);

    }

    return (
        <div>
            <HeaderNav />
            <div id="loginBox">
                <form className="form-box" action="">
                    <h2>SignIn</h2>
                    <label  >User Name</label>
                    <input onChange={(e) => handleChange(e, 'name')} type="text" id="userName" placeholder='username'></input>
                    <label for="password" >Password</label>
                    <input onChange={(e) => handleChange(e, 'password')} type="password" id="password" placeholder='password'></input>
                    <button onClick={handleSubmit} class="btn">submit</button>
                </form>
            </div>

        </div>
    )
}

export default LoginPage