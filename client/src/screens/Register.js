import { useState } from "react";
import React from "react";
import axios from "axios";
import Error from "../components/Error";
import Success from "../components/Success";
import Loader from "../components/Loader";
import swal from 'sweetalert'
const API_URL="https://golden-rooms.onrender.com";

function Register() {
  const [name, setName] = useState();
  const [email, setemail] = useState();
  const [password, setpass] = useState();
  const [cpass, setcpass] = useState();
  const [loading, setloading] = useState();
  const [error, seterror] = useState();
  const [Succ, setsuccess] = useState();
  async function register() {
    var user = {};
    if (password === cpass) {
      user = {
        name: name,
        email: email,
        password: password,
      };

    } else {
      console.log("error");
      setloading(false);
      seterror(true);
    }
    try {
      setloading(true);
      const result = await axios.post(`${API_URL}/getuser`, {email});
      if(result.length){
        swal("ooh","User already exist","error").then(result=>{window.location.href=`${API_URL}/register`});;
      }
      else{
      await axios.post(`${API_URL}/register`, { user });
      setsuccess(true);
      setName('');
      setemail('');
      setpass('');
      setcpass('')
      setloading(false);}
    } catch (error) {
      setloading(false);
      seterror(true);
    }
  }
  return (
    <div>
      {loading && <Loader />}
      {error && <Error />}
      
      <div className="row justify-content-center">
        <div className="col-md-5 " style={{ margin: "50px" }}>
        {Succ && <Success message='Registration Success' />}
          <div className="bs">
          <h2 style={{ fontWeight: "bold", textAlign: "center" }}>Register</h2>
          <input
            type="text"
            className="form-control"
            value={name}
            placeholder="Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
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
          <input
            type="password"
            className="form-control"
            value={cpass}
            placeholder="Confirm Password"
            onChange={(e) => {
              setcpass(e.target.value);
            }}
          />
          <button className="btn btn-primary  m-2" onClick={register}>
            Register
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
