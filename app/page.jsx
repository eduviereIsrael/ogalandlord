"use client"

import Image from "next/image";
import { Login } from "@/components/AuthModals";
import { setSigninModal, selectSignInModal, setSignupModal, selectCurrentUser } from "@/lib/store/slices/user.reducer";
import { useAppSelector, useAppDispatch } from '@/lib/store/hooks';
import { useRouter } from "next/navigation";
import { Navbar } from "@/components";


export default function Home() {
  const dispatch = useAppDispatch();
const router = useRouter()

  const signInModalOpen = useAppSelector(selectSignInModal);
  const currentUser = useAppSelector(selectCurrentUser)


  const handleLoginClick = () => {
    dispatch(setSigninModal(true));
    // console.log(signInModalOpen);
  };

  
  const openSignupModal = () => {
    dispatch(setSignupModal(true));
    // console.log(signInModalOpen);
  }
  return (
    <div className="page">
      <Navbar />
      <div className="container">

        <header>
          <h1>Welcome to Oga Landlord</h1>
        </header>
        <div className="button-container">
        { !currentUser?  <>
            <button onClick={handleLoginClick} className="btn">Login</button>
            <button onClick={openSignupModal} className="btn">Sign Up</button>
          </>
          :
          <button onClick={() => router.push("/dashboard")} className="btn" >Dashboard</button>
        }


        </div>
      </div>
      {/* <Login /> */}
    </div>
  );
}
