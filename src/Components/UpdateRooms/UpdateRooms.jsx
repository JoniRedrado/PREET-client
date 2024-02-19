import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, Suspense } from "react";
// import NavBarDashboard from "../Dashboard/NavBarDashboard/NavBarDashboard";
import { useTranslation } from "react-i18next";
import "./UpdateRooms.modules.css";

const UpdateRooms = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [roomsData, setRoomsData] = useState({
    type: "",
    description: "",
    price: "",
    guest: "",
    numeration: "",
    image: null,
  });

  useEffect(() => {
    const fecthRoomsData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACK_URL}/rooms/detail/${id}`,
          roomsData
        );
        // console.log(response.data);
        setRoomsData(response.data);
      } catch (error) {
        console.error("Error fetching rooms data:", error);
      }
    };
    fecthRoomsData();
  }, [id]);

  const [roomsTypes, setRoomsTypes] = useState([]);

  const getTypes = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACK_URL}/rooms`
      );
      console.log(data);

      const roomTypes = data.map((room) => room.type);
      const uniqueRoomTypes = [...new Set(roomTypes)];

      console.log(uniqueRoomTypes);
      setRoomsTypes(uniqueRoomTypes);
    } catch (error) {
      console.error("Error fetching rooms types:", error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomsData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    getTypes();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      try {
        const imagePreviewURL = URL.createObjectURL(file);

        setRoomsData((prevData) => ({
          ...prevData,
          image: imagePreviewURL,
        }));
      } catch (error) {
        console.error("Error creating object URL for image:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUpdate = roomsData.image;

    if (roomsData.image && roomsData.image.startsWith("blob:")) {
      const formData = new FormData();
      formData.append(
        "file",
        e.target.querySelector('input[type="file"]').files[0]
      );
      formData.append("upload_preset", "PREET2024");

      try {
        const responseCloudinary = await fetch(
          "https://api.cloudinary.com/v1_1/drntvj4ut/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        const cloudinaryData = await responseCloudinary.json();

        if (cloudinaryData.secure_url) {
          imageUpdate = cloudinaryData.secure_url;
        } else {
          console.error("Error: No 'secure_url' found in Cloudinary response");
        }
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
      }
    }

    const updatedData = {
      ...roomsData,
      image: imageUpdate,
    };

    try {
      await axios.put(
        `${import.meta.env.VITE_BACK_URL}/rooms/update/${id}`,
        updatedData
      );
      navigate("/dashboard/rooms");
    } catch (error) {
      console.error("Error updating room:", error);
    }
  };

  return (
    <div>
      {/* <NavBarDashboard/> */}
      <form className="form" onSubmit={handleSubmit}>
        <h1>{t("UpdateRooms.title")}</h1>
        <label>{t("UpdateRooms.types")}</label>
        <select name="type" value={roomsData.type} onChange={handleChange}>
          <option value="">{t("UpdateRooms.SelectType")}</option>
          {roomsTypes.map((roomType, index) => (
            <option key={index} value={roomType}>
              {roomType}
            </option>
          ))}
        </select>
        <label>{t("UpdateRooms.description")}</label>
        <input
          type="text"
          name="description"
          value={roomsData.description}
          onChange={handleChange}
        ></input>
        <label>{t("UpdateRooms.price")}</label>
        <input
          type="number"
          name="price"
          value={roomsData.price}
          onChange={handleChange}
        ></input>
        <label>{t("UpdateRooms.numeration")}</label>
        <input
          type="text"
          name="numeration"
          value={roomsData.numeration}
          onChange={handleChange}
        ></input>
        <div>
          {roomsData.image && (
            <div>
              <h3>{t("UpdateRooms.crntImage")}</h3>
              <img src={roomsData.image} alt="Imagen Actual" />
            </div>
          )}
          <label>{t("UpdateRooms.newImage")}</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        <button type="submit">{t("UpdateRooms.update")}</button>
      </form>
    </div>
  );
};

export default function WrappedApp() {
  return (
    <Suspense>
      <UpdateRooms />
    </Suspense>
  );
}
