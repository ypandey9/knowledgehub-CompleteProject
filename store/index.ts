"use client";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import enrollmentReducer from "./enrollmentSlice";
import progressReducer from "./progressSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    enrollment:enrollmentReducer,
    progress:progressReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
