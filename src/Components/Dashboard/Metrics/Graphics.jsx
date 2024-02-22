import { useState, useEffect } from "react";
import DateRangePicker from '../Date/Date';
import RankingChart from "../Metrics/MetricRankings/MetricRankings";
import MetricUsers from "../Metrics/MetricUsers/MetricUsers";
import BookingsChart from "../Metrics/MetricBookings/MetricBookings";
import CombinedCharts from "../Metrics/MetricNetIncomes/MetricNetIncomes";

const Graphics = () => {
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
        <div>
            <div>
                <span>Please, select a date to show</span>
                <DateRangePicker onSelectDateRange={handleDateRangeSelect} />
            </div>
            <div>
                <MetricUsers startDate={startDate} endDate={endDate}/>
                <RankingChart startDate={startDate} endDate={endDate}/>
                <BookingsChart startDate={startDate} endDate={endDate}/>
                <CombinedCharts startDate={startDate} endDate={endDate}/>
            </div>
        </div>
    );
}

export default Graphics;
