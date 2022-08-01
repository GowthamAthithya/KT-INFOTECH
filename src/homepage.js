import React from "react";
import HeaderNav from './headernav'
import { Link } from 'react-router-dom'

function homePage(){
    return(
        <div>
            <HeaderNav />
            <Link to="/nameList1" className="signin-link">table</Link>
            <Link to="/dashboard" className="signin-link">dashboard</Link>
            <Link to="/AdminLogin" className="signin-link">Admin</Link>
            <Link to="/login-Page" className="signin-link">SignIn</Link>
           
            <h1 class="companyHeading">Welcome to Company <br/> HomePage</h1>
            <p>A company profile is an introduction to your business that details what you sell, how you were founded, <br /> what your mission is, how you manufacture or source your products, and why you serve customers. <br />Your company profile should give buyers an additional reason to do business with you.</p>
            
        </div>
    )
}

export default homePage