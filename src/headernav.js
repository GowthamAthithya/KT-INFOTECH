import React from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import logo from './images/companyLogo.jpeg'
import { message, Button } from 'antd';
import { useNavigate } from 'react-router-dom'
const cookies = new Cookies();


function HeaderNav() {
    const userData = cookies.get('userData');

    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
        message.success(`You have been logged out successfully`)
        cookies.remove('userData');
    }

    return (
        <div>
            <div class="headerNav">
                <div className="nav">
                    <div className="logo">
                        <img src={logo} alt='logo' className='logo' />
                    </div>
                    <div className="signin-links" style={{ display: 'flex', justifyContent: 'space-between', width: '15%' }}>
                        {userData?.name ? `Welcome ${userData?.name}` : ''}
                        {/* <Link to="" className="signin-link">SignUp</Link> */}
                        {cookies.get('userData') ? <div style={{ cursor: 'pointer' }} onClick={handleLogout}>Logout</div> : ''}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderNav;