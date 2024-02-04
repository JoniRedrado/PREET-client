import React from 'react'
import { useEffect } from 'react'
import { useLocation } from "react-router-dom";
import axios from 'axios'



const BookedSuccesfully = () => {
    
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
    <div>
      <h1>Booked Succesfully</h1>
      <button onClick={() => window.location.href = "/"}>Return Home</button>
    </div>
  )
}

export default BookedSuccesfully