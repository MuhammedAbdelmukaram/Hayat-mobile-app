import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';

// Asynchronously check for the token and update the state
export const checkLoginStatus = createAsyncThunk(
    'auth/checkLoginStatus',
    async () => {
      const token = await SecureStore.getItemAsync('userToken');
      return !!token; // Convert token presence to boolean
    }
);

const initialState = {
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
    },
    setLoginState: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(checkLoginStatus.pending, (state) => {
          // You can add a loading state here if you want
          state.checkingStatus = true; // Assume checkingStatus is part of your initial state
        })
        .addCase(checkLoginStatus.fulfilled, (state, action) => {
          state.isLoggedIn = action.payload;
          state.checkingStatus = false; // Update checkingStatus when the check is complete
        })
        .addCase(checkLoginStatus.rejected, (state) => {
          // Handle a rejected state here
          state.checkingStatus = false; // Update checkingStatus on rejection
        });
    // Add other cases here as needed
  },
});


export const { logout, setLoginState } = authSlice.actions;

export default authSlice.reducer;
