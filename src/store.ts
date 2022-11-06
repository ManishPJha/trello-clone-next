import { configureStore } from "@reduxjs/toolkit";
import { persistCombineReducers, persistStore } from "redux-persist";
import { createWrapper } from "next-redux-wrapper";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import usersSlice from "@/src/slices/users";
import authSlice from "@/src/slices/auth";

// persist storage is not usable in next js (issue: https://github.com/rt2zz/redux-persist/issues/1208)
import storage from "reduxjs-toolkit-persist/lib/storage/session";

const isClient = typeof window !== undefined;

const persistConfigs = {
  key: "root",
  storage,
};

// To serialize actions
const middleware = (getDefaultMiddleware: any) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  });

const createStore = () => {
  return isClient
    ? configureStore({
        reducer: rootReducer,
        devTools: true,
        middleware: middleware,
      })
    : configureStore({
        reducer: {
          [usersSlice.name]: usersSlice.reducer,
          [authSlice.name]: authSlice.reducer,
        },
        devTools: {
          trace: true,
          maxAge: 25,
        },
      });
};

const rootReducer = persistCombineReducers(persistConfigs, {
  [usersSlice.name]: usersSlice.reducer,
  [authSlice.name]: authSlice.reducer,
});

export const store = createStore();

export const persistor = persistStore(store);

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>;

export const Wrapper = createWrapper(createStore);

export default createStore;
