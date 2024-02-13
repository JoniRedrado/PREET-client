import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userFavorites, removeFavorite } from '../../../redux/actions';
import { useDarkMode } from '../../../DarkModeContext/DarkModeContext';
import "./userFavorites.modules.css"
import { Link } from 'react-router-dom';

const UserFavorites = () => {
  const dispatch = useDispatch();
  const { darkMode } = useDarkMode(); 
  const favorites = useSelector(state => state.userFavorites.favorites);

  
  const handleRemoveFavorite = (id) => {
    dispatch(removeFavorite(id)).then(() => {
    dispatch(userFavorites());
  });
  };


  const renderStars = (count) => {
    const starsArray = Array.from({ length: count }, (_, index) => (
      <span key={index} role="img" aria-label="star">
        ⭐
      </span>
    ));
    return starsArray;
  };


  useEffect(() => {
    dispatch(userFavorites());
  }, [dispatch]);
  
  return (
    <div>
    <h1 className="centered-text">My Favorites</h1>
    
    <div className={`card-container ${darkMode? 'darkMode' : ''}`}>
      {
         favorites && favorites.map((favorite, index) => (
        <div key={index} className={`card ${darkMode? 'darkMode' : ''}`}>
          <div className="favorite-icon" onClick={() => handleRemoveFavorite(favorite.id)}>
            <i className="bi bi-heart-fill heart"></i>
          </div>
          <Link to={`/detail/${favorite.hotelId}`} className='link'>
          <div className="card-image">
          {favorite.hotel.image && favorite.hotel.image.length > 0 && favorite.hotel.image[0].image && (
            <img src={favorite.hotel.image[0].image} alt={favorite.hotel.name}/>
          )}
          </div>
          <div>
            <h1 className="card-title">{favorite.hotel.name}</h1>
            <div className="card-title">{renderStars(favorite.hotel.stars)}</div>
            {favorite.hotel.country && (
              <h3 className="card-title"><i class="bi bi-geo-alt-fill"></i>{favorite.hotel.country.name}</h3>
            )}
          </div>
          </Link>
        </div>
      ))
      }
    </div>
  </div>
  );
};

export default UserFavorites;