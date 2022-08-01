import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form, Dropdown, Space, message, Modal } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import Dashboardnav from './dashboardnav'
import HeaderNav from '../headernav';
import { db } from '../Firebase/firebase'
import { addDoc, collection, getDocs } from 'firebase/firestore'
import moment from 'moment';
import Cookies from 'universal-cookie';
import { async } from '@firebase/util';
const cookies = new Cookies();


const EditableTable = () => {

    const [data, _data] = useState([])

    const usersRef = collection(db, 'Users')

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        const userData = await getDocs(usersRef);
        const usersData = userData.docs.map((doc) => ({ ...doc.data(), created_at: moment(doc.created_at), id: doc.id }));
        const userCookieData = cookies.get('userData');
        // const user = usersData.filter(user => user.name == userCookieData.name)
        const userTable = [];
        console.log('userData', usersData);
        usersData.map(user =>
            userTable.push({
                designation: user.designation,
                dob: moment(user?.dob).format('DD/MMM/YYYY'),
                name: user.name
            })
        )
        _data(userTable)

    }

    const columns = [
        {
            title: 'Name',
            width: 200,
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
        },
        {
            title: 'Designation',
            dataIndex: 'designation',
        },
        {
            title: 'Date of Birth',
            dataIndex: 'dob',
        }
        // {
        //   title: 'Action',
        //   key: 'operation',
        //   fixed: 'right',
        //   width: 100,
        //   render: () => <a>action</a>,
        // },
    ];

    return (
        <Table
            columns={columns}
            dataSource={data}
            scroll={{
                x: 1300,
            }}
        />)
};

export default function Employees() {

    const [empAdd, _empAdd] = useState(false)
    const [name, setName] = useState()
    const [designation, setDesignation] = useState()
    const [dob, setDob] = useState()
    const [password, setPassword] = useState()

    const usersRef = collection(db, 'Users')

    const showModal = () => {
        _empAdd(true);
    };

    const handleOk = () => {
        _empAdd(false);
    };

    const handleCancel = () => {
        _empAdd(false);
    };

    useEffect(() => {
        setDesignation();
        setDob();
        setName();
        setPassword();
    }, [])

    const onSubmit = async () => {
        if (name && designation && dob && password) {
            const addRes = await addDoc(usersRef, { name: name, designation: designation, dob: moment(dob).format('DD/MM/YYYY'), password: password });
            console.log('addRes', addRes);
            _empAdd(false);

        } else {
            message.error("Please enter the details")
        }
    }
    return (
        <div>
            <HeaderNav />
            <div className='dashboard'>
                <Dashboardnav />
                <div className='dashboardContent'>
                    <Button type="primary" onClick={showModal}>
                        Add an Employee
                    </Button>
                    <Modal footer={null} title="Add an Employee" style={{ height: '900px' }} bodyStyle={{ height: '400px' }} visible={empAdd}>
                        <input type='text' style={{ height: '50px', width: '80%', marginBottom: '30px' }} onChange={(e) => setName(e.target.value)} placeholder='Enter Employee Name' />
                        <input type='text' style={{ height: '50px', width: '80%', marginBottom: '30px' }} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Employee Password' />
                        <input type='text' style={{ height: '50px', width: '80%', marginBottom: '30px' }} onChange={(e) => setDesignation(e.target.value)} placeholder='Enter Employee Designation' />
                        <input type='text' style={{ height: '50px', width: '80%', marginBottom: '30px' }} onChange={(e) => setDob(e.target.value)} placeholder='Enter Employee Date Of Birth' />
                        <Button onClick={onSubmit}>Submit</Button>
                        <Button onClick={handleCancel}>Cancel</Button>
                    </Modal>

                    <EditableTable />
                </div>
            </div>
        </div>
    )
}
