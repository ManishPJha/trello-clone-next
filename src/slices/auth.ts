import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initState = {
  loading: false,
  error: null,
  isAuthenticated: false,
  authUser: {
    id: "",
    email: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {
    AUTH_REQUEST: (state) => {
      console.log(`called? ---- `);
      
      state.loading = true;
    },
    AUTH_RESPONSE: (state, action) => {
      state.loading = false;
      state.authUser = action.payload;
    },
    AUTH_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    CLEAR_ERRORS: (state) => {
      state.loading = false;
      state.error = null;
    },
    RESET_STATE: () => initState,
  },
});

export const {
  AUTH_REQUEST,
  AUTH_RESPONSE,
  AUTH_FAIL,
  CLEAR_ERRORS,
  RESET_STATE,
} = authSlice.actions;

export default authSlice;
