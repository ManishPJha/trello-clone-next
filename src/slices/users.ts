import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

type userProps = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  resetToken?: string;
  resetTokenExpiryTime?: any;
  createdAt?: Date;
  updatedAt?: Date;
};

type userStateTypes = {
  loading: boolean;
  error: any;
  users: any;
};

const initState: userStateTypes = {
  loading: false,
  error: null,
  users: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState: initState,
  reducers: {
    clearErrors: (state) => {
      state.loading = false;
      state.error = null;
    },
    resetStates: () => initState,
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      if (!action.payload.value) {
        return state;
      }

      state.users = action.payload.value;
    },
  },
});

export const { clearErrors, resetStates } = usersSlice.actions;

export default usersSlice;
