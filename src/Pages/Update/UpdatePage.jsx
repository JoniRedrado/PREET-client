import { useEffect, useState } from "react";
import axios from "axios";
import UpdateForm from "../../Components/UpdateForm/UpdateForm";
import { useParams, useNavigate } from "react-router-dom"; 

const UpdatePage = () => {
    const [hotelData, setHotelData] = useState(null);
    const [countries, setCountries] = useState([]);

    const { hotelId } = useParams();
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchHotelData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/hotels/${hotelId}`);
                setHotelData(response.data);
            } catch (error) {
                console.error("Error fetching hotel data:", error);
            }
            };

        const fetchCountries = async () => {
            try {
                const response = await axios.get("http://localhost:3001/countries");
                setCountries(response.data);
            } catch (error) {
                console.error("Error fetching countries:", error);
            }
            };

            fetchHotelData();
            fetchCountries();
        }, [hotelId]);

    const handleUpdate = (updatedData) => {
        console.log("Hotel updated:", updatedData);

        navigate(`http://localhost:3001/hotels/${updatedData.id}`);
    };

    return (
        <div>
            <h2>Edit Hotel</h2>
            {hotelData ? (
                <UpdateForm initialData={hotelData} onSubmit={handleUpdate} countries={countries} />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default UpdatePage;