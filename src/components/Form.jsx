import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
const Form = () => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState("aman@gmail.com");
  const [password, setPassword] = useState("Aman@123");
  const [isLoggedInForm, setIsLoggedInForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const response = await axios.post(
        BASE_URL + "/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(response?.data?.data));
      navigate("/");
    } catch (error) {
      setError(error.response.data);
    }
  };
  const handleSignUp = async () => {
    try {
      const response = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          email,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(response?.data?.data));
      await handleLogin();
      navigate("/profile");
    } catch (error) {
      setError(error.response.data);
    }
  };
  return (
    <div className="flex justify-center my-10 p-5">
      <div className="card card-dash bg-base-100 w-96">
        <div className="card-body">
          <fieldset className="fieldset">
            {!isLoggedInForm && (
              <>
                <legend className="fieldset-legend">First Name:</legend>
                <input
                  type="text"
                  className="input input-neutral"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <legend className="fieldset-legend">Last Name: </legend>
                <input
                  type="text"
                  className="input input-neutral"
                  placeholder="last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </>
            )}
            <legend className="fieldset-legend">Email Id: </legend>
            <input
              type="email"
              className="input input-neutral"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <legend className="fieldset-legend">Password:</legend>
            <input
              type="password"
              className="input input-neutral"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>
          <p className="text-red-500">{error}</p>
          <div className="card-actions flex justify-center ">
            <button
              className="btn btn-success w-full"
              onClick={isLoggedInForm ? handleLogin : handleSignUp}
            >
              {isLoggedInForm ? "Login" : "Signup"}
            </button>

            {isLoggedInForm ? (
              <p>
                New User? Click Here to{" "}
                <span
                  onClick={() => setIsLoggedInForm(!isLoggedInForm)}
                  className="cursor-pointer text-blue-400"
                >
                  SignUp
                </span>
              </p>
            ) : (
              <>
                Existing User?{" "}
                <span
                  onClick={() => {
                    setIsLoggedInForm(!isLoggedInForm);
                    navigate("/signup");
                  }}
                  className="cursor-pointer text-blue-400"
                >
                  Login
                </span>{" "}
                here.
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
