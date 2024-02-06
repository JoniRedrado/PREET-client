import React, { useState } from "react";
import { FaPaypal } from "react-icons/fa";
import axios from "axios";
import "./RoomDetail.styles.css"

const RoomDetail = ({ room }) => {
  const [isBooking, setIsBooking] = useState(false);
//   const [initialDate, setInitialDate] = useState("");
//   const [finalDate, setFinalDate] = useState("");

  const handleBook = () => {
    setIsBooking(true);
    const bookingInfo = {
      user: localStorage.getItem("token"),
    //   room: room.id,
      price: room.price,
    //   initialDate: initialDate,
    //   finalDate: finalDate,
      initialDate: new Date(),
      finalDate: new Date(),
    };



    console.log(bookingInfo)

    axios.post("http://localhost:3001/payment/create-order", bookingInfo)
    .then((res) => {
      window.location.href = res.data.links[1].href;
    })
    .catch((error) => {
        console.error("Error creating order:", error);
      });
  };

  return (
    <div className="room-table">
    <div className="room-detail">
      <h3>Type {room.type}</h3>
      <h3>Description {room.description}</h3>
      <p>Price: ${room.price}</p>
      {/* <label htmlFor="initialDate">Initial Date:</label>
      <input type="date" id="initialDate" value={initialDate} onChange={(e) => setInitialDate(e.target.value)} />
      <label htmlFor="finalDate">Final Date:</label>
      <input type="date" id="finalDate" value={finalDate} onChange={(e) => setFinalDate(e.target.value)} /> */}
      {!isBooking ? (
        <button onClick={handleBook}>
          <i class="bi bi-paypal" onClick={handleBook} ></i> Book Now
        </button>
      ) : (
        <p>Processing payment...</p>
      )}
    </div>
    </div>
  );
};

export default RoomDetail;


