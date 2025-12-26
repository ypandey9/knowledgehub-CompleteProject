import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserState {
  me: User | null;
}

const initialState: UserState = {
  me: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.me = action.payload;
    },
    logout(state) {
      state.me = null;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;


