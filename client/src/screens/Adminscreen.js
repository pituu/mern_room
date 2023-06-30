import React, { useEffect, useState } from "react";
import { Tabs, Tag } from "antd";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import swal from 'sweetalert';

const API_URL="https://golden-rooms.onrender.com";
function Adminscreen() {
  const items = [
    {
      key: "1",
      label: <h5>Booking</h5>,
      children: <Bookings />,
    },
    {
      key: "2",
      label: <h5>Rooms</h5>,
      children: <Rooms />,
    },
    {
      key: "3",
      label: <h5>Add Rooms</h5>,
      children: <Addroom />,
    },
    {
      key: "4",
      label: <h5>User</h5>,
      children: <Users />,
    },
  ];
  // console.log(JSON.parse(localStorage.getItem('currentUser')).data.isAdmin);
  if (!JSON.parse(localStorage.getItem("currentUser"))?.data.isAdmin)
    window.location.href = "/home";

  return (
    <div className="row justify-content-center">
      <div
        className="col-md-11 bs mt-5"
        style={{
          margin: "5px",
        }}
      >
        <Tabs defaultActiveKey="1" items={items} />
      </div>
    </div>
  );
}

export default Adminscreen;

export function Bookings() {
  const [bookings, setbookings] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  const call=async () => {
    try {
      setloading(true);
      const allbookings = (await axios.get(`${API_URL}/getallbookings`)).data;
      console.log(allbookings);
      setbookings(allbookings);
      setloading(false);
    } catch (error) {
      seterror(true);
      setloading(false);
    }
  };
  useEffect(() => {
    call();
    
  }, []);
  return (
    <div className="row">
      <div className="col-md-11 ">
        <h1>Bookings</h1>
        {loading ? (
          <Loader />
        ) : bookings.length ? (
          <table className="table table-bordered table-dark">
            <thead className="bs ">
              <tr className="bs">
                <th>Booking Id</th>
                <th>Userid</th>
                <th>Room</th>
                <th>From</th>
                <th>To</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => {
                return (
                  <tr className="bs">
                    <td>{booking._id}</td>
                    <td>{booking.userid}</td>
                    <td>{booking.room.name}</td>
                    <td>{booking.fromdate}</td>
                    <td>{booking.todate}</td>
                    <td>{booking.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <Error />
        )}
      </div>
    </div>
  );
}

export function Rooms() {
  const [rooms, setrooms] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  const call=async () => {
    try {
      setloading(true);
      const allrooms = (await axios.get(`${API_URL}/api/rooms/getallrooms`)).data;
      setrooms(allrooms);
      setloading(false);
    } catch (error) {
      seterror(true);
      setloading(false);
    }
  };
  useEffect(() => {
    call();
  }, []);
  return (
    <div className="row">
      <div className="col-md-11 ">
        <h1>Rooms</h1>
        {loading ? (
          <Loader />
        ) : rooms.length ? (
          <table className="table table-bordered table-dark">
            <thead className="bs ">
              <tr className="bs">
                <th>Room Id</th>
                <th>Name</th>
                <th>Type</th>
                <th>Rent Per day</th>
                <th>Max Count</th>
                <th>Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => {
                return (
                  <tr className="bs">
                    <td>{room._id}</td>
                    <td>{room.name}</td>
                    <td>{room.type}</td>
                    <td>{room.rentperday}</td>
                    <td>{room.maxcount}</td>
                    <td>{room.phonenumber}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <Error />
        )}
      </div>
    </div>
  );
}

export function Users() {
  const [users, setusers] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  const call=async () => {
    try {
      setloading(true);
      const allusers = (await axios.get(`${API_URL}/getallusers`)).data;
      setusers(allusers);
      setloading(false);
    } catch (error) {
      seterror(true);
      setloading(false);
    }
  };
  useEffect(() => {
    call();
  }, []);
  return (
    <div className="row">
      <div className="col-md-11 ">
        <h1>Users</h1>
        {loading ? (
          <Loader />
        ) : users.length ? (
          <table className="table table-bordered table-dark">
            <thead className="bs ">
              <tr className="bs">
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>isAdmin</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                return (
                  <tr className="bs">
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.isAdmin ? "YES" : "NO"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <Error />
        )}
      </div>
    </div>
  );
}

export function Addroom() {
  const [name, setname] = useState("");
  const [rentperday, setrentperday] = useState("");
  const [maxcount, setmaxcount] = useState("");
  const [description, setdescription] = useState("");
  const [phonenumber, setphonenumber] = useState("");
  const [imageURL1, setimageURL1] = useState("");
  const [imageURL2, setimageURL2] = useState("");
  const [imageURL3, setimageURL3] = useState("");
  const [type, settype] = useState("");
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  async function addroom() {
    const roomobj = {
      name,
      rentperday,
      maxcount,
      description,
      phonenumber,
      type,
      imageURL1,
      imageURL2,
      imageURL3,
    };
    try {
      setloading(true)
      const result = await axios.post(`${API_URL}/api/rooms/addroom`, roomobj);
      setloading(false)
      swal("Added", "Room has Successfully added", "success").then(result=>{window.location.href='/home'});

    } catch (error) {
      seterror(true)
      setloading(false)
    }
  }
  return (
    
    <div className="row ">
      {loading?(<Loader/>):
      error?(<Error/>):
      (<>
      <div className="col-md-5">
        <input
          className="form-control"
          value={name}
          onChange={(e) => {
            setname(e.target.value);
          }}
          placeholder="Name"
          type="text"
        />
        <input
          className="form-control"
          value={rentperday}
          onChange={(e) => {
            setrentperday(e.target.value);
          }}
          placeholder="Rentperday"
          type="text"
        />
        <input
          className="form-control"
          value={maxcount}
          onChange={(e) => {
            setmaxcount(e.target.value);
          }}
          placeholder="maxcount"
          type="text"
        />
        <input
          className="form-control"
          value={description}
          onChange={(e) => {
            setdescription(e.target.value);
          }}
          placeholder="description"
          type="text"
        />
        <input
          className="form-control"
          value={phonenumber}
          onChange={(e) => {
            setphonenumber(e.target.value);
          }}
          placeholder="phonenumber"
          type="text"
        />
      </div>

      <div className="col-md-5">
        <input
          type="text"
          className="form-control"
          value={imageURL1}
          onChange={(e) => {
            setimageURL1(e.target.value);
          }}
          placeholder="imageURL1"
        />
        <input
          type="text"
          className="form-control"
          value={imageURL2}
          onChange={(e) => {
            setimageURL2(e.target.value);
          }}
          placeholder="imageURL2"
        />
        <input
          type="text"
          className="form-control"
          value={imageURL3}
          onChange={(e) => {
            setimageURL3(e.target.value);
          }}
          placeholder="imageURL3"
        />
        <input
          type="text"
          className="form-control"
          value={type}
          onChange={(e) => {
            settype(e.target.value);
          }}
          placeholder="Type"
        />
        <div className="text-right mt-3">
          <button className="btn btn-primary buttn" onClick={addroom}>
            Add
          </button>
        </div>
      </div></>)}
    </div>
  );
}
