import axios from "axios";
import { useState, useEffect, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const roomsType = [
  'Estandar',
  'Superior',
  'Deluxe',
  'Junior Suite',
  'Suite Estandar',
  'Suite Presidencial'
];

const CreateRooms = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    type: "",
    numeration: "",
    price: "",
    guest: "",
    description: "",
    image: null,
    selectedHotelId: "",
  });

  const [hotels, setHotels] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Inicializado en 1
  const [pageSize] = useState(6); // Tamaño de la página

  const fetchHotels = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACK_URL}/hotels`,{
        params: { page: currentPage, size: pageSize }
      });

      setHotels(prevHotels => [...prevHotels, ...response.data.Hotel]); // Agrega los nuevos hoteles al estado
      setTotalPages(Math.ceil(response.data.total / pageSize));
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, [currentPage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const handleHotelChange = (e) => {
    const selectedHotelId = e.target.value;
    if (selectedHotelId === "loadMore") {
      setCurrentPage(currentPage + 1);
    } else {
      setFormData({ ...formData, selectedHotelId });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUpload = formData.image;

    if (formData.image) {
      const formDataCloudinary = new FormData();
      formDataCloudinary.append("file", e.target.querySelector('input[type="file"]').files[0]);
      formDataCloudinary.append("upload_preset", "PREET2024");

      try {
        const responseCloudinary = await fetch(
          "https://api.cloudinary.com/v1_1/drntvj4ut/image/upload",
          {
            method: "POST",
            body: formDataCloudinary,
          }
        );

        const cloudinaryData = await responseCloudinary.json();

        if (cloudinaryData.secure_url) {
          imageUpload = cloudinaryData.secure_url;
        } else {
          console.error("Error: No 'secure_url' found in Cloudinary response");
        }
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
      }
    }

    const roomData = {
      ...formData,
      image: imageUpload,
    };

    try {
      await axios.post(`${import.meta.env.VITE_BACK_URL}/rooms/${formData.selectedHotelId}`, roomData);
      window.alert("room create ")
      navigate("/dashboard")
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  return (
    <form  className="form" onSubmit={handleSubmit}>
      <h1>{t("CreateRooms.title")}</h1>
      <label>{t("CreateRooms.type")}</label>
      <select name="type" value={formData.type} onChange={handleChange}>
        <option value="">{t("CreateRooms.selectType")}</option>
        {roomsType.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      <label>{t("CreateRooms.numeration")}</label>
      <input type="text" name="numeration" placeholder={t("CreateRooms.numeration")} value={formData.numeration} onChange={handleChange} />
      <label>{t("CreateRooms.price")}</label>
      <input type="number" name="price" placeholder={t("CreateRooms.price")} value={formData.price} onChange={handleChange} />
      <label>{t("CreateRooms.guest")}</label>
      <input type="number" name="guest" placeholder={t("CreateRooms.guest")} value={formData.guest} onChange={handleChange} />
      <label>{t("CreateRooms.description")}</label>
      <input type="text" name="description" placeholder={t("CreateRooms.description")} value={formData.description} onChange={handleChange} />
      <label>{t("CreateRooms.hotel")}</label>
      <select value={formData.selectedHotelId} onChange={handleHotelChange}>
        <option value="">{t("CreateRooms.selectHotel")}</option>
        {hotels.map((hotel) => (
          <option key={hotel.id} value={hotel.id}>
            {hotel.name}
          </option>
        ))}
        {currentPage < totalPages && (
          <option value="loadMore">{t("CreateRooms.load")}</option>
        )}
      </select>
      
      <label>{t("CreateRooms.image")}</label>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button type="submit">{t("CreateRooms.title")}</button>
    </form>
  );
};

export default function WrappedApp() {
  return (
    <Suspense>
      <CreateRooms />
    </Suspense>
  );
}