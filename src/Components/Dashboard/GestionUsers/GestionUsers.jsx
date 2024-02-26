import axios from "axios";
import { useEffect, useState, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { IoMdSkipBackward } from "react-icons/io";
import { IoMdSkipForward } from "react-icons/io";
import { IoCaretBackSharp } from "react-icons/io5";
import { IoCaretForwardSharp } from "react-icons/io5";
import "./GestionUsers.modules.css";

const GestionUsers = () => {
  const { t } = useTranslation();

  const [usersData, setUsersData] = useState([]);
  const [usersDelete, setUsersDelete] = useState([]);
  const [showDeletedUsers, setShowDeletedUsers] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [totalPages, setTotalPages] = useState(0);
  const [searchInput, setSearchInput] = useState("");

  const getUsers = async (query) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACK_URL}/users`,
        {
          params: { ...query, page: currentPage, size: pageSize },
        }
      );
      if (Array.isArray(data.users)) {
        setUsersData(data.users);
      } else {
        console.error("Data received is not an array:", data);
      }
      setTotalPages(Math.ceil(data.total / pageSize));
    } catch (error) {
      console.error(error.message);
    }
  };

  const getUsersDeleted = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACK_URL}/users/deleted`
      );
      setUsersDelete(data.users);
    } catch (error) {
      console.error(error.message);
    }
  };

  const restoreUser = async (id) => {
    try {
      await axios.put(`${import.meta.env.VITE_BACK_URL}/users/restore/${id}`);
      getUsers();
      getUsersDeleted();
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACK_URL}/users/${id}`);
      getUsers();
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
    getUsers({ name: searchInput });
  };

  const handleShowDeletedUsers = () => {
    setShowDeletedUsers(!showDeletedUsers);
    setCurrentPage(1);
  };
  useEffect(() => {
    if (showDeletedUsers) {
      getUsersDeleted();
    } else {
      getUsers({});
    }
  }, [currentPage, pageSize, showDeletedUsers]);

  const renderContent = () => {
    if (showDeletedUsers){
      return (
        <table className="table2">
        <thead className="table-dark">
          <tr>
            <th>{t("registerValidation.name")}</th>
            <th>{t("Register.lastName")}</th>
            <th>{t("Register.email")}</th>
            <th>{t("dashboard.action")}</th>
          </tr>
        </thead>
        <tbody>
          {usersDelete.map((deletedUser) => (
            <tr key={deletedUser.id}>
              <td>{deletedUser.name}</td>
              <td>{deletedUser.last_name}</td>
              <td>{deletedUser.email}</td>
              <td>
                <i
                  onClick={() => restoreUser(deletedUser.id)}
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
<table className="table2">
        <thead className="table-dark">
          <tr>
            <th>{t("registerValidation.name")}</th>
            <th>{t("Register.lastName")}</th>
            <th>{t("Register.email")}</th>
            <th>{t("dashboard.action")}</th>
          </tr>
        </thead>
        <tbody>
          {usersData && 
            usersData.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.last_name}</td>
              <td>{user.email}</td>
              <td>
                <i
                  className="bi bi-dash-circle-fill"
                  title="Delete"
                  onClick={() => deleteUser(user.id)}
                ></i>
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
          <input
            type="text"
            placeholder={t("dashboard.name")}
            onChange={handleSearchInput}
            name="name"
            value={searchInput}
          />
          <button onClick={handleSearch} className="button-users">{t("dashboard.search")}</button>
        </div>
        <div className="btn-deleted-container">
        <button
        onClick={handleShowDeletedUsers}
        type="button"
        className="button-users2"
      >
        {showDeletedUsers ? t("dashboard.hideUsers") : t("dashboard.showUsers")}
      </button>
        </div>
      </div>
        {renderContent()}
        <div className="pagination">
            <button onClick={handleFirstPage} disabled={currentPage === 1 || usersDelete.length === 0} className={`pagination-button ${currentPage === 1 || usersDelete.length === 0 ? "disabled" : ""}`}>
              <IoMdSkipBackward className="icon-back"/>
            </button>
            <button onClick={handlePreviousPage} disabled={currentPage === 1 || usersDelete.length === 0} className={`pagination-button ${currentPage === 1 || usersDelete.length === 0 ? "disabled" : ""}`}>
              < IoCaretBackSharp className="icon-back"/>
            </button>
            <span>{currentPage}</span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages || usersDelete.length === 0} className={`pagination-button ${currentPage === totalPages || usersDelete.length === 0 ? "disabled" : ""}`}>
              <IoCaretForwardSharp className="icon-forward"/>
            </button>
            <button onClick={handleLastPage} disabled={currentPage === totalPages || usersDelete.length === 0} className={`pagination-button ${currentPage === totalPages || usersDelete.length === 0 ? "disabled" : ""}`}>
              <IoMdSkipForward className="icon-forward"/>
            </button>
          </div>
    </div>
  );
};

export default function WrappedApp() {
  return (
    <Suspense>
      <GestionUsers />
    </Suspense>
  );
}
