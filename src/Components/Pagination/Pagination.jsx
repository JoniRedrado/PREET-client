import { useDispatch, useSelector } from 'react-redux';
import { filterHotels, nextPage, prevPage } from '../../redux/actions';
import s from "../Pagination/Pagination.module.css";

const Pagination = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.currentPage);
  const totalHotels = useSelector((state) => state.totalHotels);
  const filters = useSelector((state) => state.submitFilters)

  const totalPages = Math.ceil(totalHotels / 6)

  /* console.log(filters); */

  const handlePrevClick = () => {
    dispatch(prevPage());
    dispatch(filterHotels(filters));
  };

  const handleNextClick = () => {
      dispatch(nextPage());
      dispatch(filterHotels(filters))
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