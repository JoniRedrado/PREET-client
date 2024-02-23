// Settings.js
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { countries } from "countries-list";
import { useTranslation } from "react-i18next";
import styles from "./Settings.module.css";
import FileInput from "../../Components/FileInput/FileInput";

const allCountries = Object.values(countries).map((country) => country.name);

const countryReferences = Object.values(countries).map((country) => ({
  name: country.name,
  reference: `+${country.phone}`,
}));

const Settings = () => {
  const { t } = useTranslation();

  const [userInfo, setUserInfo] = useState({
    name: "",
    last_name: "",
    email: "",
    birth_date: "",
    gender: "",
    phone_number: "",
    nationality: "",
  });

  const [editableFields, setEditableFields] = useState({
    name: false,
    last_name: false,
    email: false,
    birth_date: false,
    gender: false,
    phone_number: false,
    nationality: false,
  });

  const [editablePhoto, setEditablePhoto] = useState(false);
  const [phoneData, setPhoneData] = useState({
    codeArea: "",
    number: "",
  });

  const [profilePicture, setProfilePicture] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACK_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUserInfo({
          name: response.data.name,
          last_name: response.data.last_name,
          email: response.data.email,
          birth_date: response.data.birth_date,
          gender: response.data.gender,
          phone_number: response.data.phone_number,
          nationality: response.data.nationality,
        });
        setProfilePicture(response.data.profile_picture);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [token]);

  const handleEditClick = (field) => {
    setEditableFields({
      ...editableFields,
      [field]: true,
    });
  };

  const handleCancelClick = (field) => {
    setEditableFields({
      ...editableFields,
      [field]: false,
    });
  };

  const handleCancelClickPhoto = () => {
    setEditablePhoto(false);
  };

  const handleEditPhoto = () => {
    setEditablePhoto(true);
  };

  const handleChange = (e, field) => {
    setUserInfo({
      ...userInfo,
      [field]: e.target.value,
    });
  };

  const handlePhoneChange = (e) => {
    const { name, value } = e.target;
    setPhoneData({
      ...phoneData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    const reader = new FileReader();
    reader.onload = () => {
      setProfilePicture(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (selectedImage) {
      const formDataCloudinary = new FormData();
      formDataCloudinary.append("file", selectedImage);
      formDataCloudinary.append("upload_preset", "PREET2024");

      try {
        console.log("Uploading image to Cloudinary...");
        const responseCloudinary = await fetch(
          "https://api.cloudinary.com/v1_1/drntvj4ut/image/upload",
          {
            method: "POST",
            body: formDataCloudinary,
          }
        );

        const cloudinaryData = await responseCloudinary.json();

        if (cloudinaryData.secure_url) {
          const updatedUserInfo = {
            ...userInfo,
            profile_picture: cloudinaryData.secure_url,
          };

          axios
            .put(`${import.meta.env.VITE_BACK_URL}/users/profile`, updatedUserInfo, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => {
              setEditableFields({
                ...editableFields,
                phone_number: false,
              });
              setEditablePhoto(false)
              window.location.reload();
            })
            .catch((error) => {
              console.error("Error updating user information", error);
            });
        } else {
          console.error("Error: No 'secure_url' found in Cloudinary response");
        }
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
      }
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.header}>
        <div className={styles.titleContainer}>
          <h2 className={styles.mainTitle}>{t("Settings.title")}</h2>
          <h4>{t("Settings.subtitle")}</h4>
        </div>
        <div className={styles.imageContainer}>
          {profilePicture ? (
            <img src={profilePicture} alt="profile" className={styles.picture} />
          ) : (
            <h1 className={styles.nameText}>{userInfo.name.charAt(0).toUpperCase()}</h1>
          )}
        </div>
        <div className={styles.side}>
          {editablePhoto ? (
            <div className={styles.editableDiv}>
              <button onClick={handleCancelClickPhoto} className={styles.cancelImage}>
                Cancel
              </button>
              <FileInput onChange={handleImageChange} ref={fileInputRef} />
              <button onClick={handleSubmit} className={styles.imageButton}>
                Upload
              </button>
            </div>
          ) : (
            <div className={styles.noEditableDiv}>
              <button onClick={handleEditPhoto} className={styles.editImage}>
                Edit
              </button>
            </div>
          )}
        </div>
      </div>
      <div className={styles.formContainer}>
        <form>
          {Object.keys(userInfo).map((field) => (
            <div key={field} className={styles.fieldContainer}>
              <p className={styles.fieldName}>
                {field.charAt(0).toUpperCase() + field.slice(1).replace(/_/g, " ")}
              </p>
              {editableFields[field] ? (
                <div className={styles.editableField}>
                  {field === "birth_date" ? (
                    <input
                      type="date"
                      name={field}
                      placeholder={field}
                      value={userInfo[field]}
                      onChange={(e) => handleChange(e, field)}
                      className={styles.dateInput}
                    />
                  ) : field === "gender" ? (
                    <select
                      name={field}
                      value={userInfo[field]}
                      onChange={(e) => handleChange(e, field)}
                      className={styles.select}
                    >
                      <option value="">{t("Settings.gendSelect")}</option>
                      <option value="Male">{t("Settings.male")}</option>
                      <option value="Female">{t("Settings.female")}</option>
                      <option value="Non-binary">{t("Settings.NonBinary")}</option>
                      <option value="I prefer not to say">{t("Settings.nothing")}</option>
                    </select>
                  ) : field === "phone_number" ? (
                    <div className={styles.phoneInputContainer}>
                      <select
                        name={"codeArea"}
                        value={phoneData.codeArea || ""}
                        onChange={handlePhoneChange}
                        className={styles.codeAreaSelect}
                      >
                        {countryReferences.map((country, index) => (
                          <option key={index} value={country.reference}>
                            {country.name} ({country.reference})
                          </option>
                        ))}
                      </select>
                      <input
                        type="text"
                        name={"number"}
                        placeholder={t("Settings.phoneOpt")}
                        value={phoneData.number || ""}
                        onChange={handlePhoneChange}
                        className={styles.phoneInput}
                      />
                    </div>
                  ) : field === "nationality" ? (
                    <select
                      name={field}
                      value={userInfo[field]}
                      onChange={(e) => handleChange(e, field)}
                      className={styles.select}
                    >
                      {allCountries.map((country, index) => (
                        <option key={index} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      name={field}
                      value={userInfo[field]}
                      onChange={(e) => handleChange(e, field)}
                      className={styles.input}
                    />
                  )}
                </div>
              ) : (
                <span className={styles.actualInfo}>
                  {userInfo[field] ? userInfo[field] : `${t("Settings.addA")} ${
                      field.charAt(0).toUpperCase() + field.slice(1).replace(/_/g, " ")
                    }`}
                </span>
              )}
              <div className={styles.buttonContainer}>
                {editableFields[field] ? (
                  <div className={styles.editButtons}>
                    <button
                      type="button"
                      onClick={() => handleCancelClick(field)}
                      className={styles.cancelButton}
                    >
                      {t("Settings.cancel")}
                    </button>
                    <button type="submit" className={styles.saveButton}>
                      {t("Settings.save")}
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleEditClick(field)}
                    className={styles.editButton}
                  >
                    {t("Settings.edit")}
                  </button>
                )}
              </div>
            </div>
          ))}
        </form>
      </div>
    </div>
  );
};

export default Settings;