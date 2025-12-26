"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// const stored=typeof window !=="undefined" ? 
// localStorage.getItem("enrolledCourses") : null;

interface EnrollmentState {
  enrolledCourseIds: string[];
}

const initialState: EnrollmentState = {
  enrolledCourseIds: [],
};

const enrollmentSlice = createSlice({
  name: "enrollment",
  initialState,
  reducers: {
    enroll(state, action: PayloadAction<string>) {
      if (!state.enrolledCourseIds.includes(action.payload)) {
        state.enrolledCourseIds.push(action.payload);
      }
    },
    unenroll(state, action: PayloadAction<string>) {
      state.enrolledCourseIds = state.enrolledCourseIds.filter(
        (id) => id !== action.payload
      );
    },

    // Hydrarte from db after login

    setEnrollments(state,action:PayloadAction<string[]>){
      state.enrolledCourseIds=action.payload;
    },

    //clear on logout
    clearEnrollments(state){
      state.enrolledCourseIds=[];
    },
  },
});

export const { enroll, unenroll,setEnrollments,clearEnrollments } = enrollmentSlice.actions;
export default enrollmentSlice.reducer;
