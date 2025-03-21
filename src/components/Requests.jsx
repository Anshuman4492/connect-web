import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import RequestsList from "./RequestsList";
import { addRequests } from "../utils/requestSlice";
import { useDispatch, useSelector } from "react-redux";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const fetchPendingRequests = async () => {
    if (requests) return;
    const response = await axios.get(BASE_URL + "/user/requests/received", {
      withCredentials: true,
    });
    dispatch(addRequests(response?.data?.data));
  };
  useEffect(() => {
    fetchPendingRequests();
  }, []);
  return (
    <div>
      <RequestsList requests={requests} />
    </div>
  );
};

export default Requests;
