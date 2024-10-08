"use client"

import React from 'react'
import { useAppSelector, useAppDispatch } from '@/lib/store/hooks';
import { selectCurrentUser } from '@/lib/store/slices/user.reducer';
import { useRouter } from 'next/navigation';

const Profile = () => {
  const dispatch = useAppDispatch();
  const router = useRouter()


  const currentUser = useAppSelector(selectCurrentUser);

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      <p>Your personal Information</p>
      
      <div className="profile-card">
        <div className="profile-header">
          {/* <div className="profile-avatar">
  
            <img src="/user-icon.svg" alt="" />
          </div> */}

        {!currentUser?.photoURL ? (
            <div className="profile-avatar"  >
              <img src="/user-icon.svg" alt="" />
            </div>
          ) : (
            <div className="user-profile-button" 
            style={{
              backgroundImage: currentUser?.photoURL ? `url(${currentUser?.photoURL.url})` : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            >
              {/* <img className="user-img" src={profilePhoto.url} alt="" /> */}
            </div>
          )}
          <div className="profile-info">
            <h3>{currentUser.fullName}</h3>
            <p>{currentUser.email}</p>
            <p>{currentUser.phoneNumber? currentUser.phoneNumber : 'No phone number'}</p>
          </div>
        </div>

        <div className="profile-body">
          <div className="profile-row">
            <div className="profile-column">
              <h4>Full Name</h4>
              <p>Israel Eduviere</p>
            </div>
            <div className="profile-column">
              <h4>Display Name</h4>
              <p>{currentUser.contactName}</p>
            </div>
          </div>
          <div className="profile-row">
            <div className="profile-column">
              <h4>Contact Phone Number</h4>
              <p>{currentUser.phoneNumber? currentUser.phoneNumber : 'No phone number'}</p>
            </div>
            <div className="profile-column">
              <h4>Contact E-mail</h4>
              <p>{currentUser.contactEmail}</p>
            </div>
          </div>
          <div className="profile-row docs">
            <div className="profile-column">
              <h4>Business Certificate <small>(e.g. CAC, SMEDAN)</small></h4>
              <div className="upload-box">
                { currentUser.bussinessCert?.name? <>
                  <span>{currentUser.bussinessCert?.name}</span>
                  <button className="uploaded-btn">Uploaded</button>
                </> : <span>None uploaded</span>}
              </div>
            </div>
            <div className="profile-column">
              <h4>National Identification Number (NIN)</h4>
              <div className="upload-box">
              { currentUser.NIN?.name? <>
                  <span>{currentUser.NIN?.name}</span>
                  <button className="uploaded-btn">Uploaded</button>
                </> : <span>None uploaded</span>}
              </div>
            </div>
          </div>
        </div>
        
        <div className="profile-footer">
          <button onClick={() => router.push('/dashboard/profile/edit')} className="edit-profile-btn">Edit Profile</button>
        </div>
      </div>
    </div>
  );
}

export default Profile