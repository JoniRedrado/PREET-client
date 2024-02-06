import React from 'react'
import { useEffect } from 'react'
import { useLocation } from "react-router-dom";
import axios from 'axios'
import './BookedSuccesfully.styles.css'



const BookedSuccesfully = () => {
    //Paypal te devuelve a tu app con un token por params, enviamos ese token al back para que confirme que la reserva fue pagada
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    useEffect(() => {
        axios.get(`http://localhost:3001/payment/capture-order?token=${token}`)
            .then(res=>{
                console.log(res.data);
            })
    })

  return (
    <div className="main-booked-container">
      <i className='bi bi-calendar2-check' title='booked-success'></i>
      <h1>¡Your room has been successfully booked!</h1>
      <button onClick={() => (window.location.href = "/")}>Return Home</button>
    </div>
  );
}

export default BookedSuccesfully