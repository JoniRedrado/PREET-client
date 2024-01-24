import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHotels } from '../../redux/actions';
import Cards from '../../Components/Cards/Cards'; 

function Home() {
  const dispatch = useDispatch();
  const allHotels = useSelector((state) => state.allHotels);

  useEffect(() => {
    dispatch(getHotels());
  }, [dispatch]);

  console.log('Información de hoteles:', allHotels);

  return (
    <div>
      <Cards allHotels={allHotels} />
    </div>
  );
}

export default Home;