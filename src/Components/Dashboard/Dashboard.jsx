import "./Dashboard.style.css";
import { useEffect, useState } from "react";
import Pagination from "../Pagination/Pagination";
import axios from "axios";

const Dashboard = () => {

  const [selectedOptions, setSelectedOption] = useState({
    users: true,
    hotels: false
  })

  const [usersData, setUsersData] = useState([])
  const [hotelsData, setHotelsData] = useState([])

  const getUsers = async() => {
    try {
      const { data } = await axios.get("http://localhost:3001/users");

      setUsersData(data)

    } catch (error) {
      console.error(error.message);
    }
  };


  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/users/delete/${id}`);

      getUsers()

    } catch (error) {
      console.error(error.message);
    }
  };

  
  const getHotels = async() => {
    try {
      const { data } = await axios.get(`http://localhost:3001/hotels?size=30`);
      
      setHotelsData(data.Hotel)
      
    } catch (error) {
      console.error(error.message);
    }
  };
  
  const deleteHotel = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/hotels/${id}`);

      getHotels()

    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getUsers()
    getHotels()
  }, [])

  const usersButton = () => {
    setSelectedOption({users: true, hotels: false})
    };
    
  const hotelsButton = () => {
    setSelectedOption({users: false, hotels: true})
  };

  const usersTable = () => {
    return (
      <div className="table-container">
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
    );
  }

  const hotelsTable = () => {
    return (
    <>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Stars</th>
            <th>Country</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {hotelsData.map(hotel => (
            <tr key={hotel.id}>
              <td>{hotel.name}</td>
              <td>{hotel.stars}</td>
              <td>{hotel.country.name}</td>
              <td>
                <button className="deleteButton" onClick={() => deleteHotel(hotel.id)}>
                  <i className="bi bi-trash" title="Delete"></i>
                </button>
              </td>
            </tr>))}
        </tbody>
      </table>
    </> 
    )
  }

  return (
    <div>
      <div className="container-dashboard">
        <div className="buttons">
          <button className="yellowButton" onClick={usersButton}>Users</button>
          <button className="blueButton" onClick={hotelsButton}>Hotels</button>
        </div>
        <div>
          {
            selectedOptions.users
              ? usersTable()
              : hotelsTable()
          }
        </div>
        <Pagination/>
        {/* <button onClick={applyFilters}>Apply Filters</button>
        <button onClick={handleReset} className="reset">
          Reset Filters
        </button> */}
      </div>
    </div>
  );
};

export default Dashboard;
