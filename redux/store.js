// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import selectedContentReducer from './slices/selectedContentSlice';
import authReducer from './slices/authSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        auth: authReducer,
        selectedContent: selectedContentReducer,
    },
});

export default store;
