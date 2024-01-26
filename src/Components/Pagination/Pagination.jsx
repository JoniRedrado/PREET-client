/* eslint-disable react/prop-types */
// import { useDispatch, useSelector } from "react-redux";
// import { nextPage, prevPage, specificPage } from "../../redux/actions";
import s from "../Pagination/Pagination.module.css";

// function Pagination({hotels, hotelsPerPage}) {

//   const dispatch = useDispatch()

//   const pageNumbers = [];
//   const currentPage = useSelector((state) => state.currentPage)

//   for(let i = 1;i<=Math.ceil(hotels.length/hotelsPerPage); i++){
//     pageNumbers.push(i)
//   }

//   const onNextPage = () => {
//     dispatch(nextPage())
//   }

//   const onPrevPage = () => {
//     dispatch(prevPage())
//   }

//   const onSpecificPage = (page) => {
//     dispatch(specificPage(page))
//   }

//   const showPageNumbers = () => {
//     const displayPages = []
//     const totalPages = pageNumbers.length
//     const pagesToShow = 3;

//     console.log(totalPages);

//     if (totalPages <= pagesToShow) {
//       displayPages.push(...pageNumbers)
//     } else {
//       const startPage = Math.max(1, currentPage)
//       const endPage = Math.min(startPage + pagesToShow - 1, totalPages);

//       if (startPage > 1) {
//         displayPages.push(1);
//         displayPages.push(null)
//       }

//       for (let i = startPage; i <= endPage; i++) {
//         displayPages.push(i)
//       }

//       if (endPage < totalPages) {
//         displayPages.push(null)
//         displayPages.push(totalPages)
//       }
//     }

//     return displayPages.map((page, index) => (
//       <li key={index}>
//         {page === null
//           ? (<span>   </span>)
//           : (<a onClick={() => onSpecificPage(page)}>{page}</a>)
//         }
//       </li>
//     ))
//   }
  
//   return (
//     <div className={s.pagination}>
//       <button onClick={onPrevPage}>Anterior</button>

//       <div>{showPageNumbers()}</div>

//       <button onClick={onNextPage}>Siguiente</button>
//     </div>
//   );
// }

// export default Pagination;

import { useDispatch, useSelector } from 'react-redux';
import { nextPage, pagination, prevPage } from '../../redux/actions';

const Pagination = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.currentPage);
  const totalHotels = useSelector((state) => state.totalHotels);

  const handlePrevClick = () => {
      dispatch(prevPage());
      dispatch(pagination(currentPage));
  };

  const handleNextClick = () => {
      dispatch(nextPage());
      dispatch(pagination(currentPage));
  };

//   useEffect(() => {
//     dispatch(pagination(currentPage, 9)); 
// }, [currentPage, dispatch]);

  return (
    <div>
      <button onClick={handlePrevClick} disabled={currentPage === 1}>
        Prev
      </button>
      <span>Page {currentPage} of {Math.round(totalHotels / 2)}</span>
      <button onClick={handleNextClick} disabled={currentPage === totalHotels}>
        Next
      </button>
    </div>
  );
};

export default Pagination;