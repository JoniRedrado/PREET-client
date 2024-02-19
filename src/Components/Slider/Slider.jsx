import { useState, useEffect, Suspense } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";

import style from "./Slider.module.css";

function Slider() {
  const { t } = useTranslation();  
  const [rankedHotels, setRankedHotels] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedHotel, setSelectedHotel] = useState("");
  const [loaded, setLoaded] = useState(false);
  const autoPlay = true;


  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACK_URL}/hotels/range`)
      .then((response) => {
        setRankedHotels(response.data);
        console.log(rankedHotels);
        setSelectedHotel(response.data[0]);
      })
      .catch((error) => {
        console.error("Error al obtener datos de hoteles:", error);
      });
  }, []);

  useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(() => {
        next();
      }, 10000);
      return () => clearInterval(interval);
    }
  });

  const previous = () => {
    setLoaded(false);
    setTimeout(() => {
      const nextIndex =
        selectedIndex > 0 ? selectedIndex - 1 : rankedHotels.length - 1;
      setSelectedHotel(rankedHotels[nextIndex]);
      setSelectedIndex(nextIndex);
    }, 500);
  };

  const next = () => {
    setLoaded(false);
    setTimeout(() => {
      const nextIndex =
        selectedIndex < rankedHotels.length - 1 ? selectedIndex + 1 : 0;
      setSelectedHotel(rankedHotels[nextIndex]);
      setSelectedIndex(nextIndex);
    }, 500);
  };

  return (
    <div className={style.container}>
      <h1 className={style.title}>{t("Slider.title")}✨</h1>
      <div className={style.info}>
        <div className={style.image}>
          {selectedHotel && (
            <img
              className={loaded ? style.loadedImg : style.notLoadedImg}
              src={selectedHotel.image}
              alt="top_hotels"
              onLoad={() => setLoaded(true)}
            />
          )}
        </div>

        <div className={style.text}>
          <div className={style.hotelText}>
            <h1>{selectedHotel.name}</h1>
            <Link to={`/detail/${selectedHotel.id}`}>
              <button>{t("Slider.button")}</button>
            </Link>
            <p>{t("Slider.subtitle")}</p>
          </div>
          <div className={style.slideBtns}>
            <button className={style.BtnLeft} onClick={previous}>
              {"<"}
            </button>
            <button onClick={next}>{">"}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WrappedApp() {
  return (
    <Suspense>
      <Slider />
    </Suspense>
  );
}
