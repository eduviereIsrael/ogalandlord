
import { createSlice, createSelector } from "@reduxjs/toolkit"






const INITIAL_STATE = {
    allListings: [],
    filters: {
        location: {
            lga: [],
            state: "",
        },
        listingType: '',
        propertyType: '',
        minMaxPrice: "",
        bedrooms: '',
        bathrooms: '',

    }

}

const filterListings = (listings, filter) => {

    const { location, listingType, propertyType, minMaxPrice, bedrooms, bathrooms} = filter
    let filteredListings = [...listings]

    if(location.state !== ""){
        // console.log("We filtered by state")
        const lga = location.lga
        const state = location.state
        
        filteredListings = filteredListings.filter(listing => listing.location.state == state )

    }

    if(location.lga.length !== 0){
        // console.log("We filtered by lga", listings)

        const lga = location.lga
        // const state = location.state
        
        filteredListings = filteredListings.filter(listing => lga.includes(listing.location.lga) )
        
    }

    if(listingType){
        if(listingType === "rent"){
            filteredListings = filteredListings.filter(listing => listing.details.paymentType === "Yearly" )
        }
        else if(listingType === "sell"){
            filteredListings = filteredListings.filter(listing => listing.details.paymentType === "Sale" )
        }
        else if(listingType === "shortlet"){
            filteredListings = filteredListings.filter(listing => listing.details.paymentType === "Monthly" || listing.details.paymentType === "Daily"  )
        }
    }

    if(propertyType){
        filteredListings = filteredListings.filter(listing => listing.details.propertyType === propertyType )
    }

    if(parseInt(bedrooms) > 0){
        // console.log(listing.details.bedrooms)
        filteredListings = filteredListings.filter(listing => parseInt(listing.details.bedrooms) === parseInt(bedrooms) )
    }

    if(bathrooms){
        filteredListings = filteredListings.filter(listing => parseInt(listing.details.baths) === parseInt(bathrooms) )
    }

    const parseNumbers = (str) => {
        const numbers = str.split(',').map(Number);
        return numbers.length === 1 ? [numbers[0]] : [numbers[0], numbers[1]];
    };
    
    if (minMaxPrice) {
        const prices = parseNumbers(minMaxPrice).sort((a, b) => a - b); // Ensure prices are in ascending order
        const updatedListings = []; // New array to hold the filtered listings
    
        if (prices.length === 1) {
            for (let i = 0; i < filteredListings.length; i++) {
                const price = parseInt(filteredListings[i].details.price);
                if (prices[0] === 300000 && price <= prices[0]) {
                    updatedListings.push(filteredListings[i]);
                } else if (prices[0] === 4000000 && price >= prices[0]) {
                    updatedListings.push(filteredListings[i]);
                }
            }
        } else {
            for (let i = 0; i < filteredListings.length; i++) {
                const price = parseInt(filteredListings[i].details.price);
                if (price >= prices[0] && price <= prices[1]) {
                    updatedListings.push(filteredListings[i]);
                }
            }
        }
    
        // Update the original filteredListings with the updated filtered results
        filteredListings = updatedListings;
    }
    
    console.log(filteredListings)
    return filteredListings
}

const listingUploadSlice = createSlice({
    name: "listings",
    initialState: INITIAL_STATE,
    reducers: {
        setAllListings: (state, action) => {
            state.allListings = action.payload;
        },
        setLocationFilter: (state, action) => {
            state.filters.location = action.payload;
        },
        updateOtherFilter: (state, action) => {
            const { key, value } = action.payload;
            if(state.filters.hasOwnProperty(key)){
                state.filters[key] = value;
            }
        }
    }
});

export const { setAllListings, setLocationFilter, updateOtherFilter } = listingUploadSlice.actions;
export const listingsReducer = listingUploadSlice.reducer

const listingsSelector = state => state.listings

export const selectAllListings = createSelector(
    [listingsSelector],
    listings => listings.allListings
)

export const selectFilters = createSelector(
    [listingsSelector],
    listings => listings.filters
)

export const selectFilteredListings = createSelector(
    [listingsSelector],
    (listings) => filterListings(listings.allListings, listings.filters)
)

