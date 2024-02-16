import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBarDashboard from "../NavBarDashboard/NavBarDashboard";
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
          <NavBarDashboard/>
      <Link to={"/dashboard"}>
        <i class="bi bi-arrow-left-circle"></i>
      </Link>
      <button onClick={handleShowDeletedHotels} type="button" class="btn btn-primary btn-lg">
        {showDeletedHotels ? "Hide Deleted Hotels" : "Show Deleted Hotels"}
      </button>
      {showDeletedHotels && (
        <table className="table">
          <thead className="table-dark">
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
                  <i  onClick={() => restoreHotel(deletedHotel.id)} class="bi bi-arrow-counterclockwise"></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <table className="table">
        <thead className="table-dark">
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
                  <i title="Delete" onClick={() => deleteHotel(hotel.id)} class="bi bi-dash-circle-fill"></i>

              </td>
              <td>
                <Link to={`/update/${hotel.id}`}>
                    <i className="bi bi-pencil-square" title="Update"></i>
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