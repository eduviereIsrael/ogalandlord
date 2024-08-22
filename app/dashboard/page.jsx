"use client"
import React, {useEffect} from 'react'
import Link from 'next/link'

import { useAppSelector, useAppDispatch } from '@/lib/store/hooks';
import { selectCurrentUser } from '@/lib/store/slices/user.reducer';
import { selectUploadedListings, fetchUploadedListings } from '@/lib/store/slices/listingUpload.reducer';

import { ListingsDashboard, ListingsStats } from '@/components';

const Dashboard = () => {
  const dispatch = useAppDispatch();


  const currentUser = useAppSelector(selectCurrentUser);
  const uploadedListings = useAppSelector(selectUploadedListings);

  const { fullName, email, contactEmail, id } = currentUser;
  const getFirstName = (fullName) => fullName.split(' ')[0];

  useEffect(() => {
    // if(!uploadedListings.length > 0){
      dispatch(fetchUploadedListings(id))
    // }
  }, []);

  const getlistingStages = (stage) => {
    const listingInStage = uploadedListings.filter(listing => listing.stage === stage);
    return listingInStage.length;
  }

  const getListingStats = () => {
    return {
      uploaded: uploadedListings.length,
      active: getlistingStages("active"),
      inReview: getlistingStages("review"),
      declined: getlistingStages('declined')
    }
  }

  return (
    <div className='dashboard-home' > 
      <div className="intro-stats">
       
        <div className="top-row">
          <div className="user-intro">
            <h4>Welcome, {getFirstName(fullName)}</h4>
            <span>Your Property Informations</span>
          </div>
          <div id="desktop">
            <Link href={"/dashboard/listings/upload"} >
              <button className="btn-link"> <img src='/upload.svg' /> Upload a Property</button>
            </Link>
          </div>
        </div>    
        <ListingsStats {...getListingStats()} />
        <div id="mobile" style={{marginTop: "64px"}} >
            <Link href={"/dashboard/listings/upload"} >
              <button className="btn-link"> <img src='/upload.svg' /> Upload a Property</button>
            </Link>
          </div>
      </div>

      <ListingsDashboard listings={uploadedListings} home={true} />
    </div>
  )
}

export default Dashboard