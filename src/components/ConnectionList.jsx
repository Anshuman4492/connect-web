import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";

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
                <button className="btn btn-square btn-ghost">
                  <svg
                    className="size-[1.2em]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M6 3L20 12 6 21 6 3z"></path>
                    </g>
                  </svg>
                </button>
                <button className="btn btn-square btn-ghost">
                  <svg
                    className="size-[1.2em]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                    </g>
                  </svg>
                </button>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default ConnectionList;
