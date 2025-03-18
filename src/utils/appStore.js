import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import myConnectionsReducer from "./myConnections";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    myConnections: myConnectionsReducer,
  },
});

export default appStore;
