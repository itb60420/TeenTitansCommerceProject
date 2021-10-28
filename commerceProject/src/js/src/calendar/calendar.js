import React, { useState } from 'react'
import CalendarPicker from './calendar-picker';
import './calendar.css';

const Calendar = () => {
    const [startDay, setStartDay] = useState('');
    const [endDay, setEndDay] = useState('');
    const KEYMAP_TO_DB = "localhost:8080/calendar/submit"

    const handle_startDay= (day) => {
        const newDate = new Date(day.getFullYear(), day.getMonth(), day.getDate());
        setStartDay(newDate);
    };

    const handle_endDay=(day) => {
        if(day && day !== '') {
        const newDate = new Date(day.getFullYear(), day.getMonth(), day.getDate());
        setEndDay(newDate);
        }
        else setEndDay('');
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(e);
        
    }
    return(
    <>
        <CalendarPicker startDay={startDay} endDay={endDay} handle_startDay={handle_startDay} handle_endDay={handle_endDay}/>
        <form id="submit-reservation" action={KEYMAP_TO_DB} method="post" onSubmit={onSubmit}>
            <input id="form-start" required="required" type="text" name="startDay" value={startDay} onChange={handle_startDay}/>
            <input id="form-end" required="required" type="text" name="endDay" value={endDay} onChange={handle_endDay}/>
            <button id="submit" type="submit" value="Submit"/>
        </form>
    </>
    )
}

export default Calendar;