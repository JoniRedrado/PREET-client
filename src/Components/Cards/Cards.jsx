import Card from "../Card/Card";
import Pagination from "../../components/Pagination/Pagination";
import { useSelector } from "react-redux";
import './Cards.style.css'

// eslint-disable-next-line react/prop-types
const Cards = ({ allHotels }) => {  
    const hotelsPerPage = 9

    const currentPage = useSelector((state) => state.currentPage)
  
    const lastIndex = currentPage * hotelsPerPage
    const firstIndex = lastIndex - hotelsPerPage
  return (
    <div className="cards-container">
       {allHotels.map((hotel, key) => (
        <Card key={key} hotel={hotel} />
      )).slice(firstIndex, lastIndex)}
      <Pagination hotelsPerPage={hotelsPerPage} hotels={allHotels} />
    </div>
  );
};

export default Cards;

