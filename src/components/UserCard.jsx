import React from "react";

const UserCard = ({ user }) => {
  const { firstName, lastName, age, gender, about, profileUrl } = user;
  return (
    <div>
      <div className="card bg-base-300 w-96 shadow-sm">
        <figure className="px-10 pt-10">
          <img src={profileUrl} alt="Shoes" className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
          <p>
            {age}
            {gender}
          </p>
          <p>{about}</p>
          <div className="card-actions">
            <button className="btn btn-primary">Ignore</button>
            <button className="btn btn-secondary">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
