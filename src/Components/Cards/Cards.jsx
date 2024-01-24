import Card from "../Card/Card";
import Pagination from "../../components/Pagination/Pagination";
import { useSelector } from "react-redux";
import './Cards.style.css'

// eslint-disable-next-line react/prop-types
const Cards = ({ allHotels }) => {  
    const hotelsPerPage = 8

    const currentPage = useSelector((state) => state.currentPage)
  
    const lastIndex = currentPage * hotelsPerPage
    const firstIndex = lastIndex - hotelsPerPage

    const hotelList = allHotels

  return (
    <div className="cards-container">
      {hotelList.map((hotel) => {
        return <Card 
          key={hotel.id}
          id={hotel.id}
          name={hotel.name} 
          address={hotel.address}
          country={hotel.country.name} 
          address_url={hotel.address_url} 
          price={hotel.price} 
          email={hotel.email} 
          image={hotel.image} 
        />;
}).slice(firstIndex, lastIndex)}
      <Pagination hotelsPerPage={hotelsPerPage} hotels={hotelList} />
    </div>
  );
};

export default Cards;

