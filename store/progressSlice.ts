"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProgressState {
  completed: {
    [courseId: string]: string[]; // example: { "1": ["lesson1", "lesson2"] }
  };
}

const initialState: ProgressState = {
  completed: {},
};

const progressSlice = createSlice({
  name: "progress",
  initialState,
  reducers: {
  markCompleted(
    state,
    action:PayloadAction<{ courseId:string; lessonId:string }>
  ) {
    const { courseId,lessonId }=action.payload;
    if(!state.completed[courseId]) {
      state.completed[courseId]=[];
    }

    if(!state.completed[courseId].includes(lessonId)) {
      state.completed[courseId].push(lessonId);
    }
  },

  // hydrate from db
  setCompletedLessons(
    state,
    action: PayloadAction< { courseId : string; lessonIds: string[]}>
  ){
    state.completed[action.payload.courseId]=action.payload.lessonIds;
  },
},
});

export const { markCompleted,setCompletedLessons } = progressSlice.actions;
export default progressSlice.reducer;
