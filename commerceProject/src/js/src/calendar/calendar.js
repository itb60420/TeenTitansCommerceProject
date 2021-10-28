import React, { useState } from 'react'
import CalendarPicker from './calendar-picker';
import './calendar.css';
import Button from 'react-bootstrap/Button';

const Calendar = () => {
    const [startDay, setStartDay] = useState('');
    const [endDay, setEndDay] = useState('');
    const KEYMAP_TO_DB = "http://localhost:8080/calendar/submit"

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
    
    const submitClick = () => {

    }

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(e);
        const check1 = validate_day(startDay);
        const check2 = validate_day(endDay);

        const validated = check1 && check2 ? true : false;
        try {
        validated ? (
                fetch(KEYMAP_TO_DB, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({startDay: startDay, endDay: endDay})
            })
            .then(console.log(JSON.stringify({startDay: startDay, endDay: endDay})))
            .then()
        ) : alert("Select two days before submitting.");
    } catch(error) {
        console.log(error);
    }
}

    function validate_day (day) {
        
        return day ? true : false;
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