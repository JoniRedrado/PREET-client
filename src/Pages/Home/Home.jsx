import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllHotels } from "../../redux/actions";
import Cards from "../../Components/Cards/Cards";

function Home() {
  const dispatch = useDispatch();
  const allHotels = useSelector((state) => state.allHotels);
  const filteredHotels = useSelector((state) => state.filteredHotels);
  const searched = useSelector((state) => state.searched);

  useEffect(() => {
    dispatch(getAllHotels());
  }, [dispatch]);

  console.log("Información de hoteles:", allHotels);

  return (
    <div>
      <Cards allHotels={searched ? filteredHotels : allHotels} />
    </div>
  );
}

export default Home;
