import React, { useState } from "react";
// import { FaPaypal } from "rzzeact-icons/fa";
import axios from "axios";
import "./RoomDetail.styles.css";

const RoomDetail = ({ room }) => {
  const [isBooking, setIsBooking] = useState(false);
  //   const [initialDate, setInitialDate] = useState("");
  //   const [finalDate, setFinalDate] = useState("");

  const handleBook = () => {
    setIsBooking(true);
    const bookingInfo = {
      roomId: room.id,
      user: localStorage.getItem("token"),
      //   room: room.id,
      price: room.price,
      //   initialDate: initialDate,
      //   finalDate: finalDate,
      dateInit: new Date(),
      dateFinal: new Date(),
    };

    console.log(bookingInfo);

    axios
      .post(
        `${import.meta.env.VITE_BACK_URL}/payment/create-order`,
        bookingInfo
      )
      .then((res) => {
        window.location.href = res.data.links[1].href;
      })
      .catch((error) => {
        console.error("Error creating order:", error);
      });
  };

  if (!room) {
    return null; //Al cerrar el modal ocurría un error porque se establece selectedRoom
  } //como null en la const closeModal (Detail.jsx). Esto arregla el error.

  return (
    //     <div className="room-table">
    //     <div className="room-detail">
    //         <div>
    //             <h3>Type </h3>
    //             <h3> {room.type}</h3>
    //         </div>
    //       <h3>Description {room.description}</h3>
    //       <p>Price: ${room.price}</p>
    //       {!isBooking ? (
    //         <button onClick={handleBook}>
    //           <i class="bi bi-paypal" onClick={handleBook} ></i> Book Now
    //         </button>
    //       ) : (
    //         <p>Processing payment...</p>
    //       )}
    // </div>
    // </div>
    <table className="table">
      <thead>
        <tr>
          <th scope="col">
            Type <i className="bi bi-door-open-fill"></i>
          </th>
          <th scope="col">Description</th>
          <th scope="col">Price</th>
          <th scope="col">Pay</th>
        </tr>
      </thead>
      <tbody>
        {/* {hotel.rooms.map((room) => ( */}
        <tr key={room.id}>
          <td style={{ width: "25%" }}>{room.type}</td>
          <td style={{ width: "50%" }}>{room.description}</td>
          <td style={{ width: "15%" }}>{room.price} $</td>
          <td style={{ width: "10%" }}>
            <i className="bi bi-paypal" onClick={handleBook}></i>
          </td>
        </tr>
        {/* ))} */}
      </tbody>
    </table>
  );
};

export default RoomDetail;
