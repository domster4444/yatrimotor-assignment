'use client';

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { setupListeners } from '@reduxjs/toolkit/query';

//* RTK QUERY IMPORTS (step I)
import { authenticationApi } from './API/authenticationApi';
import { postApi } from './API/postApi';
import { baseApi } from './API/baseApi';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['authenticated'], // place to select which state you want to persist
};

const rootReducer = combineReducers({
  ////* (step2)

  // * (step II)
  [authenticationApi.reducerPath]: authenticationApi.reducer,
  [postApi.reducerPath]: postApi.reducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,

  // * (step III)
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authenticationApi.middleware,
      postApi.middleware,
      baseApi.middleware
    ),
});

setupListeners(store.dispatch);

// RootState type for accessing the store's state
export type RootState = ReturnType<typeof store.getState>;

// AppDispatch type for dispatching actions
export type AppDispatch = typeof store.dispatch;
