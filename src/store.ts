import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

//slices
import usersSlice from "@/src/slices/users";
import authSlice from "@/src/slices/auth";
import boardSlice from "@/src/slices/board";
import columnSlice from "@/src/slices/column";

// // persist storage is not usable in next js (issue: https://github.com/rt2zz/redux-persist/issues/1208)
// import storage from "reduxjs-toolkit-persist/lib/storage/session";

const isClient = typeof window !== undefined;

// To serialize actions
const middleware = (getDefaultMiddleware: any) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  });

const createStore = () =>
  configureStore({
    reducer: {
      [authSlice.name]: authSlice.reducer,
      [usersSlice.name]: usersSlice.reducer,
      [boardSlice.name]: boardSlice.reducer,
      [columnSlice.name]: columnSlice.reducer,
    },
    devTools: {
      trace: true,
      maxAge: 25,
    },
    middleware: middleware,
  });

export const store = createStore();

export type AppStore = ReturnType<typeof createStore>;
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>;

export const Wrapper = createWrapper(createStore);

export default createStore;
