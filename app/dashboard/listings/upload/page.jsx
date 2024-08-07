"use client"


import React, { useEffect } from 'react';
import { AddressInput, DescriptionInput, ImageInput } from '@/components';
import  { useAppDispatch, useAppSelector } from '@/lib/store/hooks'
import { selectLocation, selectDetails, selectImages, selectUploadMsg, uploadListings , setUploadMsg, selectPrimaryImage } from '@/lib/store/slices/listingUpload.reducer';
import { selectCurrentUser } from '@/lib/store/slices/user.reducer';
import { ToastContainer, toast } from "react-toastify";


const Upload = () => {


    const dispatch = useAppDispatch();


  const details = useAppSelector(selectDetails)
  const location = useAppSelector(selectLocation)
  const images = useAppSelector(selectImages);
  const currentUser = useAppSelector(selectCurrentUser)
  const uploadMsg = useAppSelector(selectUploadMsg)
  const primaryImage = useAppSelector(selectPrimaryImage);


  const handleSubmit = () => {
    // Check if the address, state, and LGA are not empty
    if(!images.length) {
        toast.error("Please upload at least one image.");
        return false;
    }
    if(!primaryImage.trim()){
        toast.error("Please select a primary image.");
        return false;
    }

    if (!location.address.trim()) {
        toast.error("Address is required.");
        return false;
    }
    if (!location.state.trim()) {
        toast.error("State is required.");
        return false;
    }
    if (!location.lga.trim()) {
        toast.error("LGA is required.");
        return false;
    }

    // Check if the description, listingType, propertyType, and paymentType are not empty
    if (!details.description.trim()) {
        toast.error("Description is required.");
        return false;
    }
    if (!details.title.trim()) {
        toast.error("Description is required.");
        return false;
    }

    if (!details.propertyType.trim()) {
        toast.error("Property Type is required.");
        return false;
    }
    if (!details.paymentType.trim()) {
        toast.error("Payment Type is required.");
        return false;
    }

    // Check if furnished is a boolean (if needed)
    if (!details.furnished.trim()) {
        toast.error(" select an option for furnished ");
        return false;
    }

    // Convert and check if bedrooms, baths, and price are positive numbers
    const bedrooms = Number(details.bedrooms);
    const baths = Number(details.baths);
    const price = Number(details.price);

    if (isNaN(bedrooms) || bedrooms <= 0) {
        toast.error("Number of bedrooms must be a positive number.");
        return false;
    }
    if (isNaN(baths) || baths <= 0) {
        toast.error("Number of baths must be a positive number.");
        return false;
    }
    if (isNaN(price) || price <= 0) {
        toast.error("Price must be a positive number.");
        return false;
    }

    // Check if priceNegotiable is a boolean
    if (!details.priceNegotiable.trim()) {
        toast.error("Is the price negotiable? choose an option");
        return false;
    }

    // Check if amenities is an array
    if (!Array.isArray(details.amenities)) {
        toast.error("Amenities must be an array.");
        return false;
    }

    // If all checks pass, dispatch uploadListing
    const listing = {
        images,
        location,
        details,
        contact: {
            name: currentUser?.fullName,
            email: currentUser?.email,
            phone: currentUser?.phoneNumber? currentUser?.phoneNumber : "",
        }, 
        primaryImage,
        stage: "review"
    }

    // console.log(listing)

    dispatch(uploadListings(listing));
    
    // toast.success("Form submitted successfully!");
    return;
};

useEffect(() => {
    if (uploadMsg) {
        toast.success(uploadMsg);
        const timer = setTimeout(() => {
            dispatch(setUploadMsg(""));
        }, 5000); // 10 seconds timeout

        // Cleanup the timeout on component unmount or if the effect is triggered again
        return () => clearTimeout(timer);
    }
}, [uploadMsg, dispatch]);



  return (
    <div className='upload' >
        <div className="header">
            <h4>Upload a listing for Sale/Rent</h4>

        </div>
        <div className="uploads-cont">
            <ImageInput />
            <AddressInput />
            <DescriptionInput />
            <div className="btn-cont">
              <button onClick={handleSubmit} className='primary-btn' >Finish</button>
            </div>
        </div>
      <ToastContainer />

    </div>
  )
}

export default Upload