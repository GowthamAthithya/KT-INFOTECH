import React, { useState, useEffect } from 'react';
import { Link, Router } from 'react-router-dom';
import HeaderNav from './headernav';
import { db } from './Firebase/firebase'
import { addDoc, collection, getDocs } from 'firebase/firestore'
import { message, Button } from 'antd';
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie';
const cookies = new Cookies();



const AdminLogin = () => {

    const navigate = useNavigate();
    const [name, setName] = useState();
    const [password, setPassword] = useState();
    const [data, setData] = useState();
    const [admin, setAdmin] = useState();

    const usersRef = collection(db, 'Users')
    const announcementsRef = collection(db, 'Announcements')
    const leavesRef = collection(db, 'Leaves')
    const tasksRef = collection(db, 'Tasks')

    useEffect(async () => {
        const dataUsers = await getDocs(usersRef);
        setData(dataUsers.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }, [])

    useEffect(() => {
        const admin = data?.filter(d => d.isAdmin)
        setAdmin(admin);
        const emp = data?.filter(d => !d.isAdmin)
    }, [data])


    const handleChange = async (e, type) => {
        if (type == 'name') {
            setName(e.target.value);
        } else if (type == 'password') {
            setPassword(e.target.value)
        }
    }

    const handleSubmit = async () => {
        const loginSuccess = data?.filter(ad => {
            if (name && ad.name == name && ad.password == password) {
                return ad
            }
        })


        if (loginSuccess.length) {
            loginSuccess?.map(login => {
                message.success(`Welcome, ${login?.name} `)
                navigate('/dashboard');
            })

            cookies.set('userData', loginSuccess[0]);
        } else {
            message.warning("UserName or password is wrong");
        }
    }

    return (
        <div>
            <HeaderNav />
            <div id="loginBox">
                <div className="form-box"  >
                    <h2>SignIn</h2>
                    <label>User Name</label>
                    <input onChange={(e) => handleChange(e, 'name')} type="text" id="userName" placeholder='username'></input>
                    <label>Password</label>
                    <input onChange={(e) => handleChange(e, 'password')} type="password" id="password" placeholder='password'></input>
                    <button onClick={handleSubmit} class="btn">submit</button>
                </div>
            </div>

        </div>
    )
}

export default AdminLogin