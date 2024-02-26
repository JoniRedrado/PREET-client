import axios from "axios";
import { useEffect, useState } from "react";
import { setHotelId } from "../../../redux/actions";
import { useDispatch } from "react-redux";
import { IoArrowBackCircle, IoArrowForwardCircle } from "react-icons/io5";
import "./GestionHotels.modules.css";
import UpdatePage from "../../../Pages/Update/UpdatePage";

const GestionHotels = () => {
  const dispatch = useDispatch();

  const [hotelsData, setHotelsData] = useState([]);
  const [hotelDelete, setHotelDelete] = useState([]);
  const [showDeletedHotels, setShowDeletedHotels] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [totalPages, setTotalPages] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  const [hotelEditable, setHotelEditable] = useState(false);

  const getHotels = async (query) => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BACK_URL}/hotels`,{
        params: { ...query, page: currentPage, size: pageSize }
      });
      setHotelsData(data.Hotel);
      setTotalPages(Math.ceil(data.total / pageSize));
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
        params: { ...query, page: currentPage, size: pageSize }
      });
      setHotelDelete(data.hotels || []);
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

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  const handleSearchInput = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearch = () => {
    getHotels({ name: searchInput });
  };

  useEffect(() => {
    if (!showDeletedHotels) {
      getHotels({});
    } else {
      getHotelsDeleted({});
    }
  }, [currentPage, pageSize, showDeletedHotels]);

  const handleShowDeletedHotels = () => {
    setShowDeletedHotels(!showDeletedHotels);
    setCurrentPage(1);
  };

  const handleHotelToEdit = (id) => {
    dispatch(setHotelId(id));
    setHotelEditable(true)
  };

  const handleHotelEditBack = () => {
    setHotelEditable(false);
  };

  const renderTables = () => {
    if (hotelEditable) {
      return (
        <div className="main-editable-hotel">
          <IoArrowBackCircle className="back-icon" onClick={handleHotelEditBack}/>
          <UpdatePage/>
        </div>
      );
    } else if (showDeletedHotels && !hotelEditable){
      return (
        <div className="main-container3">
          <div className="search-dashboard">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search hotel"
                onChange={handleSearchInput}
                name='name'
                value={searchInput}
                className="search-input"
              />
              <button onClick={handleSearch} className="search-button">Search</button>
            </div>
            <div className="btn-deleted-container">
              <button onClick={handleShowDeletedHotels} className="button1">
                {showDeletedHotels ? "Hide Deleted Hotels" : "Show Deleted Hotels"}
              </button>
            </div>
          </div>
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
                    <i  onClick={() => restoreHotel(deletedHotel.id)} className="bi bi-arrow-counterclockwise"></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <button onClick={handleFirstPage} disabled={currentPage === 1} className="pagination-button">
              &#8810; First
            </button>
            <button onClick={handlePreviousPage} disabled={currentPage === 1} className="pagination-button">
              &#60; Prev
            </button>
            <span>{currentPage}</span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages} className="pagination-button">
              Next &#62;
            </button>
            <button onClick={handleLastPage} disabled={currentPage === totalPages} className="pagination-button">
              Last &#8811;
            </button>
          </div>
        </div>
      );
    } else if (!showDeletedHotels && !hotelEditable){
      return (
        <div className="main-container3">
          <div className="search-dashboard">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search hotel"
                onChange={handleSearchInput}
                name='name'
                value={searchInput}
                className="search-input"
              />
              <button onClick={handleSearch} className="search-button">Search</button>
            </div>
            <div className="btn-deleted-container">
              <button onClick={handleShowDeletedHotels} className="button1">
                {showDeletedHotels ? "Hide Deleted Hotels" : "Show Deleted Hotels"}
              </button>
            </div>
          </div>
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
                  <td><img className="imagen-hotel" src={hotel.image} alt={hotel.type}/></td>
                  <td>{hotel.name}</td>
                  <td>{hotel.stars}</td>
                  <td>{hotel.country.name}</td>
                  <td>
                    <i 
                      title="Delete" 
                      onClick={() => deleteHotel(hotel.id)} 
                      className="bi bi-dash-circle-fill" 
                      style={{ cursor: "pointer", color:"rgb(199, 19, 19)" }}/>
                  </td>
                  <td>
                    <i 
                      className="bi bi-pencil-square" 
                      title="Update" 
                      onClick={() => handleHotelToEdit(hotel.id)}
                      style={{ cursor: "pointer" }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <button onClick={handleFirstPage} disabled={currentPage === 1} className="pagination-button">
              &#8810; First
            </button>
            <button onClick={handlePreviousPage} disabled={currentPage === 1} className="pagination-button">
              &#60; Prev
            </button>
            <span>{currentPage}</span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages} className="pagination-button">
              Next &#62;
            </button>
            <button onClick={handleLastPage} disabled={currentPage === totalPages} className="pagination-button">
              Last &#8811;
            </button>
          </div>
        </div>
      );
    }
  };

  return (
    <>
      {renderTables()}
    </>
  );
};

export default GestionHotels;