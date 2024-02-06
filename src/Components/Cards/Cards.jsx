/* eslint-disable react/prop-types */
import Card from "../Card/Card";
import './Cards.style.css'

const Cards = ({ allHotels }) => {  
    const hotelList = allHotels

  return (
    <div className="cards-container">
      {hotelList.Hotel?.map((hotel) => {
        return <Card 
          key={hotel.id}
          id={hotel.id}
          name={hotel.name} 
          // address={hotel.address}
          country={hotel.country.name} 
          // address_url={hotel.address_url}
          stars={hotel.stars}
          //price={hotel.price} 
          email={hotel.email} 
          image={hotel.image}
          rooms={hotel.rooms} 
        />;
      })
      }
    </div>
  );
  
};

export default Cards;

