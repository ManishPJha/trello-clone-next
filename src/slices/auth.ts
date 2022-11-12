import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import type { AppState } from "@/src/store";
import { ObjectId } from "mongodb";

export type AuthTypes = {
  id: ObjectId;
  email: string;
};

export type AuthSliceType = {
  loading: boolean;
  error: string;
  isAuthenticated: boolean;
  authUser: AuthTypes;
};

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
    AUTH_REQUEST: (state, action) => {
      state.loading = action.payload.loading;
    },
    AUTH_RESPONSE: (state, action) => {
      state.loading = false;
      (state.isAuthenticated = true),
        (state.authUser = action.payload.authData);
    },
    AUTH_FAIL: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload.error;
    },
    CLEAR_ERRORS: (state) => {
      state.loading = false;
      state.error = null;
    },
    RESET_STATE: () => initState,
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      if (action.payload) {
        const { loading, isAuthenticated, error, authUser } =
          action.payload.auth;
        return {
          ...state,
          loading: loading,
          isAuthenticated: isAuthenticated,
          error: error,
          authUser: authUser,
        };
      }
    },
  },
});

export const {
  AUTH_REQUEST,
  AUTH_RESPONSE,
  AUTH_FAIL,
  CLEAR_ERRORS,
  RESET_STATE,
} = authSlice.actions;

export const authSelector = (state: AppState) => state.auth.authUser;

export default authSlice;
