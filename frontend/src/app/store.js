import { configureStore } from '@reduxjs/toolkit';
import appStateReducer from '../features/appState/appStateSlice'; // Adjust the import path as necessary

const store = configureStore({
  reducer: {
    appState: appStateReducer,
  },
});

export default store;
