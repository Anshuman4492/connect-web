import React from "react";
import EditProile from "./EditProile";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((store) => store.user);
  return (
    <div>
      <EditProile user={user} />
    </div>
  );
};

export default Profile;
