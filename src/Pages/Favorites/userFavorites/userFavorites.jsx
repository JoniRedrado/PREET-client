import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userFavorites, removeFavorite } from '../../../redux/actions';
import { useDarkMode } from '../../../DarkModeContext/DarkModeContext';
import "./userFavorites.modules.css"

const UserFavorites = () => {
  const dispatch = useDispatch();
  const { darkMode } = useDarkMode(); 
  const fav = useSelector(state => state.userFavorites);

  const handleRemoveFavorite = (id) => {
    dispatch(removeFavorite(id));
  };

  useEffect(() => {
    dispatch(userFavorites());
  }, [dispatch]);

  return (
    <div>
    <h2 className="centered-text">My Favorites</h2>
    <div className={`card-container ${darkMode? 'darkMode' : ''}`}>
      {fav.Favorite && fav.Favorite.map((favorite, index) => (
        <div key={index} className={`card ${darkMode? 'darkMode' : ''}`}>
          <div className="card-image">
          <button onClick={() => handleRemoveFavorite(favorite.id)}>
            Remove
          </button>
            <img src={favorite.hotel.image} alt={favorite.hotel.name} />
          </div>
          <div className="card-body">
            <h3 className="card-title">{favorite.hotel.name}</h3>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
};

export default UserFavorites;