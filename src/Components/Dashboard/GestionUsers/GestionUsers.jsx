import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBarDashboard from "../NavBarDashboard/NavBarDashboard"


import "./GestionUsers.modules.css";

const GestionUsers = () =>{

    const [usersData, setUsersData] = useState([])
    const [usersDelete, setUsersDelete] = useState([]);
    const [showDeletedUsers, setShowDeletedUsers] = useState(false);

    const getUsers = async() => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BACK_URL}/users`);
      console.log(data);
      setUsersData(data)

    } catch (error) {
      console.error(error.message);
    }
  };

  const getUsersDeleted = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BACK_URL}/users/deleted`);
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
        
      getUsers()

    } catch (error) {
      console.error(error.message);
    }
  };

    useEffect(() => {
        getUsers()
    }, [])

    const handleShowDeletedUsers = () => {
      setShowDeletedUsers(!showDeletedUsers);
      if (!showDeletedUsers) {
        getUsersDeleted();
      }
    };

    return(
        <>
          <NavBarDashboard/>

          <Link to={"/dashboard"}>
            <i class="bi bi-arrow-left-circle"></i>
          </Link>
          <button onClick={handleShowDeletedUsers} type="button" class="btn btn-primary btn-lg">
            {showDeletedUsers ? "Hide Deleted Users" : "Show Deleted Users"}
          </button>
          {showDeletedUsers && (
            <table className="table">
              <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Actions</th>
               </tr>
              </thead>
              <tbody>
              {usersDelete.map((deletedUser) => (
              <tr key={deletedUser.id}>
                <td>{deletedUser.name}</td>
                <td>{deletedUser.last_name}</td>
                <td>{deletedUser.email}</td>
                <td>
                  <i onClick={() => restoreUser(deletedUser.id)} class="bi bi-arrow-counterclockwise"></i>
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
               <th>Last Name</th>
               <th>Email</th>
              <th>Actions</th>
             </tr>
           </thead>
           <tbody>
             {usersData && usersData.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>
                    <i className="bi bi-dash-circle-fill" title="Delete" onClick={() => deleteUser(user.id)}></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table> 
        </>
    )
}

export default GestionUsers