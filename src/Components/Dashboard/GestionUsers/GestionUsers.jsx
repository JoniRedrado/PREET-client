import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";



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

  const restoreHotel = async (id) => {
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
          <Link to={"/dashboard"}>
            <button>
              return dashboard
            </button>
          </Link>
          <button onClick={handleShowDeletedUsers}>
            {showDeletedUsers ? "Hide Deleted Users" : "Show Deleted Users"}
          </button>
          {showDeletedUsers && (
            <table>
              <thead className="encbezado">
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
                  <button onClick={() => restoreHotel(deletedUser.id)}>Restore</button>
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
                  <button className="deleteButton" onClick={() => deleteUser(user.id)}>
                    <i className="bi bi-trash" title="Delete"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table> 
        </>
    )
}

export default GestionUsers