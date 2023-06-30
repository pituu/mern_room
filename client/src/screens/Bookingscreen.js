import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from "moment";
import useRazorpay from "react-razorpay";
import Swal from 'sweetalert'
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
const API_URL="https://golden-rooms.onrender.com";

AOS.init({ duration: 400}); 
function Bookingscreen() {
  let params = useParams();
  const Razorpay = useRazorpay();

  const fromdate=moment(params.fromdate , 'DD-MM-YYYY')
    const todate=moment(params.todate,'DD-MM-YYYY')
    const totalDays = moment.duration(todate.diff(fromdate)).asDays()+1
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();
  const [room, setroom] = useState();
  const call=async () => {
    try {
      setloading(true);
      const data = (
        await axios.post(`${API_URL}/api/rooms/getroombyid`, { roomid: params.roomid })
      ).data;
      setroom(data);
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
  async function booking(){
    const userbooking={
      room,
      roomid:params.roomid,
      userid:JSON.parse(localStorage.getItem("currentUser")).data._id,
      fromdate:params.fromdate,
      todate:params.todate,
      totalDays,
      totalAmount:totalDays*room.rentperday
    }
    try {

      const book=(await axios.post(`${API_URL}/bookroom`,{userbooking})).data;
      console.log(book);
      const options = {
        key: book.key_id, // Enter the Key ID generated from the Dashboard
        amount: book.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Golden Rooms",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: book.order_id, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
        handler: async function (response) {
          try {
            setloading(true);
            const savebook=(await axios.post(`${API_URL}/savebooking`,{room,
              roomid:params.roomid,
              userid:JSON.parse(localStorage.getItem("currentUser")).data._id,
              fromdate:params.fromdate,
              todate:params.todate,
              totalDays,
              totalAmount:totalDays*room.rentperday,paymentid:response.razorpay_payment_id,
              orderid:response.razorpay_order_id,
              signature:response.razorpay_signature})).data;
              setloading(false)
            Swal('Congrats' , 'Your Room has booked succeessfully' , 'success').then(result=>{
                window.location.href='/profile';});
          } catch (error) {
            console.log(error);
            setloading(false)
            Swal('Oops' , 'Something went wrong , please try later' , 'error')
          }
          
        },
        prefill: {
          name: "",
          email: "",
          contact: "",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
    
      const rzp1 = new Razorpay(options);
    
      rzp1.on("payment.failed", function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });
    
      rzp1.open();
    } catch (error) {
      console.log(error)
    }
  }
  if (!JSON.parse(localStorage.getItem("currentUser")))
  window.location.href = '/login';
  return (
    <div className="container" data-aos="flip-left">
      <div className="row justify-content-center mt-5">
        {loading ? (
          <Loader/>
        ):room?(
          <div className=" row bs">
            <div className="col-md-6">
              <h4>{room.name}</h4>
              <img src={room.imageurls[0]} className="w-100 bigimg"/>
            </div>
            <div className="col-md-6" style={{textAlign:'right'}}>
              <b>
              <h4>Booking Details</h4>
              
              <hr/>
              <p>Name : {JSON.parse(localStorage.getItem("currentUser")).data.name} </p>
              <p>From Date :{params.fromdate} </p>
              <p>To Date : {params.todate}</p>
              <p>Maxcount : {room.maxcount}</p>
              <h4>Amount</h4>
              <hr/>
              <p>Total Days :{totalDays} </p>
              <p>Rent per Day :{room.rentperday} </p>
              <p>Amount : {totalDays*room.rentperday}</p>
              <hr/>
              </b>
              <button className='btn-btn-primary buttn m-2' onClick={booking}>Pay Now</button>
              
            </div>
          </div>
        ):<Error/>}
      </div>
    </div>
  );
}

export default Bookingscreen;
