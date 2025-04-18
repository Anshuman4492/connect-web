import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { Link } from "react-router-dom";

const ConnectionList = ({ myConnectedConnections }) => {
  return (
    <div>
      <ul className="list bg-base-100 rounded-box shadow-md w-3/8">
        {myConnectedConnections &&
          myConnectedConnections?.map((connection) => {
            const { _id, firstName, lastName, profileUrl } = connection;
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

                <Link to={"/chat/" + _id}>
                  <button className="btn btn-square btn-ghost">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="border border-amber-50 rounded-md bg-blue-200"
                    >
                      <path d="M448 0H64C28.7 0 0 28.7 0 64v288c0 35.3 28.7 64 64 64h96v84c0 9.8 11.2 15.5 19.1 9.7L304 416h144c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64z" />
                    </svg>
                  </button>
                </Link>
                <Link to={"/video/" + _id}>
                  <button className="btn btn-square btn-ghost">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                      className="border border-amber-50 rounded-md bg-blue-200"
                    >
                      <path d="M0 128C0 92.7 28.7 64 64 64l256 0c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64L64 448c-35.3 0-64-28.7-64-64L0 128zM559.1 99.8c10.4 5.6 16.9 16.4 16.9 28.2l0 256c0 11.8-6.5 22.6-16.9 28.2s-23 5-32.9-1.6l-96-64L416 337.1l0-17.1 0-128 0-17.1 14.2-9.5 96-64c9.8-6.5 22.4-7.2 32.9-1.6z" />
                    </svg>
                  </button>
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default ConnectionList;
