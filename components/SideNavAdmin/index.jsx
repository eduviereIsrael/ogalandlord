"use client"

import React, {useState} from 'react'
import { signOut } from '@/lib/store/slices/user.reducer';
import { useAppDispatch } from '@/lib/store/hooks';

const SideNav = () => {
  const dispatch = useAppDispatch();


    const [isDashboardActive, setIsDashboardActive] = useState(false);
    const [isListingsActive, setIsListingsActive] = useState(false);
    const [isProfileActive, setIsProfileActive] = useState(false);
    const [isLogoutActive, setIsLogoutActive] = useState(false);

    const handleToggle = (setter, value) => {
        setter(value);
    };

    const handleLogout = () => {
        dispatch(signOut());
    }

  

  return (
    <div className="sidebar">

      <ul className="menu">
        <li className="menu-item" onMouseEnter={() => handleToggle(setIsDashboardActive, true)} onMouseLeave={() => handleToggle(setIsDashboardActive, false)}  >
          <a href="/admin" className="menu-link"> <img src={ isDashboardActive? '/dashboard-w.svg' : `/dashboard.svg`}/>  Home</a>
        </li>
        <li className="menu-item"  onMouseEnter={() => handleToggle(setIsListingsActive, true)} onMouseLeave={() => handleToggle(setIsListingsActive, false)}   >
          <a href="/admin/listings" className="menu-link"> <img src={ isListingsActive? "/listings-w.svg" : '/listings.svg'} />  Listings</a>
        </li>
        <li className="menu-item" onMouseEnter={() => handleToggle(setIsProfileActive, true)} onMouseLeave={() => handleToggle(setIsProfileActive, false)}   >
          <a href="/admin/kyc" className="menu-link"> <img src={ isProfileActive?  "/profile-w.svg" : "/profile.svg"} />  KYC</a>
        </li>
        <li className="menu-item" onMouseEnter={() => handleToggle(setIsProfileActive, true)} onMouseLeave={() => handleToggle(setIsProfileActive, false)}   >
          <a href="/admin/payments" className="menu-link"> <img src={ isProfileActive?  "/profile-w.svg" : "/profile.svg"} />  Payments</a>
        </li>

        <li className="menu-item logout" onClick={() => {
          handleLogout()
        }} onMouseEnter={() => handleToggle(setIsLogoutActive, true)} onMouseLeave={() => handleToggle(setIsLogoutActive, false)}   >
          <a className="menu-link"> <img src={ isLogoutActive?  "/logout-w.svg" : "/logout.svg"} />  Logout</a>
        </li>
      </ul>
    </div>
  )
}

export default SideNav