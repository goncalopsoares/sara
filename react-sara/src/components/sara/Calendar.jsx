import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import pt from 'date-fns/locale/pt';

registerLocale('pt-PT', pt);
setDefaultLocale('pt-PT');

export default function Calendar({ onDateSelect }) {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
        onDateSelect(date);
    };

    return (
        <div>
            <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="dd 'de' MMMM 'de' yyyy, eeee"
                locale="pt-PT"
                className="form-control text-center"
                wrapperClassName="w-50"
            />
        </div>
    );
}
