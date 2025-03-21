import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  if (!user) return;
  const { _id, firstName, lastName, age, gender, about, profileUrl, skills } =
    user;
  const dispatch = useDispatch();
  const sendRequest = async (status, userId) => {
    try {
      const response = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      console.log(response?.data?.data);
      dispatch(removeUserFromFeed(userId));
    } catch (error) {}
  };
  return (
    <div>
      <div className="card bg-base-300 w-96 shadow-sm">
        <figure className="h-96">
          <img
            src={profileUrl}
            alt={`${firstName} ${lastName}`}
            className="rounded-xl"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
          <p>{`${age}, ${gender}`}</p>
          <p>{about}</p>
          <p>{skills}</p>
          <div className="card-actions">
            <button
              className="btn btn-primary"
              onClick={() => sendRequest("pass", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => sendRequest("like", _id)}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
