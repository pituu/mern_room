import React from "react";
import { Link } from "react-router-dom";
import logo from "./logo.png";
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init({ duration: 2000});
function Landingscreen() {
  return (
    <div className="">
      <div className="landing row justify-content-center text-center">
        <div className="col-md-9 my-auto" style={{borderRight:'8px solid brown'}}>
          <div data-aos="zoom-in"><img src={logo}/></div>
          <Link to="/home">
             <button className='btn btn-primary'>Get Started</button>
          </Link>
        </div>

        
        
      </div>
     
    </div> );
}

export default Landingscreen;
