import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import NavBarDashboard from "../NavBarDashboard/NavBarDashboard";
import "./GestionHotels.modules.css";

const GestionHotels = () => {

  const [hotelsData, setHotelsData] = useState([]);
  const [hotelDelete, setHotelDelete] = useState([]);
  const [showDeletedHotels, setShowDeletedHotels] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [totalPages, setTotalPages] = useState(0);
  const [searchInput, setSearchInput] = useState('');

  const getHotels = async (query) => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BACK_URL}/hotels/all`,{
        params: { 
          ...query, 
          pagination:true , 
          page: currentPage, 
          size: pageSize }
      });
      console.log(data);
      setHotelsData(data.rows);
      setTotalPages(Math.ceil(data.count / pageSize));
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

  const getHotelsDeleted = async (query) => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BACK_URL}/hotels/deleted`, {
        params: { ...query, page: currentPage, size: pageSize, pagination: true }
      });
      setHotelDelete(data.hotels);
      setTotalPages(Math.ceil(data.total / pageSize));
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
  
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearchInput = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearch = () => {
    getHotels({ name: searchInput });
  };

  useEffect(() => {
    getHotels({});
  }, [currentPage, pageSize]);

  const handleShowDeletedHotels = () => {
    setShowDeletedHotels(!showDeletedHotels);
    if (!showDeletedHotels) {
      getHotelsDeleted();
    }
  };

  return (
    <>
      <div className=".search-dashboard">
        {/* <NavBarDashboard/> */}
        <div>
        <input
          type="text"
          placeholder="name"
          onChange={handleSearchInput}
          name='name'
          value={searchInput}
        />
        <button onClick={handleSearch}>Search</button>
        </div>

      </div>
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
              <th>Image</th>
              <th>Name</th>
              <th>Stars</th>
              <th>Country</th>
              <th>Restore</th>
            </tr>
          </thead>
          <tbody>
            {hotelDelete.map((deletedHotel) => (
              <tr key={deletedHotel.id}>
                <td><img className="imagen-hotel" src={deletedHotel.image[0].image} alt={deletedHotel.type}/></td>
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
            <th>Image</th>
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
              <td><img  className="imagen-hotel" src={hotel.image[0].image} alt={hotel.name}/></td>
              <td>{hotel.name}</td>
              <td>{hotel.stars}</td>
              <td>{hotel.country && hotel.country.name}</td>
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
      <div>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>{currentPage}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </>
  );
};

export default GestionHotels;