import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/myConnections";
import ConnectionList from "./ConnectionList";
const Connections = () => {
  const myConnectedConnections = useSelector((store) => store.myConnections);
  const dispatch = useDispatch();
  const fetchMyConnections = async () => {
    try {
      if (myConnectedConnections) return;
      const myConnections = await axios.get(
        BASE_URL + "/user/requests/connected",
        { withCredentials: true }
      );
      dispatch(addConnections(myConnections?.data?.data));
    } catch (error) {
      console.log(`Error while fetching my connections: ${error}`);
    }
  };
  useEffect(() => {
    fetchMyConnections();
  }, []);

  return (
    <div className="">
      <ConnectionList myConnectedConnections={myConnectedConnections} />
    </div>
  );
};

export default Connections;
