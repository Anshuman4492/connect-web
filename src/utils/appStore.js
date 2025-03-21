import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import myConnectionsReducer from "./myConnections";
import requestsReducer from "./requestSlice";
const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    myConnections: myConnectionsReducer,
    requests: requestsReducer,
  },
});

export default appStore;
