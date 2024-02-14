import axios from "axios";
import { useEffect, useState } from "react";


import "./GestionUsers.components.css";

const GestionUsers = () =>{

    const [usersData, setUsersData] = useState([])

    const getUsers = async() => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BACK_URL}/users`);

      setUsersData(data)

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

    return(
        <div>
        
        <div className="container">
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">Users</a>
          </div>
        </nav>
        </div>
        <table>
           <thead>
             <tr>
               <th>Name</th>
               <th>Last Name</th>
               <th>Email</th>
              <th>Actions</th>
             </tr>
           </thead>
           <tbody>
             {usersData.map((user) => (
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

        </div>
    )
}

export default GestionUsers