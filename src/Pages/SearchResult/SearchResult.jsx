import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Cards from "../../Components/Cards/Cards";
import TryAgain from "../../Components/Try again/TryAgain";
import styles from "./SearchResult.module.css"

function SearchResult() {
  const filteredHotels = useSelector((state) => state.filteredHotels);
  const [noResults, setNoResults] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (filteredHotels.total === 0) {
      setNoResults(true);
    } else {
      setNoResults(false);
    }
    // Obtener el término de búsqueda de la URL
    const urlParts = window.location.pathname.split('/');
    const searchTermFromUrl = urlParts[urlParts.length - 1];
    setSearchTerm(decodeURIComponent(searchTermFromUrl));
  }, [filteredHotels]);

  return (
    <div className={styles.container}>
      {noResults ? (
        <TryAgain />
      ) : (
        <div className={styles.cardsContainer}>
            <h2>Search Results for "{searchTerm}"</h2>
          <Cards allHotels={filteredHotels} />
        </div>
      )}
    </div>
  );
}

export default SearchResult;