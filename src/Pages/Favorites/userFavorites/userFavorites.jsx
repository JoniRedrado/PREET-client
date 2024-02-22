/* eslint-disable react/no-unknown-property */
import { useEffect, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userFavorites, removeFavorite } from "../../../redux/actions";
import { useDarkMode } from "../../../DarkModeContext/DarkModeContext";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Favorite from "../../../assets/Favorite.png";
import notFavorite from "../../../assets/notFavorite.png";
import notFavoritesFound from "../../../assets/notFavoritesFound.png";
import "./userFavorites.modules.css";

const UserFavorites = () => {
  const dispatch = useDispatch();
  const { darkMode } = useDarkMode();
  const { t } = useTranslation();
  const favorites = useSelector((state) => state.userFavorites);

  const token = localStorage.getItem('token')

  const handleRemoveFavorite = (hotelId) => {
    dispatch(removeFavorite(hotelId)).then(() => {
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
    dispatch(userFavorites(token));
  }, [dispatch]);

  return (
    <div className="favorites-main-container">
      <h1 className="centered-text">{t("UserFavs.title")}</h1>
      {console.log(favorites)}
      {
        favorites.length >= 1
        ? (<div className={`card-container ${darkMode ? "darkMode" : ""}`}>
            {favorites &&
              favorites.map((favorite, index) => (
                <div key={index} className={`card ${darkMode ? "darkMode" : ""}`}>
                  <div
                    className="favorite-icon"
                    onClick={() => handleRemoveFavorite(favorite.hotelId)}
                  >
                    {favorite.isFavorite ? (
                      <img src={notFavorite} alt="notFavorite" className="fav" />
                        ) : (
                      <img src={Favorite} alt="Favorite" className="fav" />
                    )}
                  </div>
                  <Link to={`/detail/${favorite.hotelId}`} className="link">
                    <div className="card-image">
                      {favorite.hotel.image &&
                        favorite.hotel.image.length > 0 &&
                        favorite.hotel.image[0].image && (
                          <img
                            src={favorite.hotel.image[0].image}
                            alt={favorite.hotel.name}
                          />
                        )}
                    </div>
                    <div>
                      <h1 className="card-title">{favorite.hotel.name}</h1>
                      <div className="card-title">
                        {renderStars(favorite.hotel.stars)}
                      </div>
                      {favorite.hotel.country && (
                        <h3 className="card-title">
                          <i class="bi bi-geo-alt-fill"></i>
                          {favorite.hotel.country.name}
                        </h3>
                      )}
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        )
        : (<div className="not-favorites-found">
            <h2>You don`t have any favorites yet</h2>
            <img src={notFavoritesFound} alt="notFavoritesFound" />
          </div>)
      }
    </div>
  );
};

export default function WrappedApp() {
  return (
    <Suspense>
      <UserFavorites />
    </Suspense>
  );
}
