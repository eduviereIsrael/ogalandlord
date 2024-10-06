import { combineReducers } from '@reduxjs/toolkit';
import { userReducer } from './slices/user.reducer'
import { listingUploadReducer } from './slices/listingUpload.reducer';
import { editUploadReducer } from './slices/listingEdit.reducer';
import { listingsReducer } from './slices/listings.reducer';
import { adminReducer } from './slices/admin.reducer';

export const rootReducer = combineReducers({
    user: userReducer,
    listingUpload: listingUploadReducer,
    edit: editUploadReducer,
    listings: listingsReducer,
    admin: adminReducer
})