import React from 'react'
import { fetchAllActiveListingsSlug, fetchListingBySlug } from '@/lib/firebase/firebase.utils'
import { DetailsPage, Navbar } from '@/components'


const getData = async(slug) => {
  const data = await fetchListingBySlug(slug)
  function modifyListings(listing) {
  
      // Modify the uploadDate
      if (listing?.uploadDate && listing?.uploadDate.seconds) {
        listing.uploadDate = new Date(listing.uploadDate.seconds * 1000).toISOString();
      }
  
      // Loop through updatedPrice array and modify the date property
      if (Array.isArray(listing.updatedPrice)) {
        listing.updatedPrice = listing.updatedPrice.map(priceObj => {
          if (priceObj.date && priceObj.date.seconds) {
            priceObj.date = new Date(priceObj.date.seconds * 1000).toISOString();
          }
          return priceObj;
        });
      }
  
      return listing;
    
    }
  return modifyListings(data)
}


export default async function Page({ params }) {
  const listing = await getData(params.slug)
  // console.log("HELLO",listing)
  return <div className='page details-page' >
    <Navbar />

      <div className="page-container">

        {/* <h1>My Post: {params.slug}</h1> */}
        <DetailsPage listing={listing}  />


      </div>
    </div>
}


export async function generateStaticParams() {
  const slugs = await fetchAllActiveListingsSlug()
 
  return slugs.map((post) => ({
    slug: post,
  }))
}