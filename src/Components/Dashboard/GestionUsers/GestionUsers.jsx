import axios from "axios";
import { useEffect, useState, Suspense } from "react";
import { Link } from "react-router-dom";
// import NavBarDashboard from "../NavBarDashboard/NavBarDashboard"
import { useTranslation } from "react-i18next";
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
      console.log(data);
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

  const handleSearchInput = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearch = () => {
    getUsers({ name: searchInput });
  };

  useEffect(() => {
    getUsers({});
  }, [currentPage, pageSize]);

  const handleShowDeletedUsers = () => {
    setShowDeletedUsers(!showDeletedUsers);
    if (!showDeletedUsers) {
      getUsersDeleted();
    }
  };

  return (
    <>
      <div className=".search-dashboard">
        {/* <NavBarDashboard/> */}
        <div>
          <input
            type="text"
            placeholder={t("dashboard.name")}
            onChange={handleSearchInput}
            name="name"
            value={searchInput}
          />
          <button onClick={handleSearch}>{t("dashboard.search")}</button>
        </div>
      </div>

      <Link to={"/dashboard"}>
        <i className="bi bi-arrow-left-circle"></i>
      </Link>
      <button
        onClick={handleShowDeletedUsers}
        type="button"
        className="btn btn-primary btn-lg"
      >
        {showDeletedUsers ? t("dashboard.hideUsers") : t("dashboard.showUsers")}
      </button>
      {showDeletedUsers && (
        <table className="table">
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
      )}
      <table className="table">
        <thead className="table-dark">
          <tr>
            <th>{t("registerValidation.name")}</th>
            <th>{t("Register.lastName")}</th>
            <th>{t("Register.email")}</th>
            <th>{t("dashboard.action")}</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(usersData) &&
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

export default function WrappedApp() {
  return (
    <Suspense>
      <GestionUsers />
    </Suspense>
  );
}
