import React, { useState } from 'react'
import CalendarPicker from './calendar-picker';
import './calendar.css';
import Button from 'react-bootstrap/Button';

const Calendar = ({userID}) => {
    const [startDay, setStartDay] = useState();
    const [endDay, setEndDay] = useState();
    const KEYMAP_TO_DB = "http://localhost:8080/calendar/submit"
    console.log(userID);

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
    
    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(e);
        console.log(JSON.stringify({startDay: startDay, endDay: endDay, id: userID}))
        const check1 = validate_day(startDay);
        const check2 = validate_day(endDay);

        const validated = check1 && check2 ? true : false;
        //validated && userID ? (
            validated ? (
                fetch(KEYMAP_TO_DB, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({startDay: startDay, endDay: endDay, id: userID})
            })
            .then(resp => resp.json())
            .then(data => console.log(data))
            .catch(error => console.log(error))
        ) : alert("Ensure your selection is valid.");
}

    function validate_day (day) {
        const today = new Date();
        let todayTrimmed = new Date(today.getFullYear(), today.getMonth(), today.getDate())
        const cutoffStart = new Date(today.getFullYear(), today.getMonth() + 3, today.getDate())
        const cutoffEnd = new Date(today.getFullYear(), today.getMonth() + 6, today.getDate())
        if(day && day === startDay)
            return day >= todayTrimmed && day <= cutoffStart;
        else
            return day >= startDay && day <= cutoffEnd;
    }
    return(
    <>
        <CalendarPicker startDay={startDay} endDay={endDay} handle_startDay={handle_startDay} handle_endDay={handle_endDay}/>
        <form>
        <div>
            <div className="form-group">
            <Button variant="outline-success" id="submit-reservation" type="submit" 
            onClick={onSubmit} 
            disabled={!startDay || !endDay }>Submit</Button>{''}
            </div>
        </div>
        </form>
    </>
    )
}

export default Calendar;