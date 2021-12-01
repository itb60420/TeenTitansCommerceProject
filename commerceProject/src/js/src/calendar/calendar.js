import React, { useState, useEffect } from 'react'
import CalendarPicker from './calendar-picker';
import './calendar.css';
import Button from 'react-bootstrap/Button';
import { useHistory, useRouteMatch, useLocation, useParams } from 'react-router';

const Calendar = (props) => {
    const [state, setState] = useState();
    const [loading, setLoading] = useState(true);
    const [startDay, setStartDay] = useState();
    const [endDay, setEndDay] = useState();
    const { userID, isModify } = useParams();
    const location = useLocation();
    const history = useHistory();
    const match = useRouteMatch();
    const KEYMAP_TO_DB = "http://localhost:8080/users/reservation";
    const today = new Date();
    const workingHours = 9;
    const closingHours = 18;

    useEffect(() => {
        if(isModify) {
            fetchData();
            setStartDay(state.startDay)
            setEndDay(state.endDay);
        }
        setLoading(false);
    }, [])

    const handle_startDay= (day) => {
        const newDate = packDay(day)
        setStartDay(newDate);
    };

    const handle_endDay=(day) => {
        const newDate = packDay(day);
        setEndDay(newDate);
        }
    

    const packDay=(day) => {
        if (day && day !== '') {
            const newDate = day.getFullYear() < today.getFullYear() ? 
            new Date(today.getFullYear(), day.getMonth(), day.getDate(), day.getHours())
            : new Date(day.getFullYear(), day.getMonth(), day.getDate(), day.getHours());
            return newDate;
        }
        else return '';
    }

    const handle_submit = async (e) => {
        e.preventDefault();
        console.log(e);
        console.log(JSON.stringify({startDay : startDay.getTime(), endDay: endDay.getTime(), userID : {userID}}))
        const check1 = validate_day(startDay);
        const check2 = validate_day(endDay);
        const link = isModify ? '/edit' : '/submit'
        const method = isModify ? 'PUT' : 'POST'
        const resID = state ? state.reservationID : null;

        const validated = check1 && check2 ? true : false;
        //validated && id ? (
            validated ? (
                await fetch(`${KEYMAP_TO_DB}${link}`, {
                method: {method},
                credentials: 'same-origin',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({startDay : startDay.getTime(), endDay: endDay.getTime(), userID : {userID}, reservationID: resID})
            })
            .then(resp => resp.json())
            .then(data => console.log(data))
            .catch(error => console.log(error))
        ) : alert("Ensure your selection is valid.");
}

    const fetchData = async () => { 
        const resp = await fetch(`${KEYMAP_TO_DB}`);
        if(resp.ok) {
            var data = await resp.json();
            setState(data);
        }
        else 
            console.log(resp.status);
    }

    function validate_day (day) {
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
        <CalendarPicker 
        startDay={startDay} 
        endDay={endDay}
        workingHours = {workingHours}
        closingHours = {closingHours}
        handle_startDay={handle_startDay} 
        handle_endDay={handle_endDay} 
        startTime={startDay ? startDay.getHours() : null}
        endTime={endDay ? endDay.getHours() : null}
        loading={loading}
        />
        <form>
        <div>
            <div className="form-group">
            <Button variant="outline-success" id="submit-reservation" type="submit" 
            onClick={handle_submit} 
            disabled={!startDay || !endDay }>Submit</Button>{''}
            </div>
        </div>
        </form>
    </>
    )

}
    export default Calendar;
