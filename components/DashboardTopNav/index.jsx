"use client"
import { useAppSelector, useAppDispatch } from '@/lib/store/hooks';
import { selectCurrentUser } from '@/lib/store/slices/user.reducer';




import React from 'react'


const TopNav = () => {
    const currentUser = useAppSelector(selectCurrentUser)

    const { photoURL, fullName } = currentUser;
  return (
    <div className='user-profile-button' >
        { photoURL? <img className='user-img' src={photoURL} alt="" /> : <span className='user-img-span' >{fullName[0]}</span> }
        <span className='user-name' >{currentUser.fullName}</span>
    </div>
  )
}

export default TopNav