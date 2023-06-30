import React, { useEffect, useState } from "react";
import axios from "axios";
import Room from "../components/Room";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { DatePicker, Space } from "antd";
import moment from "moment";
const API_URL="https://golden-rooms.onrender.com";

const { RangePicker } = DatePicker;
function Homescreen() {
  const [rooms, setrooms] = useState([]);
  const [loading, setloading] = useState();
  const [error, seterror] = useState();
  const [fromdate, setfromdate] = useState("");
  const [todate, settodate] = useState("");
  const [duplicatehotes, setduplicatehotes] = useState([]);
  const [searchkey, setsearchkey] = useState('')
  const[type , settype]=useState('all')
  const call=async () => {
    try {
      setloading(true);
      const data = (await axios.get(`${API_URL}/api/rooms/getallrooms`)).data;
      setrooms(data);
      setduplicatehotes(data);
      setloading(false);
    } catch (error) {
      seterror(true);
      console.log(error);
      setloading(false);
    }
  };
  useEffect(() => {
    call();
  }, []);
  function filterByDate(dates) {
    console.log(dates[0].$d);
    setfromdate(moment(dates[0].$d).format("DD-MM-YYYY"));
    settodate(moment(dates[1].$d).format("DD-MM-YYYY"));
    console.log(fromdate + todate);
    var temp = [];
    for (var room of duplicatehotes) {
      var availability = false;

      for (var booking of room.currentbookings) {
        if (
          !moment(moment(dates[0].$d).format("DD-MM-YYYY")).isBetween(
            booking.fromdate,
            booking.todate
          ) &&
          !moment(moment(dates[1].$d).format("DD-MM-YYYY")).isBetween(
            booking.fromdate,
            booking.todate
          )
        ) {
          if (
            moment(dates[0].$d).format("DD-MM-YYYY") !== booking.fromdate &&
            moment(dates[0].$d).format("DD-MM-YYYY") !== booking.todate &&
            moment(dates[1].$d).format("DD-MM-YYYY") !== booking.fromdate &&
            moment(dates[1].$d).format("DD-MM-YYYY") !== booking.todate
          ) {
            availability = true;
          }
        }
      }
      if (availability || room.currentbookings.length == 0) {
        console.log(rooms);
        temp.push(room);
      }
      setrooms(temp);
    }
  }
  function filterBySearch()
  {
    const dupdate = duplicatehotes.filter(room=>room.name.toLowerCase().includes(searchkey))
    setrooms(dupdate)
  }

  function filterByType(e)
  {
    settype(e)
    if(e!=='all'){
      const dupdate = duplicatehotes.filter(room=>room.type.toLowerCase()==e.toLowerCase())
      setrooms(dupdate)
    }
    else{
      setrooms(duplicatehotes)
    }
   
  }
  return (
    <div className="container">
      <div >
      <div className="row bs">
        <div className="col-md-4">
          <RangePicker
            onChange={filterByDate}
            format="DD-MM-YYYY"
            className="m-2"
          />
        </div>
        <div className="col-md-4">
            <input
              type="text"
              className="form-control i2 m-2 search"
              placeholder='Search Rooms'
              value={searchkey}
              onKeyUp={filterBySearch}
              onChange={(e)=>{setsearchkey(e.target.value)}}
            />
          </div>
          <div className="col-md-4">
            <select className="form-control m-2"
             value={type} 
             onChange={(e)=>{filterByType(e.target.value)}}
              >

            <option value="all">All</option>
              <option value="deluxe">Deluxe</option>
              <option value="non deluxe">Non Deluxe</option>
              
            </select>
          </div>
      </div>
      </div>

      <div className="row justify-content-center mt-5">
        {loading ? (
          <Loader />
        ) : rooms ? (
          rooms.map((room) => {
            return (
              <div className="col-nd-9 mt-4">
                <Room room={room} fromdate={fromdate} todate={todate} />
              </div>
            );
          })
        ) : (
          <Error />
        )}
      </div>
    </div>
  );
}

export default Homescreen;
