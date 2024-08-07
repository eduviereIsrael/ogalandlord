import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { createSelector } from 'reselect';
import { saveImageToStorage, deleteImageFromStorage, uploadListing, fetchListingsByEmail, markListingAsDeleted } from "@/lib/firebase/firebase.utils";

const INITIAL_STATE = {
    currentUpload: {
        location: {
            address: "",
            state: "",
            lga: "",  
        },
        details: {
            description: "",
            title: "",
            furnished: "",
            propertyType: "",
            bedrooms: 0,
            baths: 0,
            amenities: [],
            price: 0,
            paymentType: "",
            priceNegotiable: 'false'
        },
        images: [],
        primaryImage: "",
        imageUploading: false,
        uploadError: "",
        uploadMsg: ""

    },
  
    uploadedListings: [],
    amenitiesList: [
        "Fenced",
        "Electricity 24/7",
        "Security",
        "WiFi",
        "Cinema",
        "Garage",
        "EnSuite",
        "Laundry Room",
        "Fireplace",
        "Recreational Facilities",
        "SwimmingPool",
        "Childrens Playground",
        "Power Backup",
        "Spa",
        "Clubhouse"
    ],
}

const updateChosenAmeninitesHandler = (list, string) => {
    console.log("chosen amenities", string)
    if (list.includes(string)) {
        console.log(list.filter(item => item !== string))
        return list.filter(item => item !== string);
    } else {
        console.log([...list, string]);
        return [...list, string];
    }
};

export const saveImage = createAsyncThunk(
   "listingUpload/saveImage",
   async(file, {dispatch, rejectWithValue}) => {
    try{
        const image = await saveImageToStorage(file)
        return image
    } catch (e) {
        return rejectWithValue(e.message)
    }
   } 
)

export const deleteImage = createAsyncThunk(
    "listingUpload/deleteImage",
    async (path, { rejectWithValue }) => {
     try {
         await deleteImageFromStorage(path);
         // Optionally, you could return a success message or the path that was deleted
         return path;
     } catch (e) {
         return rejectWithValue(e.message);
     }
    }
 );

 export const uploadListings = createAsyncThunk(
    'listingUpload/uploadListings',
    async (listing, { rejectWithValue }) => {
      try {
        // Call the uploadListing function to upload the listing
        const id = await uploadListing(listing);
        // Return the ID if successful
        return id;
      } catch (error) {
        // Return the error message if there's an error
        return rejectWithValue(error.message);
      }
    }
  );

  export const deleteListing = createAsyncThunk(
    'listingUpload/deleteListing',
    async ({email, id}, { rejectWithValue, dispatch }) => {
      try {
        // Call the deleteListing function to delete the listing by ID
        await markListingAsDeleted(id);
        // Return the ID if successful
        dispatch(fetchUploadedListings(email))
        return id;
      } catch (error) {
        // Return the error message if there's an error
        return rejectWithValue(error.message);
      }
    }
  );

  export const fetchUploadedListings = createAsyncThunk(
    'listingUpload/fetchUploadedListings',
    async (email, { rejectWithValue }) => {
      try {
        const listings = await fetchListingsByEmail(email);
        return listings;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

 const filterImagesById = (images, path) => {
    return images.filter(image => image.fullPath !== path);
};

 const listingUploadSlice = createSlice({
    name: 'listingUpload',
    initialState: INITIAL_STATE,
    reducers: {
        setCurrentUpload: (state, action) => {
            state.currentUpload = action.payload;
        },
        updateLocation: (state, action) => {
            const { key, value } = action.payload;
            if (state.currentUpload.location.hasOwnProperty(key)) {
                state.currentUpload.location[key] = value;
            }
        },
        updateDetails: (state, action) => {
            const { key, value } = action.payload;
            if (state.currentUpload.details.hasOwnProperty(key)) {
                state.currentUpload.details[key] = value;
            }
        },
        addAmenity: (state, action) => {
            state.amenitiesList.push(action.payload);
        },
        updateChosenAmeninites: (state, action) => { 
            state.currentUpload.details.amenities = updateChosenAmeninitesHandler(state.currentUpload.details.amenities, action.payload);
            // console.log(acti)
        },
        setUploadMsg: (state, action) =>{
            state.currentUpload.uploadMsg = action.payload;
        },
        updatePrimaryImage: (state, action) => {
            state.currentUpload.primaryImage = action.payload;
        },
        clearPrimaryImage: (state, action) => {
            state.currentUpload.primaryImage = "";
        }
    },

    extraReducers: (builder) => {
        builder.addCase(saveImage.fulfilled, (state, action) => {
            state.currentUpload.images.push(action.payload)
            state.currentUpload.imageUploading = false;

        })
        .addCase(saveImage.pending, (state, action) => {
            state.currentUpload.imageUploading = true;
        })
        .addCase(saveImage.rejected, (state, action) => {
            state.currentUpload.uploadError = "Failed to upload image";
            state.currentUpload.imageUploading = false;

        })
        .addCase(deleteImage.fulfilled, (state, action) => {
 
            state.currentUpload.images = filterImagesById(state.currentUpload.images, action.payload);
        })
        .addCase(uploadListings.fulfilled, (state, action) => {
            state.currentUpload.uploadMsg = "Listing uploaded successfully"
            state.currentUpload.uploadError = ""
            state.currentUpload.details = INITIAL_STATE.currentUpload.details
            state.currentUpload.location = INITIAL_STATE.currentUpload.location
            state.currentUpload.images = []
        })
        .addCase(fetchUploadedListings.fulfilled, (state, action) => {
            state.uploadedListings = action.payload;
        });
    }

})


export const listingUploadReducer = listingUploadSlice.reducer;
export const { updateDetails, updateLocation, addAmenity, clearPrimaryImage, updateChosenAmeninites, setUploadMsg, updatePrimaryImage } = listingUploadSlice.actions


const selectListingUpload = (state) => state.listingUpload

export const selectCurrentUpload = createSelector(
    [selectListingUpload],
    (listingUpload) => listingUpload.currentUpload
)

export const selectAmenitiesList = createSelector(
    [selectListingUpload],
    (listingUpload) => listingUpload.amenitiesList
)

export const selectLocation = createSelector(
    [selectListingUpload],
    (listingUpload) => listingUpload.currentUpload.location
)

export const selectDetails = createSelector(
    [selectListingUpload],
    (listingUpload) => listingUpload.currentUpload.details
)

export const selectImages = createSelector(
    [selectListingUpload],
    (listingUpload) => listingUpload.currentUpload.images
)

export const selectChosenAmenities = createSelector(
    [selectListingUpload],
    (listingUpload) => listingUpload.currentUpload.details.amenities
)

export const selectUploadMsg = createSelector(
    [selectListingUpload],
    (listingUpload) => listingUpload.currentUpload.uploadMsg
)

export const selectPrimaryImage = createSelector(
    [selectListingUpload], // Input selector
    (listingUpload) => listingUpload.currentUpload.primaryImage // Output selector
  );
  export const selectUploadedListings = createSelector(
    [selectListingUpload], // Input selector
    (listingUpload) => listingUpload.uploadedListings // Output selector
  );
  export const selectLoading = createSelector(
    [selectListingUpload], // Input selector
    (listingUpload) => listingUpload.currentUpload.imageUploading // Output selector
  );
