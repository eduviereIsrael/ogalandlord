"use client"

import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { selectUploadedListings, fetchUploadedListings } from '@/lib/store/slices/listingUpload.reducer';
import { fetchUnverifiedListings, selectUnverfiedListings } from '@/lib/store/slices/admin.reducer';
import { useSearchParams, useRouter } from 'next/navigation';
import { selectCurrentUser } from '@/lib/store/slices/user.reducer';



import { ListingsDashboardAdmin, ApropertyPage } from '@/components';
import { toast, ToastContainer } from 'react-toastify';

const Listings = () => {
  const query = useSearchParams()
  const router = useRouter()
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector(selectCurrentUser);


  const { fullName, email, contactEmail, id } = currentUser;


  const uploadedListings = useAppSelector(selectUnverfiedListings);

  const listingId = query.get("listing");

  const listing = listingId && uploadedListings.find(listing => listing.id === listingId)

  useEffect(() => {
    if(!listing){
      router.push("/admin/listings")
      // toast.success("Listing not found.")

    }
  }, [listing, router])

  useEffect(() => {

  }, [])

  
  useEffect(() => {
    // if(!uploadedListings.length > 0){
      dispatch(fetchUnverifiedListings())
    // }
  }, []);

  return (
    <div className='s-listings-page' >
      {
        listing? <ApropertyPage listing={listing} /> 
        :

      <ListingsDashboardAdmin listings={uploadedListings} home={false} />
      }
      {/* <ToastContainer /> */}

    </div>
  )
}

export default Listings