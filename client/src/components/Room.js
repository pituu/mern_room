import { useState } from "react";
import React  from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import  { Link } from 'react-router-dom'; 
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init({ duration: 400}); 
function Room({room,fromdate,todate}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className='row bs'data-aos="fade"  >
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Carousel>
          {room.imageurls.map(image=>{
               return <Carousel.Item>
                <img
                  className="d-block w-100 bigimg"
                  src={image}
                  
                />
                
              </Carousel.Item>
          })}
      
      
    </Carousel>
    <br></br>
    <p>{room.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>
      <div className='col-md-4'>
        {console.log(room)}
        <img src={room.imageurls[0]} className='smallimg'/>
      </div>
      <div className='col-md-7 '>
        <h4>{room.name}</h4>
        <b><p>Maxcount : {room.maxcount}</p>
        <p>Phone Number : {room.phonenumber}</p>
        <p>Type : {room.type}</p></b>
        {(fromdate && todate)&&( <Link to={`/book/${room._id}/${fromdate}/${todate}`}>
        <button className='btn-btn-primary buttn m-2' onClick={handleShow} id="book-btn">Book Now</button>

        </Link>)}
        <button className='btn-btn-primary buttn m-2' onClick={handleShow}>view details</button>
        </div>
    </div>
  )
}

export default Room
