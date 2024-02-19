import { useState, useEffect, Suspense } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, postFavorite } from "../../redux/actions";
import { motion } from "framer-motion";
import { FaMapMarkerAlt } from "react-icons/fa";
import RoomDetail from "../RoomDetail/RoomDetail";
import CommentsInDetail from "../../Components/ComentsInDetail/CommentsInDetail";
import FiltersForDetail from "../../Components/FiltersForDetail/FiltersForDetail";
import Modal from "react-modal";
import { useDarkMode } from "../../DarkModeContext/DarkModeContext";
import { showModal } from "../../redux/actions";
import { useTranslation } from "react-i18next";
import axios from "axios";
import swal from "sweetalert";

import "./detail.styles.css";

const Detail = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const { darkMode } = useDarkMode();
  const { id } = useParams();
  const { t } = useTranslation();

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedStars, setSelectedStars] = useState([])
  const [reviewValues, setReviewValues] = useState({})

  const renderStars = (count) => {
    const starsArray = Array.from({ length: count }, (_, index) => (
      <span key={index} role="img" aria-label="star">
        ⭐
      </span>
    ));
    return starsArray;
  };

  const hotel = useSelector((state) => state.hotelDetail);
  const modalRoomDetail = useSelector((state) => state.showModal.roomDetail);
  const modalPostReview = useSelector((state) => state.showModal.postReview);
  const filters = useSelector((state) => state.submitFilters)

  useEffect(() => {
    if (id) dispatch(getDetail(id, filters));
    window.scrollTo({top: 0, behavior: 'smooth'});
  }, [dispatch, id]);

  const handleRoomSelect = (roomType) => {
    const selectedRoom = hotel.rooms.find((room) => room.type === roomType);
    setSelectedRoom(selectedRoom);
    dispatch(showModal("roomDetail", true));
  };

  function closeModal(option) {
    setSelectedRoom(null);
    dispatch(showModal(option, false));
  }

  const handleAddToFavorites = () => {
    dispatch(postFavorite(id));
    setIsFavorite(!isFavorite);
    localStorage.setItem(`favorite_${id}`, "true");
  };

  const handlePostReviewModal = (option) => {
    dispatch(showModal(option, true));
  };

  const handleStarClick = (star) => {
    const newSelectedStars = [1, 2, 3, 4, 5].filter((selectedStar) => selectedStar <= star);
    setSelectedStars(newSelectedStars)
    setReviewValues({...reviewValues, score: newSelectedStars.length})
  };

  const handleComment = (e) => {
    setReviewValues({...reviewValues, comment: e.target.value})
  };

  const handleSubmitReview = (e) => {
    e.preventDefault()
    
    const {score, comment} = reviewValues

    try {
      const response = axios.post(`${import.meta.env.VITE_BACK_URL}/feedback/${hotel.id}`, { score, comment,   })

      if (response.status === 200) {        
        swal({
          title: "¡Thanks for your review!",
          icon: "success",
          button: null,
        });
      }
    } catch (error) {
      console.error(error)
    }

  };
  
  return (
    <motion.div
      className={`container-detail ${darkMode ? "darkMode" : ""}`}
      initial={{ opacity: 0, y: -20 }} // Estado inicial de la animación
      animate={{ opacity: 1, y: 0 }} // Estado final de la animación
      transition={{ duration: 0.5 }} // Duración de la animación
    >
      <FiltersForDetail />
      <div>
        <div className="information">
          <div className="icons">
            <Link to="/">
              <i className="bi bi-arrow-left-circle" title="Return home"></i>
            </Link>
            {token ? (
              <>
                <div className="icon" onClick={isFavorite ? null : handleAddToFavorites}>
                  {isFavorite ? <i className="bi bi-heart-fill"></i> : <i className="bi bi-heart"> </i>}
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        

        {hotel ? (
          <div className="informationContainer">
          <h1>{hotel.name}</h1>
          <img src={hotel.image} alt={hotel.name} />
          <div className="scores">
            <h2>{renderStars(hotel.stars)}</h2>
            <h2>Ranking PREET: {hotel.ranking}</h2>
          </div>

          <h2>
            <FaMapMarkerAlt className="info-icon" />
            {t("Detail.address")} {hotel.address}
          </h2>
          <h2>
            <FaMapMarkerAlt className="info-icon" />
            {t("Detail.country")} {hotel.country && hotel.country.name}
          </h2>
          <h2>
            <FaMapMarkerAlt className="info-icon" />
            {t("Detail.Website")} {hotel.address_url}
          </h2>
          <h2>{t("Detail.select")}</h2>
          <select
            className="selectRoom"
            defaultValue="Select you room"
            onChange={(e) => handleRoomSelect(e.target.value)}
          >
            <option disabled>{t("Detail.option")}</option>
            {hotel.rooms && hotel.rooms.length > 0 ? (
              hotel.rooms.map((room) => (
                <option key={room.id} value={room.type}>
                  {room.type}
                </option>
              ))
            ) : (
              <option disabled>{t("Detail.noRooms")}</option>
            )}
          </select>
            <h2 className="reviews-title">{t("Detail.reviews")}</h2>
            <button className="container-detail-button" onClick={() => handlePostReviewModal("postReview")}>Leave your review</button>
            <CommentsInDetail className="comments"/>
          </div>
        ) : (
          <p>{t("Detail.loading")}</p>
        )}
      </div>
      </div>
      <Modal
        isOpen={modalPostReview}
        onRequestClose={() => closeModal("postReview")}
        className="modal"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <div className="review-box-container">
          <div className="review-stars">
            <p className="review-tag">Score from 1 to 5</p>
            <div className="stars-buttons-container">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  className={`star-button ${selectedStars.includes(star) ? "active-star" : "unactive-star"}`}
                  onClick={() => handleStarClick(star)}>
                <span role="img" aria-label="star">&#x2605;</span>
                </button>
              ))}
            </div>
          </div>
          <div className="review-comments">
            <p className="review-tag">Comment</p>
            <textarea name="review-comment" value={reviewValues.comment} onChange={handleComment} className="review-comment-textarea"></textarea>
          </div>
          <button className="review-submit-button" onClick={handleSubmitReview}>Submit</button>
        </div>
      </Modal>
      <Modal
        isOpen={modalRoomDetail}
        onRequestClose={() => closeModal("roomDetail")}
        className="modal"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <i onClick={closeModal} className="bi bi-arrow-left-circle return"></i>
        <RoomDetail room={selectedRoom} />
      </Modal>
    </motion.div>
  );
};

export default function WrappedApp() {
  return (
    <Suspense>
      <Detail />
    </Suspense>
  );
}
