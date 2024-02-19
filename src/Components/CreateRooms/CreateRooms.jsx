// import axios from "axios"
// import { useState } from "react";
// import "./CreateRooms.modules.css"

// const CreateRooms = ({hotelId}) =>{

//     const [roomData, setRoomData] = useState({
//         numeration:"",
//         type:"",
//         description:"",
//         price:"",
//         guest:"",
//         image:null
//     })

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setRoomData({ ...roomData, [name]: value });
//     };

//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         setRoomData({ ...roomData, image: file });
//       };
    
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//           await axios.post(`${import.meta.env.VITE_BACK_URL}/rooms/${hotelId}`, roomData);
//           // Lógica adicional después de la creación exitosa de la habitación
//         } catch (error) {
//           console.error(error.message);
//         }
//     };

//     return(
//         <form onSubmit={handleSubmit}>
//         <input type="text" name="type" placeholder="Type" value={roomData.type} onChange={handleChange} />
//         <input type="text" name="numeration" placeholder="Numeration" value={roomData.numeration} onChange={handleChange} />
//         <input type="text" name="price" placeholder="Price" value={roomData.price} onChange={handleChange} />
//         <input type="text" name="guest" placeholder="Guest" value={roomData.guest} onChange={handleChange} />
//         <input type="text" name="image" placeholder="Image URL" value={roomData.image} onChange={handleChange} />
//         <input type="text" name="description" placeholder="Description" value={roomData.description} onChange={handleChange} />
//         <button type="submit">Create Room</button>
//       </form>
//     )
// }

// export default CreateRooms;

import axios from "axios";
import { useState } from "react";

const CreateRoomForm = ({ hotelId }) => {
  const [formData, setFormData] = useState({
    type: "",
    numeration: "",
    price: "",
    guest: "",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
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
      await axios.post(`${import.meta.env.VITE_BACK_URL}/rooms/${hotelId}`, roomData);
      // Lógica adicional después de la creación exitosa de la habitación
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  return (
    <form  className="form" onSubmit={handleSubmit}>
      <input type="text" name="type" placeholder="Type" value={formData.type} onChange={handleChange} />
      <input type="text" name="numeration" placeholder="Numeration" value={formData.numeration} onChange={handleChange} />
      <input type="text" name="price" placeholder="Price" value={formData.price} onChange={handleChange} />
      <input type="text" name="guest" placeholder="Guest" value={formData.guest} onChange={handleChange} />
      <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button type="submit">Create Room</button>
    </form>
  );
};

export default CreateRoomForm;