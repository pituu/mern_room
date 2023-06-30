import React, { useEffect,useState } from 'react';
import { Tabs,Tag } from 'antd';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
const API_URL="https://golden-rooms.onrender.com";

const user = JSON.parse(localStorage.getItem('currentUser'))?.data
function Profilescreen() {
    const items = [
        {
          key: '1',
          label: <h5>Profile</h5>,
          children: <div className="row">
          <div className=" ml-6 col-md-6 bs m-2 p-3">
          <h3>Name : {user.name}</h3>
         <h3>Email : {user.email}</h3>
         <h3>Admin Access : {user.isAdmin ? "Yes" : "No"}</h3>
         
          </div>
        </div>,
        },
        {
          key: '2',
          label: <h5>Booking</h5>,
          children: 
          <MyOrders />
        ,
        }
        
      ];
  return (
    <div className="m-5 profilediv">
      <Tabs defaultActiveKey="1" items={items}  />
    </div>
  )
}

export default Profilescreen

export function MyOrders() {
  const [mybookings, setmybookings] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  const [success, setsuccess] = useState(false);
  const call=async()=>{
    try {
      setloading(true);
      const bookings=(await axios.post(`${API_URL}/getuserbookings`, { id: user._id })).data;
      setmybookings(bookings);
      console.log(mybookings)
      setloading(false);
    } catch (error) {
      seterror(true);
      setloading(false);
    }
  }
  useEffect(()=>{
    call();
  },[]);
  async function cancelBooking(bookingid , roomid)
  {
      try {
        setloading(true);
        await axios.post(`${API_URL}/cancelbooking`,{bookingid,roomid});
        setloading(false);
        window.location.reload();
      } catch (error) {
        seterror(true);
        setloading(false);
      }
  }
  return (
    <div>
    {loading ? (
      <Loader />
    ) :  (
      mybookings.map((booking) => {
        return <div className="row" >
        <div className=" bs col-md-6 my-auto">
          <div className='m-1 p-2'>
            <h4>{booking.room.name}</h4>
            <p>BookingId : {booking._id}</p>
            <p>TransactionId : {booking.transactionId}</p>
            <p><b>Check In : </b>{booking.fromdate}</p>
            <p><b>Check Out : </b>{booking.todate}</p>
            <p><b>Amount : </b> {booking.totalAmount}</p>
            <p><b>Status</b> : {booking.status =='booked' ? (<Tag color="green">Confirmed</Tag>) : (<Tag color="red">Cancelled</Tag>)}</p>
            <div className='text-right'>
            {booking.status=='booked' && (<button className='btn btn-primary m-3 buttn' onClick={()=>cancelBooking(booking._id , booking.roomid)}>Cancel Booking</button>)}
            </div>
          </div>
        </div>
      </div>
      })
    )}
  </div>
  )
}

