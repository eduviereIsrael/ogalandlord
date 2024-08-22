"use client"

import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { useAppSelector, useAppDispatch } from '@/lib/store/hooks';
import { selectCurrentUser, setSigninModal, setSignupModal } from '@/lib/store/slices/user.reducer';
import { DashboardTopNav } from '..';
import { signOut } from '@/lib/store/slices/user.reducer';



const Navbar = () => {

  const [navClick, setNavClick] = useState(false)
  const [userNavClick, setUserNavClick] = useState(false)

  const router = useRouter()

  const navigate = (url) => router.push(url)
  const currentUser = useAppSelector(selectCurrentUser)
 

  const dispatch = useAppDispatch()

  const signOutHandler = () => {
    dispatch(signOut())
  }

  
  const handleLoginClick = () => {
    dispatch(setSigninModal(true));
    // console.log(signInModalOpen);
  };

  
  const openSignupModal = () => {
    dispatch(setSignupModal(true));
    // console.log(signInModalOpen);
  }

  
  return (
    < div className= 'NavbarDiv'>
      <  div className='NavbarContainer' >
        <img src='/logo.svg' alt='logo' className='logo' />

        <div className="menuitems">
          <span onClick={() => navigate('/')} >Home</span>
          <span onClick={() => navigate('/listings')} >Listings</span>
          <span onClick={() => navigate('/dashboard')} >Post a Property</span>
          {/* { currentUser && <span onClick={() => navigate('/contact')} >Contact Us</span>} */}
          
        </div>

        {
            !currentUser? <div className="nav-buttons">
            <div style={{cursor: "pointer"}} onClick={handleLoginClick} >
              <span className='login' >LOGIN</span>
            </div>

            <div style={{cursor: "pointer"}} onClick={openSignupModal} >
              <span className='sign-up' >SIGN UP</span>
            </div>
            </div> : <div className='user-menu' >
              <div className="user-tag" onClick={() => setUserNavClick((prev) => !prev)} >
                {/* <div className="user-icon">{currentUser?.fullName[0].toUpperCase()}</div> */}
                <DashboardTopNav />
              </div>

             { userNavClick &&  <div className="user-links" onClick={() => setUserNavClick(false)} >
                <Link href={'/dashboard'} style={{padding: '0', margin: '12px 0 15px'}} >
                  <span>Dashboard</span>
                </Link>
                <span onClick={signOutHandler} >Logout</span>
              </div>}
            </div>
        }
      </ div >
      <  div className='MobileContainer'>
      <img src='/logo.svg' alt='logo' className='logo' />
      <div className={navClick? 'hambuga spin': 'hambuga'} onClick={() => {setNavClick(!navClick)}}>
          <div className='ham dis'></div>
          <div className='ham spins'></div>
          <div className='ham spins-i'></div>
          <div className='ham dis'></div>
          
      </div>
      <div className={navClick? "mob-menu-div menu-show": "mob-menu-div "}>
          <div className="mob-menu-div-cont">
            <a href='/'>Home</a>
            <a href='/listings'>Listings</a>
            <a href='/dashboard'>Post a Property</a>
            {/* <a href='/contact'>Contact Us</a> */}
            {
            !currentUser? <div className="nav-buttons"  >
            {/* <Link onClick={null}  href={'/login'} > */}
              <a className='login' onClick={() => {
                setNavClick(false)
                handleLoginClick()
                }} >LOGIN</a>
            {/* </Link> */}

            {/* <Link onClick={null}  href={'/signup'} > */}
              <a className='sign-up' onClick={() => {
                setNavClick(false)
                openSignupModal()
                }} >SIGN UP</a>
            {/* </Link> */}
            </div> : < >
                <a href='/dashboard'>Dashboard</a>
                {/* <a href='' onClick={signOutHandler} >Logout</a> */}

            </>
        }
          </div>
      </div>
      </  div >
    </ div  >
  )
}

export default Navbar