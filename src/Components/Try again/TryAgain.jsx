/* eslint-disable react/no-unknown-property */
import { useTranslation } from "react-i18next";
import notFound from "../../assets/notFound.png";
import "./TryAgain.styles.css";

const tryAgain = () => {
  const { t } = useTranslation();

  return (
    <div className="conLoa">
      <img src={notFound} alt="Hotel-Not-Found" />
      <h1 className="not">{t("TryAgain.message")}</h1>
    </div>
  );
};

export default tryAgain;
