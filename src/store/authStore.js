import { createSlice } from "@reduxjs/toolkit";

// Restore auth state from localStorage on app load
const savedUser = localStorage.getItem("user");
const savedToken = localStorage.getItem("token");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: savedUser ? JSON.parse(savedUser) : null,
    token: savedToken || null,
    isLoggedIn: !!savedToken,
  },
  reducers: {
    setUser(state, action) {
      const { token, ...userData } = action.payload;
      state.user = userData;
      state.token = token;
      state.isLoggedIn = true;
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", token);
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
