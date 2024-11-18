import {combineSlices, configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import logger from 'redux-logger';
import {weatherSlice} from './slices/weatherSlice';
import { configureStore } from "@reduxjs/toolkit";


const rootReducer = combineSlices(weatherSlice);

export const store = configureStore({
    reducer: {
      favorites: favoritesReducer,
      units: unitsReducer,
    },
  });
const store = configureStore({
    reducer: rootReducer,
    middleware(getDefaultMiddleware) {
        return process.env.NODE_ENV === 'development'
            ? getDefaultMiddleware().concat(logger)
            : getDefaultMiddleware();
    },
});

setupListeners(store.dispatch);

export {store};
