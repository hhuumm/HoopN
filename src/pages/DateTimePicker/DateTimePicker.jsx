import React, { Component, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

// class DateTimePicker extends Component {
//     state = {
//         date: ''
//     }

//     render() {

const DateTimePicker = () => {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <div>
            <DatePicker
                selected={startDate}
                onChange={date => setStartDate(date)}
                dateFormat="MMMM d, yyyy h:mm aa"
                showTimeSelect
                minDate={new Date()}
            />
        </div>
    );
};
// }

export default DateTimePicker;