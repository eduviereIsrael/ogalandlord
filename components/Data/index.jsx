import React from 'react'
import { fetchAllActiveListings } from '@/lib/firebase/firebase.utils'
import DataDispatch from '../DataDispacth';

const getData = async() => {
    function modifyListings(listings) {
        return listings.map(listing => {
          // Modify the uploadDate
          if (listing.uploadDate && listing.uploadDate.seconds) {
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
        });
      }
      
    const listings = await fetchAllActiveListings();
    // console.log(listings);
    return modifyListings(listings);
}
export default async function DataComponent ({children}) {
    const data = await getData();
    return (
        <>
        <DataDispatch data={data} />
        {children}
        </>
    )
    
}

// export default 