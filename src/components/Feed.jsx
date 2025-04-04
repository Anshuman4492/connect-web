import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
import { useNavigate } from "react-router-dom";
const Feed = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const feed = useSelector((store) => store.feed);
  const fetchFeed = async () => {
    if (feed) return;
    try {
      const response = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(response?.data?.data));
    } catch (error) {
      navigate("/login");
      console.log(`Error while fetching feed: ${error}`);
    }
  };
  useEffect(() => {
    fetchFeed();
  }, []);
  if (!feed || feed.length === 0) {
    return (
      <div className="flex justify-center mt-10">
        We don't have new users to show. Please share us!
      </div>
    );
  }
  return (
    <div className="flex justify-center my-10">
      {feed && <UserCard user={feed[0]} />}
    </div>
  );
};

export default Feed;
