import axios from "axios"
import NavBarDashboard from "../NavBarDashboard/NavBarDashboard";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./GestionFeedBack.modules.css"

const GestionFeedBack = () => {

    const [feedbackData, setFeedbackData] = useState([]);

    const getFeedBack = async () =>{
        try {
            const {data} = await axios.get(`${import.meta.env.VITE_BACK_URL}/feedback`)
            console.log(data);
            setFeedbackData(data)
        } catch (error) {
            console.error(error.message);  
            
        }
    }

    useEffect(() =>{
        getFeedBack()
    }, [])

    return(
        <div>
            <NavBarDashboard/>
            este es el FeedBack
        </div>
    )
}

export default GestionFeedBack;