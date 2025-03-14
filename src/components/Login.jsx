import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
const Login = () => {
  const [email, setEmail] = useState("aman@gmail.com");
  const [password, setPassword] = useState("Aman@123");
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
      console.log(`Error while logging in: ${error}`);
    }
  };

  return (
    <div className="flex justify-center my-10 p-5">
      <div className="card card-dash bg-base-100 w-96">
        <div className="card-body">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email Id: {email}</legend>
            <input
              type="email"
              className="input input-neutral"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <legend className="fieldset-legend">Password</legend>
            <input
              type="password"
              className="input input-neutral"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>
          <div className="card-actions flex justify-center ">
            <button className="btn btn-success w-full" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
