import { configureStore } from "@reduxjs/toolkit";
import { createWrapper, Context } from "next-redux-wrapper";
import usersSlice from "@/src/slices/users";
import userSlice from "./slices/user";

const createStore = (context: Context) => {
  return configureStore({
    reducer: {
      [usersSlice.name]: usersSlice.reducer,
      [userSlice.name]: userSlice.reducer,
    },
    devTools: true,
  });
};

const store = configureStore({
  reducer: {
    [usersSlice.name]: usersSlice.reducer,
    [userSlice.name]: userSlice.reducer,
  },
});

export type AppStore = ReturnType<typeof createStore>;
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>;

export const Wrapper = createWrapper<AppStore>(createStore, { debug: true });

export default createStore;
