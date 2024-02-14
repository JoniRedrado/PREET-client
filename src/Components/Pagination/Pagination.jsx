import { useDispatch, useSelector } from 'react-redux';
import { filterHotels, nextPage, prevPage } from '../../redux/actions';
import s from "../Pagination/Pagination.module.css";

const Pagination = ({ setButtonPage }) => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.currentPage);
  const totalHotels = useSelector((state) => state.totalHotels);
  const filters = useSelector((state) => state.submitFilters)

  const totalPages = Math.ceil(totalHotels / 6)

  const handlePrevClick = () => {
    setButtonPage(true);
    dispatch(prevPage());
    dispatch(filterHotels(filters));
  };

  const handleNextClick = () => {
      setButtonPage(true);
      dispatch(nextPage());
      dispatch(filterHotels(filters));
  };

  return (
    <div className={s.paginationContainer}>
      <button onClick={handlePrevClick} disabled={currentPage === 1} className={currentPage === 1 ? s.paginationButtonOff : s.paginationButton}>
        Prev
      </button>
      <span>Page {currentPage} of {totalPages}</span>
      <button onClick={handleNextClick} disabled={currentPage === totalPages} className={currentPage === totalPages ? s.paginationButtonOff : s.paginationButton}  >
        Next
      </button>
    </div>
  );
};

export default Pagination;