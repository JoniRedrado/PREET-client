import axios from "axios";
import { useEffect, useState, Suspense } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./GestionRooms.modules.css"

const GestionRooms = () => {
  const { t } = useTranslation();

  const [roomsData, setRoomsData] = useState([]);
  const [roomsDelete, setRoomsDelete] = useState([]);
  const [showDeletedRooms, setShowDeletedRooms] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [totalPages, setTotalPages] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [typeInput, setTypeInput] = useState("");

  const roomsType = [
    "Estandar",
    "Superior",
    "Deluxe",
    "Junior Suite",
    "Suite Estandar",
    "Suite Presidencial",
  ];

  const getRooms = async () => {
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_BACK_URL
        }/rooms?type=${typeInput}&page=${currentPage}&size=${pageSize}`
      );
      if (Array.isArray(data.rooms)) {
        setRoomsData(data.rooms);
      } else {
        console.error("Data received is not an array:", data);
      }
      setTotalPages(Math.ceil(data.total / pageSize));
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteRooms = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACK_URL}/rooms/${id}`);
      getRooms();
    } catch (error) {
      console.error(error.message);
    }
  };

  const getRoomsDeleted = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACK_URL}/rooms/deleted`
      );
      setRoomsDelete(data.rooms);
    } catch (error) {
      console.error(error.message);
    }
  };

  const restoreRooms = async (id) => {
    try {
      await axios.put(`${import.meta.env.VITE_BACK_URL}/rooms/restore/${id}`);
      getRooms();
      getRoomsDeleted();
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

  const handleTypeInput = (event) => {
    setTypeInput(event.target.value);
  };

  const handleSearch = () => {
    getRooms({ type: typeInput });
  };

   useEffect(() => {
    if (!showDeletedRooms) {
      getRooms({});
    } else {
      getRoomsDeleted({});
    }
  }, [currentPage, pageSize, showDeletedRooms]);

  const handleShowDeletedRooms = () => {
    setShowDeletedRooms(!showDeletedRooms);
    setCurrentPage(1);
  };  

  const renderContent = () => {
    if (showDeletedRooms) {
      return (
        <table className="table3">
        <thead className="table-dark">
          <tr>
            <th>{t("validation.image")}</th>
            <th>{t("CreateRooms.numeration")}</th>
            <th>{t("CreateRooms.type")}</th>
            <th>{t("CreateRooms.description")}</th>
            <th>{t("CreateRooms.price")}</th>
            <th>{t("CreateRooms.guest")}</th>
            <th>{t("dashboard.hotelName")}</th>
            <th>{t("dashboard.action")}</th>
          </tr>
        </thead>
        <tbody>
          {roomsDelete.map((deletedRooms) => (
            <tr key={deletedRooms.id}>
              <td>
                <img
                  img
                  className="imagen-rooms"
                  src={deletedRooms.image[0].image}
                  alt={deletedRooms.type}
                />
              </td>
              <td>{deletedRooms.numeration}</td>
              <td>{deletedRooms.type}</td>
              <td>{deletedRooms.description}</td>
              <td>{deletedRooms.price}$</td>
              <td>{deletedRooms.guest}</td>
              <td>{deletedRooms.hotel && deletedRooms.hotel.name}</td>
              <td>
                <i
                  onClick={() => restoreRooms(deletedRooms.id)}
                  className="bi bi-arrow-counterclockwise"
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      )
    } else {
      return (
<table className="table3">
        <thead className="table-dark">
          <tr>
            <th>{t("validation.image")}</th>
            <th>{t("CreateRooms.numeration")}</th>
            <th>{t("CreateRooms.type")}</th>
            <th>{t("CreateRooms.description")}</th>
            <th>{t("CreateRooms.price")}</th>
            <th>{t("CreateRooms.guest")}</th>
            <th>{t("dashboard.hotelName")}</th>
            <th>{t("dashboard.action")}</th>
          </tr>
        </thead>
        <tbody>
          {roomsData &&
            roomsData.map((rooms) => (
              <tr key={rooms.id}>
                <td>
                  <img
                    className="imagen-rooms"
                    src={rooms.image[0].image}
                    alt={rooms.type}
                  />
                </td>
                <td>{rooms.numeration}</td>
                <td>{rooms.type}</td>
                <td>{rooms.description}</td>
                <td>{rooms.price}$</td>
                <td>{rooms.guest}</td>
                <td>{rooms.hotel && rooms.hotel.name}</td>
                <td>
                  <i
                    title="Delete"
                    onClick={() => deleteRooms(rooms.id)}
                    className="bi bi-dash-circle-fill"
                  ></i>
                </td>
                <td>
                  <Link to={`/updaterooms/${rooms.id}`}>
                    <i className="bi bi-pencil-square" title="Update"></i>
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      )
    }
  };
  return(
  <div className="table-container2">
    <div className="header">
      <div className="search-users">
        <select value={typeInput} onChange={handleTypeInput}>
          <option value="">{t("dashboard.selectType")}</option>
          {roomsType.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <button onClick={handleSearch} className="button-users">{t("dashboard.search")}</button>
      </div>
        <div className="btn-deleted-container">
        <button
        onClick={handleShowDeletedRooms}
        type="button"
        className="button-users2"
      >
        {showDeletedRooms ? t("dashboard.hideRooms") : t("dashboard.showRooms")}  
      </button>
        </div>
      </div>
      <div>
      {renderContent()}
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1} className="pagination-button">
          Prev
        </button>
        <span>{currentPage}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages} className="pagination-button">
          Next
        </button>
      </div>
      </div>
  </div>
)
}

export default GestionRooms;
