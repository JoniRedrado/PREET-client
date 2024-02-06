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
  const [loaded, setLoaded] = useState(false);
  const autoPlay = true;

  useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(() => {
        next();
      }, 10000);
      return () => clearInterval(interval);
    }
  }, []);

  const previous = () => {
    const newIndex = selectedIndex === 0 ? images.length - 1 : selectedIndex - 1;
    setSelectedIndex(newIndex);
    setSelectedHotel(images[newIndex]);
    setLoaded(false);
  };

  const next = () => {
    const newIndex = selectedIndex === images.length - 1 ? 0 : selectedIndex + 1;
    setSelectedIndex(newIndex);
    setSelectedHotel(images[newIndex]);
    setLoaded(false);
  };

  const handleImageLoad = () => {
    setLoaded(true);
  };

  return (
    <div className={style.container}>
      <div className={style.header}>
      <h3>TOP HOTELS OF THE SEASON✨</h3>
      </div>
      <div className={style.sliderContainer}>
      <div className={style.imgsContainer}>
        <img
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