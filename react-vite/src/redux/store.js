import { configureStore } from "@reduxjs/toolkit";
import { default as logger } from "redux-logger";
import sessionReducer from "./session";
import petsReducer from "./pets";
import bookingReducer from "./booking";
import serviceReducer from "./service";

const store = configureStore({
  reducer: {
    session: sessionReducer,
    pets: petsReducer,
    booking: bookingReducer,
    service: serviceReducer,
  },
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware();
    if (process.env.NODE_ENV === "development") {
      middlewares.push(logger);
    }
    return middlewares;
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
