"use client"

import React, { useEffect } from 'react'
import { useAppSelector } from '@/lib/store/hooks';
import { selectUploadedListings } from '@/lib/store/slices/listingUpload.reducer';
import { useSearchParams, useRouter } from 'next/navigation';


import { ListingsDashboard, SpropertyPage } from '@/components';
import { toast, ToastContainer } from 'react-toastify';

const Listings = () => {
  const query = useSearchParams()
  const router = useRouter()

  const uploadedListings = useAppSelector(selectUploadedListings);

  const listingId = query.get("listing");

  const listing = listingId && uploadedListings.find(listing => listing.id === listingId)

  useEffect(() => {
    if(!listing){
      router.push("/dashboard/listings")
      // toast.success("Listing not found.")

    }
  }, [listing, router])

  useEffect(() => {

  }, [])

  return (
    <div className='s-listings-page' >
      {
        listing? <SpropertyPage listing={listing} /> 
        :

      <ListingsDashboard listings={uploadedListings} home={false} />
      }
      {/* <ToastContainer /> */}

    </div>
  )
}

export default Listings