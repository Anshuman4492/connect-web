import React, { useState } from "react";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addUser } from "../utils/userSlice";

const EditProile = ({ user }) => {
  if (!user) return;
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age || 0);
  const [gender, setGender] = useState(user.gender || "male");
  const [profileUrl, setProfileUrl] = useState(user.profileUrl);
  const [about, setAbout] = useState(user.about);
  const [skills, setSkills] = useState(user.skills);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [profileSavedMessage, setProfileSavedMessage] = useState("");
  const dispatch = useDispatch();

  const handleSaveProfile = async () => {
    setError("");
    try {
      const response = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          gender,
          profileUrl,
          about,
          skills,
        },
        { withCredentials: true }
      );
      dispatch(addUser(response?.data?.data));
      setProfileSavedMessage(response?.data?.message);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (error) {
      setError(error?.response?.data);
    }
  };

  return (
    <>
      <div className="flex justify-center mt-2 m x-5">
        <div className="flex justify-center mx-10">
          <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-5 rounded-box">
            <label className="fieldset-label">First Name</label>
            <input
              type="text"
              className="input"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <label className="fieldset-label">Last Name</label>
            <input
              type="text"
              className="input"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <label className="fieldset-label">Age</label>
            <input
              type="text"
              className="input"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <div className="flex justify-between">
              <label className="fieldset-label">Gender</label>
              <input
                type="radio"
                name="radio-6"
                className="radio radio-accent"
                defaultChecked
                onChange={(e) => {
                  setGender("male");
                }}
              />
              <span>Male</span>
              <input
                type="radio"
                name="radio-6"
                className="radio radio-accent"
                onChange={(e) => setGender("female")}
              />
              <span>Female</span>
              <input
                type="radio"
                name="radio-6"
                className="radio radio-accent"
                onChange={(e) => setGender("other")}
              />
              <span>Others</span>
            </div>
            <label className="fieldset-label">Profile Url</label>
            <input
              type="text"
              className="input"
              value={profileUrl}
              onChange={(e) => setProfileUrl(e.target.value)}
            />

            <label className="fieldset-label">About</label>
            <textarea
              className="textarea h-12"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            ></textarea>

            <label className="fieldset-label">Skills</label>
            <input
              type="text"
              className="input"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
            <span className="text -red-400">{error}</span>
            <button
              className="btn btn-primary mt-5"
              onClick={handleSaveProfile}
            >
              Save Profile
            </button>
          </fieldset>
        </div>
        <UserCard
          user={{ firstName, lastName, age, gender, about, profileUrl, skills }}
        />
      </div>
      {showToast && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-success">
            <span>{profileSavedMessage}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProile;
