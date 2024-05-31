import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import pt from 'date-fns/locale/pt';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MapPin } from 'react-feather';

registerLocale('pt-PT', pt);
setDefaultLocale('pt-PT');

export default function Calendar({ onDateSelect }) {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
        onDateSelect(date);
    };

    const changeDateByDays = (days) => {
        const newDate = new Date(selectedDate);
        newDate.setDate(newDate.getDate() + days);
        handleDateChange(newDate);
    };

    const changeDateByWeeks = (weeks) => {
        changeDateByDays(weeks * 7);
    };

    const resetToToday = () => {
        const today = new Date();
        handleDateChange(today);
    };

    return (
        <div className="background-green-50 p-4 rounded-lg align-items-center ms-4" style={{ border: "1px solid #1C7A00" }}>
            <div className="d-flex align-items-center w-100">
                <button onClick={() => changeDateByWeeks(-1)} className="btn btn-light btn-outline-success mx-2" style={{ backgroundColor: "#fff", border: "1px solid #1C7A00" }}><ChevronsLeft style={{ color: "#1C7A00" }} /></button>
                <button onClick={() => changeDateByDays(-1)} className="btn mx-2" style={{ backgroundColor: "#fff", border: "1px solid #1C7A00" }}><ChevronLeft style={{ color: "#1C7A00" }} /></button>
                <div className="mx-2 d-flex flex-col">
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        dateFormat="dd 'de' MMMM 'de' yyyy, eeee"
                        locale="pt-PT"
                        className="text-center rounded-lg outline-green-900 border-green-900"
                    />
                </div>
                <button onClick={() => changeDateByDays(1)} className="btn btn-outline-success mx-2 text-green-900" style={{ backgroundColor: "#fff", border: "1px solid #1C7A00" }}><ChevronRight style={{ color: "#1C7A00" }} /></button>
                <button onClick={() => changeDateByWeeks(1)} className="btn btn-outline-success mx-2 text-green-900" style={{ backgroundColor: "#fff", border: "1px solid #1C7A00" }}><ChevronsRight style={{ color: "#1C7A00" }} /></button>
                <button onClick={resetToToday} className="btn btn-outline-success text-green-900 ms-auto d-flex" style={{ backgroundColor: "#fff", border: "1px solid #1C7A00" }}>
                    <MapPin style={{ marginRight: "0.5rem" }} />
                    Hoje
                </button>
            </div>
        </div>
    );
}
