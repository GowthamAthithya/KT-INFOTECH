import React from 'react'
import HeaderNav from '../headernav';
import Dashboardnav from './dashboardnav'
import './dashboard.css'
import { Button } from 'antd';
import { LoginOutlined } from '@ant-design/icons';

export default function Leave() {
  return (
    <div>
      <HeaderNav />
        <div className='dashboard'>
          <Dashboardnav />
          <div>
            <div className='dashboardContent'>
              <div className='leaveRequest'>
                    <h1>Leave Request Form</h1>
                    <label>From Date</label>
                    <input type='text' placeholder='Enter the From date'></input>
                    <label>To Date</label>
                    <input type='text' placeholder='Enter the To date'></input>
                    <lable>Reason for Leave</lable>
                    <div><textarea></textarea></div>
                    <button className='btn'>Send</button>
              </div>
            </div>
            
          </div>
    </div>
            
       
    </div>
  )
}
