import { useDispatch, useSelector } from 'react-redux';
import { nextPage, pagination, prevPage } from '../../redux/actions';
import s from "../Pagination/Pagination.module.css";

const Pagination = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.currentPage);
  const totalHotels = useSelector((state) => state.totalHotels);

  const totalPages = Math.round(totalHotels / 6)

  const handlePrevClick = () => {
      dispatch(prevPage());
      dispatch(pagination(currentPage));
  };

  const handleNextClick = () => {
      dispatch(nextPage());
      dispatch(pagination(currentPage));
  };

  return (
    <div className={s.paginationContainer}>
      <button onClick={handlePrevClick} disabled={currentPage === 1}>
        Prev
      </button>
      <span>Page {currentPage} of {totalPages}</span>
      <button onClick={handleNextClick} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
};

export default Pagination;