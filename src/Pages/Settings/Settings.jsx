import { useState, useEffect, Suspense } from "react";
import axios from "axios";
import { countries } from "countries-list";
import { useTranslation } from "react-i18next";
import styles from "./Settings.module.css";

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

  const [phoneData, setPhoneData] = useState({
    codeArea: "",
    number: "",
  });

  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACK_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUserInfo(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    let updatedUserInfo;
    if (phoneData.number) {
      updatedUserInfo = {
        ...userInfo,
        phone_number: `${phoneData.codeArea} ${phoneData.number}`,
      };
    } else {
      updatedUserInfo = userInfo;
    }

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
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error updating user information", error);
      });
  };

  if (loading) {
    return <div>{t("Favorites.loading")}</div>;
  }

  return (
    <div className={styles.mainContainer}>
      <h2 className={styles.mainTitle}>{t("Settings.title")}</h2>
      <h4>{t("Settings.subtitle")}</h4>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          {Object.keys(userInfo).map((field) => (
            <div key={field} className={styles.fieldContainer}>
              <p className={styles.fieldName}>
                {field.charAt(0).toUpperCase() +
                  field.slice(1).replace(/_/g, " ")}
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
                      <option value="male">{t("Settings.male")}</option>
                      <option value="female">{t("Settings.female")}</option>
                    
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
                  {userInfo[field]
                    ? userInfo[field]
                    : `${t("Settings.addA")} ${
                        field.charAt(0).toUpperCase() +
                        field.slice(1).replace(/_/g, " ")
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

export default function WrappedApp() {
  return (
    <Suspense>
      <Settings />
    </Suspense>
  );
}
