import React from 'react'
import { BPropertyCard } from '..'

const SellersListingContainer = ({listings}) => {
  return (
    <div className='b-listings-container' >
      {
        listings.map((listing, index) => (
          <BPropertyCard key={listing.id} listing={listing} />
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