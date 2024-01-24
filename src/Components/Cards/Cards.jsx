import Card from "../Card/Card";
import './Cards.style.css'

// eslint-disable-next-line react/prop-types
const Cards = ({ allHotels }) => {
  return (
    <div className="cards-container">
      {allHotels.map((hotel) => (
        <Card key={hotel.id} hotel={hotel} className="card"/>
      ))}
    </div>
  );
};

export default Cards;

