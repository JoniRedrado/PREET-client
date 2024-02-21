import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useDarkMode } from '../../../DarkModeContext/DarkModeContext';
import 'react-datepicker/dist/react-datepicker.css';
import  "./Date.module.css"

const DateRangePicker = ({ onSelectDateRange}) => {

  const { darkMode } = useDarkMode();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleDateRangeChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    onSelectDateRange(start, end);
  };

  return (
    <div >
      <DatePicker
        selected={startDate}
        onChange={handleDateRangeChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline
        className={`custom-datepicker`}
      />
    </div>
  );
};

export default DateRangePicker;