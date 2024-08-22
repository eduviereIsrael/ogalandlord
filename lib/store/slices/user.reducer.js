import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { createSelector } from 'reselect';
import { createAuthUserWithEmailAndPassword, updateUser, signInWithGooglePopup, signInWithGoogleRedirect, updateUserSubscription, updateUserProduct, createUserDocumentFromAuth, getCurrentUser, signInAuthUserWithEmailAndPassword, signOutUser, fetchUserByEmail, sendPasswordReset } from "@/lib/firebase/firebase.utils";
import axios from "axios";
import { fetchUploadedListings, uploadListings } from "./listingUpload.reducer";
import { toast } from "react-toastify";



//user async thunks
export const logInUser = createAsyncThunk(
    'user/login',
    async(user, {dispatch, rejectWithValue}) => {
        // console.log(user)
       try{ 
           
            if(user){

                const userSnapshot = await createUserDocumentFromAuth(user)
                if(userSnapshot){
                    // console.log(userSnapshot)
                  
                    dispatch(closeAuth())
                    dispatch(fetchUploadedListings(userSnapshot.email))
                    return userSnapshot
                } else {
                    return rejectWithValue("Failed to sign in")
                }
    
            } else{
                return rejectWithValue("Failed to sign in")
            }

        }catch(error){
            return rejectWithValue(error.message)
        }
       
    }
)

export const signInUser = createAsyncThunk(
    'user/signIn',
    async({email, password}, {dispatch, rejectWithValue}) => {
       try{ 
        console.log(email)
            await fetchUserByEmail(email);
            // if(!userData){
            //     return rejectWithValue("User not found")
            // }
            const {user} = await signInAuthUserWithEmailAndPassword(email, password)
            dispatch(logInUser(user))
            return {}
        }catch(error){
            return rejectWithValue(error.message)
        }
       
    }
)

export const signUpUser = createAsyncThunk(
    'user/signUp',
    async({email, password, newUser}, {dispatch, rejectWithValue}) => {
        try{
            // console.log(email, password, newUser)
            const {user} = await createAuthUserWithEmailAndPassword(email, password)
            const userSnapshot = await createUserDocumentFromAuth(user, newUser)

            dispatch(logInUser(user))

            return {}
        } catch(error){
            return rejectWithValue(error.message)
        }
        
    }
)

export const updateUserThunk = createAsyncThunk(
    "user/update",
    async(user, {dispatch, rejectWithValue}) => {
        try{

            await updateUser(user)
            toast.success("Profile updated successfully!")
            return user
        } catch(error){
            toast.error(error.message)
            return rejectWithValue(error.message)
        }
    }
)

export const googleSignIn = createAsyncThunk(
    'user/googleSignIn',
    async(newUser, {dispatch, rejectWithValue}) => {
        try{
            const user = await signInWithGooglePopup()
            const userSnapshot = await createUserDocumentFromAuth(user, newUser)

            dispatch(logInUser(user))
            return {}
        } catch(error){
            return rejectWithValue(error.message)
        }
    }
)

export const signOut = createAsyncThunk(
    'user/signOut',
    async(_, {dispatch}) => {
        await signOutUser()
        return null
       
    }
)

export const signInAtFirstRender = createAsyncThunk(
    'user/autosignin',
    async(_,{rejectWithValue, dispatch}) => {
        try{
            const user = await getCurrentUser();
            if(user){

                dispatch(logInUser(user))
                return {}
            } else {
                return rejectWithValue("")
            }

        } catch(error){
            return rejectWithValue(error.message)
        }
    }
)

export const checkUserEmail = createAsyncThunk(
    'users/checkUserEmail',
    async (email, {dispatch, rejectWithValue}) => {
      try {
        const userData = await fetchUserByEmail(email);
        await sendPasswordReset(email)
        // console.log(userData);
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );


const getDateThreeDaysAhead = () => {
    const today = new Date();
    today.setDate(today.getDate() + 3);
    return today.toISOString().split('T')[0];
  };

const INITIAL_STATE = {
    currentUser: null,
    isLoading: false,
    error: null,
    clearDate: '',
    signupModal: false,
    signinModal: false,
    passwordRecoveryModal: false,
    passwordRecoverySuccess: false,
    updateUserIsLoading: false,
    updateError: null
}

const userSlice = createSlice({
    name: 'user',
    initialState: INITIAL_STATE,
    reducers: {
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.isLoading = false;
            state.clearDate = getDateThreeDaysAhead()

        },
        signInFailed: (state, action) => {
            state.currentUser = null;
            state.error = action.payload;
        },
        setUserError: (state, action) => {
            state.error = action.payload;
        },
        setSignupModal: (state, action) => {
            state.signupModal = action.payload;
            state.signinModal = false;
            state.passwordRecoveryModal = false;
            state.passwordRecoverySuccess = false;
        },
        setSigninModal: (state, action) => {
            state.signinModal = action.payload;
            state.signupModal = false;
            state.passwordRecoveryModal = false;
            state.passwordRecoverySuccess = false;
        },
        setPasswordRecoveryModal: (state, action) => {
            state.passwordRecoveryModal = action.payload;
            state.signinModal = false;
            state.signupModal = false;
            state.passwordRecoverySuccess = false;
        },
        setpasswordRecoverySuccess: (state, action) => {
            state.passwordRecoverySuccess = action.payload;
            state.passwordRecoveryModal = false;
            state.signinModal = false;
            state.signupModal = false;
        },
        closeAuth: (state, action) => {
            state.signupModal = false;
            state.signinModal = false;
            state.passwordRecoveryModal = false;
            state.passwordRecoverySuccess = false;
        },
        clearUpdateError: (state, action) => {
            state.updateError = null;
        },
        setUpdateLoading: (state, action) => {
            state.updateUserIsLoading = action.payload;
        }
        

    },

    extraReducers:(builder) => {
       builder.addCase(signInUser.pending, (state, action) => {
        state.isLoading = true;
       }),
 
       builder.addCase(signInUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
       }),
       builder.addCase(signInAtFirstRender.pending, (state, action) => {
        state.isLoading = true;
       }),
 
       builder.addCase(signInAtFirstRender.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
       }),
       builder.addCase(signUpUser.pending, (state, action) => {
        state.isLoading = true;
        // console.log('we got to extra reducers')
       }),
  
       builder.addCase(signUpUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        // console.log('we failed to signup')

       }),
       builder.addCase(signOut.fulfilled, (state, action) => {
        state.currentUser = null;
       }),
       builder.addCase(logInUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.clearDate = getDateThreeDaysAhead()
        state.isLoading = false;
       }),
       builder.addCase(logInUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        // console.log('we failed to signup')

       }),
       builder.addCase(checkUserEmail.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
        // console.log('we failed to check user email')
       }),
       builder.addCase(checkUserEmail.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        state.passwordRecoverySuccess = true;
        state.passwordRecoveryModal = false;
        state.signinModal = false;
        state.signupModal = false;
        // console.log('we sent password reset email')
       }),
       builder.addCase(checkUserEmail.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
       }),
       builder.addCase(updateUserThunk.fulfilled, (state, action) =>{
        state.currentUser = action.payload;
        state.updateUserIsLoading = false;
        state.updateError = "success";
        // state.error = null;
        // state.isLoading = false;
        // console.log('we updated user')
       })
       builder.addCase(updateUserThunk.pending, (state, action) => {
        state.updateUserIsLoading = true;
        state.updateError = null;
       }),
       builder.addCase(updateUserThunk.rejected, (state, action) => {
        state.updateUserIsLoading = false;
        state.updateError = action.payload;
        // console.log('we failed to update user')
       })
       
    }
})


export const userReducer = userSlice.reducer;
export const {
    setUserError, 
    signInSuccess, 
    setSignupModal, 
    setSigninModal, 
    clearUpdateError, 
    closeAuth, 
    setPasswordRecoveryModal, 
    setpasswordRecoverySuccess ,
    setUpdateLoading 
} = userSlice.actions;

//User selectors
const selectUser = (state) => state.user

export const selectCurrentUser = createSelector(
    [selectUser],
    (user) => user.currentUser
)

export const selectClearDate = createSelector(
    [selectUser],
    (user) => user.clearDate
)

export const selectUserIsLoading = createSelector(
    [selectUser],
    (user) => user.isLoading
)

export const selectUserError = createSelector(
    [selectUser],
    (user) => user.error
)

export const selectSignUpModal = (state) => state.user.signupModal
export const selectSignInModal = (state) => state.user.signinModal
export const selectPasswordRecoveryModal = (state) => state.user.passwordRecoveryModal;
export const selectPasswordRecoverySuccess = (state) => state.user.passwordRecoverySuccess;
export const selectUpdateError = (state) => state.user.updateError;
export const selectUpdateLoading = (state) => state.user.updateUserIsLoading;
