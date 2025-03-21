import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeRequest } from "../utils/requestSlice";

const RequestsList = ({ requests }) => {
  const dispatch = useDispatch();
  const reviewRequest = async (status, requestId) => {
    try {
      const response = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + requestId,
        {},
        { withCredentials: true }
      );
      // Remove from Store
      dispatch(removeRequest(requestId));
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  if (requests.length === 0)
    return <h1 className="text-center">No Requests Found</h1>;
  return (
    <div>
      <ul className="list bg-base-100 rounded-box shadow-md w-3/8">
        {requests &&
          requests?.map((request) => {
            const { _id } = request;
            const { firstName, lastName, profileUrl } = request?.fromUserId;
            return (
              <li key={_id} className="list-row">
                <div>
                  <img className="size-10 rounded-box" src={profileUrl} />
                </div>
                <div>
                  <div>{`${firstName} ${lastName}`}</div>
                  <div className="text-xs uppercase font-semibold opacity-60">
                    Remaining Reason
                  </div>
                </div>
                <button
                  className="btn btn-outline btn-primary"
                  onClick={() => reviewRequest("accepted", _id)}
                >
                  Accept
                </button>
                <button
                  className="btn btn-outline btn-secondary"
                  onClick={() => reviewRequest("accepted", _id)}
                >
                  Ignore
                </button>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default RequestsList;
