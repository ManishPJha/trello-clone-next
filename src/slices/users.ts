import { createSlice } from "@reduxjs/toolkit";
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
  extraReducers: {},
});

export const { clearErrors, resetStates } = usersSlice.actions;

export default usersSlice;
