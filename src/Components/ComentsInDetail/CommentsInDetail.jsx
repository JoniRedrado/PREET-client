import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import style from "./CommentsInDetail.module.css";

function CommentsInDetail() {
  const { id } = useParams();
  const [hotelComments, setHotelComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 10;
  const totalPages = Math.ceil(hotelComments.length / commentsPerPage);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACK_URL}/feedback/hotel/${id}`, {
        params: {
          page: currentPage,
          limit: commentsPerPage,
        },
      })
      .then((response) => {
        setHotelComments(response.data);
        console.log("Datos de hoteles obtenidos correctamente:", response.data);
      })
      .catch((error) => {
        console.error("Error al obtener comentarios del hotel:", error);
      });
  }, [currentPage]);

  return (
    <div>
      {hotelComments && hotelComments.length > 0 ? (
        hotelComments.map((comment) => (
          <div className={style.container}>
            <div className={style.comment} key={comment.id}>
              <div className={style.userInfo}>
                <h2>{comment.user.name}</h2>
                <p>{comment.user.nationality}</p>
              </div>
              <h4>{comment.comment}</h4>
            </div>
            <hr className={style.line} />
          </div>
        ))
      ) : (
        <h4>There are no comments for this hotel yet</h4>
      )}
      {hotelComments.length > 0 && (
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

export default CommentsInDetail;