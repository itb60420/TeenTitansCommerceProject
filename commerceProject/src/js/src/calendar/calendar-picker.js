import React, { Component } from 'react';
import CalendarDays from './calendar-days';
import ChevronLeft from './chevronLeft';
import ChevronRight from './chevronRight';
import './calendar-picker.css';
import { FormGroup, Form } from 'react-bootstrap';
export default class CalendarPicker extends Component {
    constructor(props) {
        super(props);

        this.daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        this.months = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        this.hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
        this.state = {
            today: new Date(),
            viewDay: new Date(),
            startTime: this.hours[0] - 6,
            endTime: this.hours[0] - 6
        }
    }

    setStartTime = (value, day) => {
        if (day)
            this.props.handle_startDay(new Date(day.getFullYear(), day.getMonth(), day.getDate(), value - 6));
        this.setState({ startTime: value - 6});
    }

    setEndTime = (value, day) => {
        if(day)
            this.props.handle_endDay(new Date(day.getFullYear(), day.getMonth(), day.getDate(), value - 6));
        this.setState({ endTime: value - 6})
    }

    changeStartDay = (day) => {
        this.props.handle_startDay(new Date(day.year, day.month, day.number, this.state.startTime));
    }

    changeEndDay = (day) => {
        if(day) {
          this.props.handle_endDay(new Date(day.year, day.month, day.number, this.state.endTime));
        } 
        else this.props.handle_endDay('');
    }

    changeViewDay = (day) => {
        this.setState({ viewDay: new Date(day.year, day.month, day.number) })
    }

    changeDiplayStart = (text) => {
        this.setState({displayStart: new Date(text)});
    }

    userChangeStartDay = (text) => {

        this.props.handle_startDay(new Date(text));
    }

    userChangeEndDay = (text) => {

        this.props.handle_endDay(new Date(text));
    }

    timerStart = (text) => {
        setTimeout(() => {
            this.userChangeStartDay(text)
        }, 500);
    }

    timerEnd = (text) => {
        setTimeout(() => {
            this.userChangeEndDay(text)
        }, 500);
    }

    componentDidUpdate(prevProps, prevState, snapshot, timer) {
        console.log("updated");
        clearTimeout(this.timerStart);
        clearTimeout(this.timerEnd);
    }

    render() {
        let displayStart = this.props.startDay ? "" + (this.months[this.props.startDay.getMonth()] + " " + this.props.startDay.getDate() + ", " + this.props.startDay.getFullYear()) : "";
        let displayEnd = this.props.endDay ? "" + (this.months[this.props.endDay.getMonth()] + " " + this.props.endDay.getDate() + ", " + this.props.endDay.getFullYear()) : "";
        return ( 
        <div className = "calendar" >

            <div className = "startDayCollection" > 
                <input type="text" className="txtStart" name="startDay" onChange={(e) => this.timerStart(e.target.value)} />
                <label for="startDay" className="lbStart">MM/DD/YY</label>
            </div>
            <div className="starttime">
                    <FormGroup>
                    <Form.Control as="select" custom onChange={(e) => this.setStartTime(e.target.value, this.props.startDay)} defaultValue={this.hours[0]}>
                        {
                            this.hours.map((hour) => {
                                let time = hour > 11 ? "PM" : "AM"
                                let mod = hour % 13;
                                if (mod < this.hours[0])
                                    mod += 1;
                                return <option value={hour}>{mod} {time} </option>
                            })
                        }
                    </Form.Control>
                    </FormGroup>
            </div>
            <div className = "endDayCollection" > 
                <input type="text" className="txtEnd" name="endDay" onChange={(e) => this.timerEnd(e.target.value)} />
                <label for="endDay" className="lbEnd">MM/DD/YY</label>
            </div>
            <div className="endtime">
                    <FormGroup>
                    <Form.Control as="select" custom onChange={(e) => this.setEndTime(e.target.value, this.props.endDay)} defaultValue={this.hours[0]}>
                        {
                            this.hours.map((hour) => {
                                let time = hour > 11 ? "PM" : "AM"
                                let mod = hour % 13;
                                if (mod < this.hours[0])
                                    mod += 1;
                                return <option value={hour}>{mod} {time} </option>
                            })
                        }
                    </Form.Control>
                    </FormGroup>
                </div>
          <div className = "calendar-header" >
            <h2 >
            <div className="startDay">
            { displayStart } 
            </div>
            </h2> 
            <div className = "endDay" >
            <h2> 
            { displayEnd } 
            </h2>
            </div>
            </div>
            <div className = "calendar-body" >
            <div className = "viewDay">
            <h1>
            <ChevronLeft viewDay = { this.state.viewDay }
            changeViewDay = { this.changeViewDay }/> 
            { this.months[this.state.viewDay.getMonth()] } 
            <ChevronRight viewDay = { this.state.viewDay }
            changeViewDay = { this.changeViewDay }/> 
            </h1> 
            </div> 
            <div className = "table-header" > {
                this.daysOfWeek.map((day) => {
                    return <div className = "weekday"><p> { day } </p></div>
                })
            } </div> 
            <CalendarDays viewDay = { this.state.viewDay }
            today = { this.state.today }
            startDay = { this.props.startDay }
            endDay = { this.props.endDay }
            changeStartDay = { this.changeStartDay }
            changeEndDay = { this.changeEndDay }
            changeStartTime = {this.changeStartTime}
            changeEndTime = {this.changeEndTime}
            /> 
            </div> 
            </div>
        )
    }
}