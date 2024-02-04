import { useState, useEffect } from "react";

import style from "./Slider.module.css";

function Slider() {
  const images = [
    "image1.jpg",
    "image2.jpg",
    "image3.jpg",
    "image4.jpg",
    "image5.jpg",
  ];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedImage, setSelectedImages] = useState(images[0]);
  const [loaded, setLoaded] = useState(false);
  const autoPlay = true;

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
      const condition = selectedIndex > 0;
      const nextIndex = condition ? selectedIndex - 1 : images.length - 1;
      setSelectedImages(images[nextIndex]);
      setSelectedIndex(nextIndex);
    }, 500);
  };

  const next = () => {
    setLoaded(false);
    setTimeout(() => {
      const condition = selectedIndex < images.length - 1;
      const nextIndex = condition ? selectedIndex + 1 : 0;
      setSelectedImages(images[nextIndex]);
      setSelectedIndex(nextIndex);
    }, 500);
  };

  return (
    <div className={style.container}>
      <div className={style.imgsContainer}>
        <img
          className={loaded ? style.loadedImg : style.notLoadedImg}
          src={`../../src/assets/slider_test_images/${selectedImage}`}
          alt="top_hotels"
          onLoad={() => setLoaded(true)}
        />
        <div className={style.text}>
          <h1>TOP HOTELS OF THE SEASON✨</h1>
          <h3>Ranked by our users</h3>
        </div>

        <div className={style.slideBtns}>
          <button className={style.BtnLeft} onClick={previous}>
            {"<"}
          </button>
          <button onClick={next}>{">"}</button>
        </div>
      </div>
    </div>
  );
}

export default Slider;
