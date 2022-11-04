import { checkEnvironment } from "@/utils/checkEnvironment";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initState = {
  loading: false,
  success: false,
  error: undefined,
  users: [],
};


let url = checkEnvironment();

const fetchUsers = createAsyncThunk("user/get", async () => {
  const response = await fetch(url.concat("/api/hello"));
  const json = await response.json();

  return json;
});

const usersSlice = createSlice({
  name: "users",
  initialState: initState,
  reducers: {
    // UpdateUserStates: (state, { payload, type }) => {
    //   state.user = payload.value;
    // },
    resetState: () => initState,
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return { ...state, ...action.value };
    },
    [fetchUsers.pending.toString()]: (state) => {
      state.loading = true;
      state.success = false;
    },
    [fetchUsers.fulfilled.toString()]: (state, action) => {
      state.users = action.value;
      state.success = true;
    },
    [fetchUsers.rejected.toString()]: (state) => {
      state.loading = false;
      state.success = false;
    },
  },
});

export const { resetState } = usersSlice.actions;
export default usersSlice;
