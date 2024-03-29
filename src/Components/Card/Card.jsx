/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import './Card.style.css';

const Card = (props) => {

  const { id, name, image, country, price, stars } = props;
  
  return (
    <div className="card">
      <Link to={`/detail/${id}`} className="card-link">
        <div className="card-image">
          <img src={image} alt="hotel" />
        </div>
        <div className="card-details">
            <h1>{name ? name : "N/A"}</h1>
            <h1>{country ? country : "N/A"}</h1>
            {/* <h1>{address_url ? address_url : "N/A"}</h1> */}
            <h1>{price ? price : "N/A"}$</h1>
            <h1>{stars ? stars : "N/A"}⭐</h1>

        </div>
      </Link>
    </div>
  );
};

export default Card;

