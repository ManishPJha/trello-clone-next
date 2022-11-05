import { configureStore } from "@reduxjs/toolkit";
import { persistCombineReducers, persistStore } from "redux-persist";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import { createWrapper } from "next-redux-wrapper";
import usersSlice from "@/src/slices/users";

// persist storage is not usable in next js (issue: https://github.com/rt2zz/redux-persist/issues/1208)
// import storage from "redux-persist/lib/storage";
import storage from "reduxjs-toolkit-persist/lib/storage/session";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = persistCombineReducers(persistConfig, {
  [usersSlice.name]: usersSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const createStore = (preloadedState = {}) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

const middleware = (getDefaultMiddleware: any) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  });

export const store = configureStore({
  reducer: persistedReducer,
  devTools: {
    trace: true,
    traceLimit: 25,
  },
  middleware: middleware,
});

export const persistor = persistStore(store);

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>;

export const Wrapper = createWrapper(createStore, { debug: true });

export default createStore;
