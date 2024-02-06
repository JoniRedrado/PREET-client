<<<<<<< Updated upstream
import React, { useState, useEffect } from "react";
import style from "./Slider.module.css";

function Slider() {
  const images = [
    { name: "Hotel new Miami", src: "image1.jpg", stars:"⭐⭐⭐⭐⭐" },
    { name: "Hotel Brooklyn", src: "image2.jpg", stars:"⭐⭐⭐⭐" },
    { name: "Hotel Buenos Aires", src: "image3.jpg", stars: "⭐⭐⭐⭐" },
    { name: "Hotel California", src: "image4.jpg", stars: "⭐⭐⭐" },
    { name: "Hotel new Amerián", src: "image5.jpg", stars: "⭐⭐⭐⭐" },
  ];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedHotel, setSelectedHotel] = useState(images[0]);
=======
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import style from "./Slider.module.css";

function Slider() {
  const [rankedHotels, setRankedHotels] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedHotel, setSelectedHotel] = useState("");
>>>>>>> Stashed changes
  const [loaded, setLoaded] = useState(false);
  // const autoPlay = true;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("http://localhost:3001/hotels/range");
        setRankedHotels(data);
        setSelectedHotel(data[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();

    /* if (autoPlay) {
      const interval = setInterval(() => {
        next();
      }, 10000);
      return () => clearInterval(interval);
<<<<<<< Updated upstream
    }
=======
    } */
>>>>>>> Stashed changes
  }, []);

  const previous = () => {
    const newIndex = selectedIndex === 0 ? images.length - 1 : selectedIndex - 1;
    setSelectedIndex(newIndex);
    setSelectedHotel(images[newIndex]);
    setLoaded(false);
<<<<<<< Updated upstream
=======
    setTimeout(() => {
      const condition = selectedIndex > 0;
      const nextIndex = condition ? selectedIndex - 1 : rankedHotels.length - 1;
      setSelectedHotel(rankedHotels[nextIndex]);
      setSelectedIndex(nextIndex);
    }, 500);
>>>>>>> Stashed changes
  };

  const next = () => {
    const newIndex = selectedIndex === images.length - 1 ? 0 : selectedIndex + 1;
    setSelectedIndex(newIndex);
    setSelectedHotel(images[newIndex]);
    setLoaded(false);
<<<<<<< Updated upstream
  };

  const handleImageLoad = () => {
    setLoaded(true);
=======
    setTimeout(() => {
      const condition = selectedIndex < rankedHotels.length - 1;
      const nextIndex = condition ? selectedIndex + 1 : 0;
      setSelectedHotel(rankedHotels[nextIndex]);
      setSelectedIndex(nextIndex);
    }, 500);
>>>>>>> Stashed changes
  };

  return (
    <div className={style.container}>
      <div className={style.header}>
      <h3>TOP HOTELS OF THE SEASON✨</h3>
      </div>
      <div className={style.sliderContainer}>
      <div className={style.imgsContainer}>
        <img
<<<<<<< Updated upstream
          className={`${style.image} ${loaded ? style.loadedImg : style.notLoadedImg}`}
          src={`../../src/assets/slider_test_images/${selectedHotel.src}`}
          alt={selectedHotel.name}
          onLoad={handleImageLoad}
        />
      </div>
      <div className={style.textContainer}>
      <div className={style.text}>
          <h1>{selectedHotel.name}</h1>
          <p>{selectedHotel.stars}</p>
          
          <p>Ranked by our users</p>
=======
          className={loaded ? style.loadedImg : style.notLoadedImg}
          src={selectedHotel.image}
          alt="top_hotels"
          onLoad={() => setLoaded(true)}
        />
        <div className={style.text}>
          <h1>TOP HOTELS OF THE SEASON✨</h1>
          <h3>Ranked by our users</h3>
          <h2>{selectedHotel.name}</h2>
          <Link to={`/detail/${selectedHotel.id}`}>
            <button>See More</button>
          </Link>
>>>>>>> Stashed changes
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

export default Slider;