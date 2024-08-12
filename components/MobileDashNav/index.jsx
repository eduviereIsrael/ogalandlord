"use client";

import React, { useState } from "react";
import { DashboardTopNav } from "..";
import { useAppDispatch } from "@/lib/store/hooks";
import { signOut } from "@/lib/store/slices/user.reducer";

const MobileDashNav = () => {
  const dispatch = useAppDispatch();

  const [isDashboardActive, setIsDashboardActive] = useState(false);
  const [isListingsActive, setIsListingsActive] = useState(false);
  const [isProfileActive, setIsProfileActive] = useState(false);
  const [isLogoutActive, setIsLogoutActive] = useState(false);

  const [navOpen, setNavOpen] = useState(false);

  const handleToggle = (setter, value) => {
    setter(value);
  };

  const handleLogout = () => {
    dispatch(signOut());
  };
  const toggleNav = () => setNavOpen((prevNavOpen) => !prevNavOpen);
  return (
    <div className="mob-dash-nav">
      <div className="mob-top-nav">
        <div className="mob-logo">
          <img src="/logo.svg" alt="Logo" />
        </div>
        <div className="mob-switch-icon">
          <img
            src={navOpen ? "/close-menu.svg" : "/menu.svg"}
            alt="Menu Icon"
            onClick={toggleNav}
          />
        </div>
      </div>
      {
        navOpen && <div className="space"></div>
      }
      { navOpen && <div className="mob-menu-div">
        <DashboardTopNav />
        <ul className="menu">
          <li
            className="menu-item"
            onClick={() => {
                toggleNav()
            }}
         
          >
            <a href="/dashboard" className="menu-link">
              {" "}
              <img
                src={isDashboardActive ? "/dashboard-w.svg" : `/dashboard.svg`}
              />{" "}
              Dashboard
            </a>
          </li>
          <li
            className="menu-item"
            onClick={() => {
                toggleNav()
            }}
       
          >
            <a href="/dashboard/listings" className="menu-link">
              {" "}
              <img
                src={isListingsActive ? "/listings-w.svg" : "/listings.svg"}
              />{" "}
              Listings
            </a>
          </li>
          <li
            className="menu-item"
            onClick={() => {
                toggleNav()
            }}
      
          >
            <a href="/dashboard/profile" className="menu-link">
              {" "}
              <img
                src={isProfileActive ? "/profile-w.svg" : "/profile.svg"}
              />{" "}
              My Profile
            </a>
          </li>

          <li
            className="menu-item logout"
            onClick={() => {
              handleLogout();
              toggleNav()
            }}
  
          >
            <a className="menu-link">
              {" "}
              <img
                src={isLogoutActive ? "/logout-w.svg" : "/logout.svg"}
              />{" "}
              Logout
            </a>
          </li>
        </ul>
      </div>}
    </div>
  );
};

export default MobileDashNav;
