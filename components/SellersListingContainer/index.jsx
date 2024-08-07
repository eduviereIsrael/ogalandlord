import React from 'react'
import { SPropertyCard } from '..'

const SellersListingContainer = ({listings}) => {
  return (
    <div className='s-listings-container' >
      {
        listings.map((listing, index) => (
          <SPropertyCard key={listing.id} listing={listing} />
        ))
      }
   
  

      {
        listings.length < 2 && <>
        <span></span>
        <span></span>
        <span></span>
        </>
      }
        {/* <SPropertyCard /> */}
    </div>
  )
}

export default SellersListingContainer