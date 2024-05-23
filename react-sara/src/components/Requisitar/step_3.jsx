import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Step3 = ({ handleDateSubmit }) => {
  const [selectedRange, setSelectedRange] = useState([null, null]);
  const [error, setError] = useState(null);

  const handleChange = (dates) => {
    const [start, end] = dates;
    const maxEndDate = start ? new Date(start.getTime() + 5 * 24 * 60 * 60 * 1000) : null;

    if (end && end > maxEndDate) {
      setSelectedRange([start, maxEndDate]);
      setError('Intervalo máximo de 5 dias.');
    } else {
      setSelectedRange(dates);
      setError(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedRange[0] || !selectedRange[1]) {
      setError('Selecione as datas de início e fim.');
      return;
    }
    handleDateSubmit(selectedRange[0], selectedRange[1]);
  };

  return (
    <div>
      <h3 className='mt-5 mb-5'>Selecionar Datas</h3>
      <div className="date-picker-container">
        <DatePicker
          selected={selectedRange[0]}
          onChange={handleChange}
          startDate={selectedRange[0]}
          endDate={selectedRange[1]}
          selectsRange
          inline
          dateFormat="dd/MM/yyyy"
          className="form-control"
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <button onClick={handleSubmit} className="bg-green-200 p-2 mt-2 text-black fw-bolder rounded-2">Confirmar Datas</button>
    </div>
  );
};

export default Step3;
