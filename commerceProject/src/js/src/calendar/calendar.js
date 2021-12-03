import React, { useState, useEffect } from 'react'
import CalendarPicker from './calendar-picker';
import './calendar.css';
import Button from 'react-bootstrap/Button';
import { useHistory, useRouteMatch, useLocation } from 'react-router';
import { FormGroup, Form } from 'react-bootstrap';
import {Login} from '../login/login.component'

const Calendar = (props) => {
    const [cubicleName, setCubicleName] = useState(0);
    const [cubicleList, setCubicleList] = useState([0,1,2,3,4,6,7,8,9]);
    const [loading, setLoading] = useState(true);
    const [startDay, setStartDay] = useState();
    const [endDay, setEndDay] = useState();
    const [selected, setSelected] = useState(false);
    const userID = props.userID;
    const location = useLocation();
    const history = useHistory();
    const match = useRouteMatch();
    const KEYMAP_TO_DB = `http://localhost:8080/reservation`;
    const today = new Date();
    const workingHours = 9;
    const closingHours = 18;
    
    const fetchData = async () => {
        if(startDay && endDay) {
        const resp = await fetch(`${KEYMAP_TO_DB}/update?start=${startDay.getTime()}&end=${endDay.getTime()}`);
        if(resp.ok) {
            console.log(resp.body);
            var data = await resp.json();
            console.log(data);
            setCubicleList(data);
        }
        else 
            console.log(resp.status);
    }
    }

    useEffect(() => {
        if(selected) {   
            console.log(selected)     
            const data = async () => {
                await fetchData();
            }
            data();
        }
        setLoading(false);
    }, [selected])

    const handle_startDay= (day) => {
        const newDate = packDay(day)
        setStartDay(newDate);
    };

    const handle_endDay=(day) => {
        const newDate = packDay(day);
        setEndDay(newDate);
        }

    const handle_cubicleName=(name) => {
        setCubicleName(name);
    }

    const handle_cubicles=(bool)=> {
        setSelected(bool);
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
        console.log(JSON.stringify({reservationStart : startDay.getTime(), reservationEnd: endDay.getTime(), reservationOwnerId : userID, cubicleName: cubicleName}))
        //validated && id ? (
            validate_day(startDay) && validate_day(endDay) ? (
                await fetch(`${KEYMAP_TO_DB}/submit`, {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({reservationStart : startDay.getTime(), reservationEnd: endDay.getTime(), reservationOwnerId : userID, cubicleName: cubicleName})
            })
            .then(resp => resp.json())
            .then(history.push("/"))
            .catch(error => console.log(error))
        ) : alert("Ensure your selection is valid.");
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
    {loading ? 
    <div className="loading">
    </div>
    :
    <div>

        <CalendarPicker 
        startDay={startDay} 
        endDay={endDay}
        workingHours = {workingHours}
        closingHours = {closingHours}
        handle_startDay={handle_startDay} 
        handle_endDay={handle_endDay}
        handle_cubicles={handle_cubicles} 
        startTime={startDay ? startDay.getHours() : null}
        endTime={endDay ? endDay.getHours() : null}
        />
        <form>
        <div className="calendar">
            <div className="subBtn">
            <Button variant="outline-success" id="submit-reservation" type="submit" 
            onClick={handle_submit} 
            disabled={!startDay || !endDay }>Submit</Button>{''}
            </div>
            <div className = "cubicleSel">
                <p>Cubicle Number: </p>
               
                    <FormGroup>
                        <Form.Control as="select" onChange={(e) => handle_cubicleName(e.target.value)} defaultValue={cubicleList[0]}>
                            {
                                cubicleList.map((name) => {
                                    return <option value={name} key={name}>{name + 1} </option>
                                })
                            }
                        </Form.Control>
                    </FormGroup>
                </div>
             </div>
        </form>
    </div>
    }
    </>
    )

}
    export default Calendar;
