"use client"

import React, {useEffect} from 'react';
import { useAppSelector, useAppDispatch } from '@/lib/store/hooks';
import { selectSignUpModal, selectSignInModal, selectCurrentUser, selectClearDate, signInAtFirstRender, selectPasswordRecoveryModal, selectPasswordRecoverySuccess } from '@/lib/store/slices/user.reducer'
import { Login, Signup, ForgotPassword, PasswordReset } from '../AuthModals';
import { Overlay } from '..';
import { ToastContainer } from 'react-toastify';

const AppWrapper = ({children}) => {

    const dispatch = useAppDispatch();

    const signUpModalOpen = useAppSelector(selectSignUpModal);
    const signInModalOpen = useAppSelector(selectSignInModal);
    const passwordRecoveryModalOpen = useAppSelector(selectPasswordRecoveryModal);
    const passwordRecoverySuccess = useAppSelector(selectPasswordRecoverySuccess);



    const navigate = (url) => router.push(url);
    const currentUser = useAppSelector(selectCurrentUser);
    const clearDate = useAppSelector(selectClearDate);

    useEffect(() => {
      const isDatePastOrFuture = (dateString) => {
        if(!dateString){
          // console.log("past")
          return "past"
        }
        const inputDate = new Date(dateString);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Ignore the time part for accurate comparison
        if (inputDate < today) {
          // console.log("past")
          return 'past';
          
        } else if (inputDate > today) {
          // console.log("future")
          return 'future';
        } else {
          return 'today';
        }
      };
  
  
      if(isDatePastOrFuture(clearDate) == "past"){
        dispatch(signInAtFirstRender())
      } 
    }, [currentUser, dispatch, clearDate])
  
  return (
    <div style={{padding: "0", margin: "0"}} >
        {children}

        {signInModalOpen && <Overlay><Login /></Overlay>}
        {signUpModalOpen && <Overlay><Signup /></Overlay>}
        {passwordRecoveryModalOpen && <Overlay><ForgotPassword /></Overlay>}
        {passwordRecoverySuccess && <Overlay><PasswordReset /></Overlay>}
        {/* <ToastContainer /> */}
    </div>
  )
}

export default AppWrapper