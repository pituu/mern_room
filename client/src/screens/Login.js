import { useState } from "react";
import React from "react";
import axios from "axios";
import Error from "../components/Error";
import Loader from "../components/Loader";
const API_URL="https://golden-rooms.onrender.com";

function Login() {
  const [loading, setloading] = useState();
  const [error, seterror] = useState();
  const [email, setemail] = useState();
  const [password, setpass] = useState();
  async function login() {
    const user = {
      email: email,
      password: password,
    };

    try {
      setloading(true);
      const result = await axios.post(`${API_URL}/login`, { user });
      localStorage.setItem("currentUser", JSON.stringify(result));
     if(result.data) window.location.href = "/home";
     else{
      setloading(false);
      seterror(true);
     }
    } catch (error) {
      seterror(true);
      setloading(false);
    }
  }
  return (
    <div>
      {loading && <Loader />}
      {error && <Error />}
      <div className="row justify-content-center">
        <div className="col-md-5" style={{ margin: "50px" }}>
          <div className="bs">
          <h2 style={{ fontWeight: "bold", textAlign: "center" }}>Login</h2>
          <input
            type="text"
            className="form-control"
            value={email}
            placeholder="Email"
            onChange={(e) => {
              setemail(e.target.value);
            }}
          />
          <input
            type="password"
            className="form-control"
            value={password}
            placeholder="Password"
            onChange={(e) => {
              setpass(e.target.value);
            }}
          />
          <button className="btn btn-primary m-2" onClick={login}>
            Login
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
