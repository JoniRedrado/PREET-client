import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./GestionHotels.modules.css";

const GestionHotels = () => {
  const [hotelsData, setHotelsData] = useState([]);
  const [hotelDelete, setHotelDelete] = useState([]);
  const [showDeletedHotels, setShowDeletedHotels] = useState(false);

  const getHotels = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BACK_URL}/hotels?size=30`);
      console.log(data);
      setHotelsData(data.Hotel);
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteHotel = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACK_URL}/hotels/${id}`);
      getHotels();
    } catch (error) {
      console.error(error.message);
    }
  };

  const getHotelsDeleted = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BACK_URL}/hotels/deleted`);
      console.log(data);
      setHotelDelete(data.hotels || []);
    } catch (error) {
      console.error(error.message);
    }
  };

  const restoreHotel = async (id) => {
    try {
      await axios.put(`${import.meta.env.VITE_BACK_URL}/hotels/restore/${id}`);
      getHotels(); 
      getHotelsDeleted();
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getHotels();
  }, []);

  const handleShowDeletedHotels = () => {
    setShowDeletedHotels(!showDeletedHotels);
    if (!showDeletedHotels) {
      getHotelsDeleted();
    }
  };

  return (
    <>
      <Link to={"/dashboard"}>
        <button>
          return dashboard
        </button>
      </Link>
      <button onClick={handleShowDeletedHotels}>
        {showDeletedHotels ? "Hide Deleted Hotels" : "Show Deleted Hotels"}
      </button>
      {showDeletedHotels && (
        <table>
          <thead className="encabezado">
            <tr>
              <th>Name</th>
              <th>Stars</th>
              <th>Country</th>
              <th>Restore</th>
            </tr>
          </thead>
          <tbody>
            {hotelDelete.map((deletedHotel) => (
              <tr key={deletedHotel.id}>
                <td>{deletedHotel.name}</td>
                <td>{deletedHotel.stars}</td>
                <td>{deletedHotel.country && deletedHotel.country.name}</td>
                <td>
                  <button onClick={() => restoreHotel(deletedHotel.id)}>Restore</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <table>
        <thead className="encabezado">
          <tr>
            <th>Name</th>
            <th>Stars</th>
            <th>Country</th>
            <th>Delete</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {hotelsData && hotelsData.map((hotel) => (
            <tr key={hotel.id}>
              <td>{hotel.name}</td>
              <td>{hotel.stars}</td>
              <td>{hotel.country.name}</td>
              <td>
                <button className="deleteButton" onClick={() => deleteHotel(hotel.id)}>
                  <i className="bi bi-trash" title="Delete"></i>
                </button>
              </td>
              <td>
                <Link to={`/update/${hotel.id}`}>
                  <button>
                    <i className="bi bi-pencil-square" title="Update"></i>
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default GestionHotels;