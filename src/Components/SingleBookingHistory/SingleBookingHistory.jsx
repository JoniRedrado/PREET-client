/* eslint-disable react/prop-types */
import { Suspense } from "react";
import { useTranslation } from "react-i18next";

import "./SingleBookingHistory.styles.css";

const SingleBooking = ({
  image,
  room,
  amount,
  nights,
  dateInit,
  dateFinal,
}) => {
  const { t } = useTranslation();

  return (
    <div className="reservation-card">
      <div className="image-container">
        <img src={image} alt="imagenHotel" className="reservation-image" />
      </div>
      <div className="reservation-info">
        <h3>{room}</h3>
        <p>
          {t("SingHistBkng.from")} <strong>{dateInit.slice(0, 10)}</strong>
          {t("SingHistBkng.to")}
          <strong>{dateFinal.slice(0, 10)}</strong>
          <span>
            ({nights} {t("SingHistBkng.nights")})
          </span>
        </p>
        <p>
          {t("SingHistBkng.amount")} <span>${amount}</span>
        </p>
      </div>
    </div>
  );
};

export default function WrappedApp() {
  return (
    <Suspense>
      <SingleBooking />
    </Suspense>
  );
}
