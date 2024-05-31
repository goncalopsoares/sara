import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './StepStyles.css';
import ErrorModal from './ErrorModal';
import { ArrowLeft, ArrowRight } from 'react-feather';
import { useStateContext } from '../../contexts/contextprovider';

const Step3 = ({ goToPreviousStep, handleDateSubmit }) => {
    const [selectedRange, setSelectedRange] = useState([null, null]);
    const [error, setError] = useState(null);
    const {user}=useStateContext();

    const setToSpecificTime = (date, hours, minutes) => {
        if (!date) return null;
        const newDate = new Date(date);
        newDate.setHours(hours, minutes, 0, 0);
        return newDate;
    };

    const handleChange = (dates) => {
        let [start, end] = dates;
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Check if start date is a weekend day or before today
        if (start && (start.getDay() === 0 || start.getDay() === 6 || start < today)) {
            setError('Selecione uma data de recolha válida.');
            return;
        }

        // Check if end date is a weekend day or before today
        if (end && (end.getDay() === 0 || end.getDay() === 6 || end < today)) {
            setError('Selecione uma data de devolução válida.');
            return;
        }

        const maxEndDate = start ? new Date(start.getTime() + 5 * 24 * 60 * 60 * 1000) : null;

        // Check if end date exceeds maximum allowed range
        if (end && end > maxEndDate) {
            end = maxEndDate;
            setError('Intervalo máximo de 5 dias.');
        } else {
            setError(null);
        }

        setSelectedRange([start, end]);
    };

    const handleSubmit = () => {
        if (!selectedRange[0] || !selectedRange[1]) {
            setError('Selecione as datas de início e fim.');
            return;
        }

        // Check if start date is a weekend day or before today
        if (selectedRange[0].getDay() === 0 || selectedRange[0].getDay() === 6 || selectedRange[0] < new Date()) {
            setError('Selecione uma data de recolha válida.');
            return;
        }

        // Check if end date is a weekend day or before today
        if (selectedRange[1].getDay() === 0 || selectedRange[1].getDay() === 6 || selectedRange[1] < new Date()) {
            setError('Selecione uma data de devolução válida.');
            return;
        }

        const startWithTime = user.tipo_utilizador === 2 ? setToSpecificTime(selectedRange[0], 9, 0) : setToSpecificTime(selectedRange[0], 14, 0);
        const endWithTime = user.tipo_utilizador === 2 ? setToSpecificTime(selectedRange[1], 18, 0) : setToSpecificTime(selectedRange[1], 12, 0);

        handleDateSubmit(startWithTime, endWithTime);
    };

    const weekDayNames = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

    const dayClassName = (date) => {
        // Check if the day is Saturday or Sunday
        if (date.getDay() === 0 || date.getDay() === 6) {
            return 'react-datepicker-weekend';
        }
        return null;
    };

    return (
        <>
        {user.tipo_utilizador ===3 && (
            <div>
            <div className="row">
                <div style={{ fontSize: '0.8rem' }} className="fw-bold col-6">
                    Recolha
                </div>
                <div style={{ fontSize: '0.8rem' }} className="fw-bold col-6">
                    Devolução
                </div>
            </div>
            
            <div className="row">
                <div style={{ fontSize: '0.8rem', marginBottom: '1rem' }} className="col-6">
                    A partir das 14:00
                </div>
                <div style={{ fontSize: '0.8rem', marginBottom: '1rem' }} className="col-6">
                    Até às 12:00
                </div>
            </div>
           

            <div className="row">
                <div
                    style={{
                        fontSize: '0.8rem',
                        marginBottom: '1rem',
                        color: selectedRange[0] ? '#68AF00' : '#818181',
                    }}
                    className="col-6"
                >
                    {selectedRange[0] ? selectedRange[0].toLocaleDateString() : 'Por definir'}
                </div>
                <div
                    style={{
                        fontSize: '0.8rem',
                        marginBottom: '1rem',
                        color: selectedRange[1] ? '#68AF00' : '#818181',
                    }}
                    className="col-6"
                >
                    {selectedRange[1] ? selectedRange[1].toLocaleDateString() : 'Por definir'}
                </div>
            </div>
            </div>
            )}
{user.tipo_utilizador ===2 && (
            <div>
            <div className="row">
                <div style={{ fontSize: '0.8rem' }} className="fw-bold col-6">
                    Recolha
                </div>
                <div style={{ fontSize: '0.8rem' }} className="fw-bold col-6">
                    Devolução
                </div>
            </div>
            <div className="row">
                <div style={{ fontSize: '0.8rem', marginBottom: '1rem' }} className="col-6">
                    A partir das 9:00
                </div>
                <div style={{ fontSize: '0.8rem', marginBottom: '1rem' }} className="col-6">
                    Até às 18:00
                </div>
            </div>
            <div className="row">
                <div
                    style={{
                        fontSize: '0.8rem',
                        marginBottom: '1rem',
                        color: selectedRange[0] ? '#68AF00' : '#818181',
                    }}
                    className="col-6"
                >
                    {selectedRange[0] ? selectedRange[0].toLocaleDateString() : 'Por definir'}
                </div>
                <div
                    style={{
                        fontSize: '0.8rem',
                        marginBottom: '1rem',
                        color: selectedRange[1] ? '#68AF00' : '#818181',
                    }}
                    className="col-6"
                >
                    {selectedRange[1] ? selectedRange[1].toLocaleDateString() : 'Por definir'}
                </div>
            </div>
        </div>
            )}



            <div>
                <div className="date-picker-container" style={{ marginTop: "0rem" }}>
                    <DatePicker
                        selected={selectedRange[0]}
                        onChange={handleChange}
                        startDate={selectedRange[0]}
                        endDate={selectedRange[1]}
                        selectsRange
                        inline
                        dateFormat="dd/MM/yyyy"
                        className="form-control custom-datepicker"
                        highlightDates={(date) => {
                            if (selectedRange[0] && selectedRange[1]) {
                                return date >= selectedRange[0] && date <= selectedRange[1];
                            }
                            return false;
                        }}
                        customInput={<CustomDatePickerInput />}
                        popperModifiers={{
                            preventOverflow: {
                                enabled: true,
                                escapeWithReference: false,
                                boundariesElement: 'viewport',
                            },
                        }}
                        weekDayNames={weekDayNames}
                        dayClassName={dayClassName} // Pass the dayClassName function here
                        minDate={new Date()} // Disable all previous dates
                    />
                </div>
                {error && (
                    <div style={{ color: 'red', fontSize: '0.8rem', marginTop: '0.5rem' }}>
                        {error}
                    </div>
                )}
                <div className="d-flex justify-content-between">
                    <button
                        className='btn btn-sara-secondary'
                        onClick={goToPreviousStep}
                    >
                        <ArrowLeft className='inline-block align-middle me-3' />
                        <span className="text-uppercase" style={{ fontSize: "0.8rem" }}>Voltar</span>
                    </button>
                    <button
                        onClick={handleSubmit}
                        className='btn btn-sara-primary'
                        disabled={!selectedRange[0] || !selectedRange[1]}
                    >
                        <span className="text-uppercase" style={{ fontSize: "0.8rem" }}>Continuar</span>
                        <ArrowRight className='inline-block align-middle ms-3' />
                    </button>
                </div>
            </div>
        </>
    );
};

const CustomDatePickerInput = ({ value, onClick }) => (
    <button className="custom-datepicker-input" onClick={onClick}>
        {value}
    </button>
);

export default Step3;
