import { useState, useEffect, Suspense } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import {useDarkMode} from "../../DarkModeContext/DarkModeContext"

import style from "./CommentsInDetail.module.css";

function CommentsInDetail() {
  const { id } = useParams();
  const { t } = useTranslation();
  const {darkMode} = useDarkMode()
  const [hotelComments, setHotelComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 5;
  const totalPages = Math.ceil(hotelComments.feedback?.count / commentsPerPage);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACK_URL}/feedback/hotel/${id}?page=${currentPage}&limit=${commentsPerPage}`)
      .then((response) => {
        setHotelComments(response.data);        
      })
      .catch((error) => {
        console.error("Error al obtener comentarios del hotel:", error);
      });
  }, [currentPage]);
  
  console.log(hotelComments);
  return (
    <div>
      {hotelComments && hotelComments.feedback?.rows?.length > 0 ? (
        hotelComments.feedback.rows.map((comment) => (
          <div className={`${style.reviewsContainer} ${darkMode ? style.darkMode : ""}`} key={comment.id}>
            <div className={style.userInfo}>
              <h2>{comment.user.name}</h2>
              <p className={style.userNationality}>({comment.user.nationality})</p>
              <div className={style.reviewScore}>{comment.score}⭐</div>
            </div>
            {
              comment.comment
              ? <p>{comment.comment}</p>
              : ""
            }
          </div>
        ))
      ) : (
        <h4>{t("CommentsInD.message")}</h4>
      )}
      {hotelComments.feedback?.rows?.length > 0 && (
        <div className={style.paginationContainer}>
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={
              currentPage === 1
                ? style.paginationButtonOff
                : style.paginationButton
            }
          >
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={
              currentPage === totalPages
                ? style.paginationButtonOff
                : style.paginationButton
            }
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default function WrappedApp() {
  return (
    <Suspense>
      <CommentsInDetail />
    </Suspense>
  );
}
