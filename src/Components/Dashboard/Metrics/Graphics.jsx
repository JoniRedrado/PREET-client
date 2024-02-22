import { useState, useEffect, Suspense } from "react";
import DateRangePicker from '../Date/Date';
import RankingChart from "../Metrics/MetricRankings/MetricRankings";
import MetricUsers from "../Metrics/MetricUsers/MetricUsers";
import BookingsChart from "../Metrics/MetricBookings/MetricBookings";
import CombinedCharts from "../Metrics/MetricNetIncomes/MetricNetIncomes";
import styles from "./Graphics.module.css"
import { useTranslation } from "react-i18next";

const Graphics = () => {
    const { t } = useTranslation();

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    // Calcula las fechas por defecto del último mes cuando se monta el componente
    useEffect(() => {
        const today = new Date();
        const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
        setStartDate(lastMonth);
        setEndDate(today);
    }, []);

    const handleDateRangeSelect = (startDate, endDate) => {
        setStartDate(startDate);
        setEndDate(endDate);
    };

    return (
        <div className={styles.mainDiv}>
            <div className={styles.statementDiv}>
                <span>{t("dashboard.selectDate")}</span>
                <DateRangePicker onSelectDateRange={handleDateRangeSelect} />
            </div>
            <div className={styles.graphicsDiv}>
                <div className={styles.graphics1}>
                    <MetricUsers startDate={startDate} endDate={endDate}/>
                    <CombinedCharts startDate={startDate} endDate={endDate}/>
                </div>
                <div className={styles.graphics2}>
                    <BookingsChart startDate={startDate} endDate={endDate}/>
                    <RankingChart startDate={startDate} endDate={endDate}/>
                </div>
            </div>
        </div>
    );
}

export default function WrappedApp() {
    return (
      <Suspense>
        <Graphics />
      </Suspense>
    );
  }
