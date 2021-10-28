import React, { Component } from 'react';
import CalendarDays from './calendar-days';
import ChevronLeft from './chevronLeft';
import ChevronRight from './chevronRight';
import './calendar-picker.css';

export default class CalendarPicker extends Component {
    constructor(props) {
        super(props);

        this.daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        this.months = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        this.state = {
            today: new Date(),
            viewDay: new Date(),
        }
    }

    // changeStartDay = (day) => {
    //     this.setState({ startDay: new Date(day.year, day.month, day.number) });
    // }
    changeStartDay = (day) => {
        this.props.handle_startDay(new Date(day.year, day.month, day.number));
    }

    changeEndDay = (day) => {
        if(day) {
          this.props.handle_endDay(new Date(day.year, day.month, day.number))
        } 
        else this.props.handle_endDay('');
    }

    changeViewDay = (day) => {
        this.setState({ viewDay: new Date(day.year, day.month, day.number) })
    }

    render() {

        let displayStart = this.props.startDay ? "" + (this.months[this.props.startDay.getMonth()] + " " + this.props.startDay.getDate() + ", " + this.props.startDay.getFullYear()) : "";
        let displayEnd = this.props.endDay ? "" + (this.months[this.props.endDay.getMonth()] + " " + this.props.endDay.getDate() + ", " + this.props.endDay.getFullYear()) : "";
        return ( 
        <div className = "calendar" >
          <div className = "calendar-header" >
            <h2 >
            <div className = "startDay" > { displayStart } 
            </div> 
            </h2> 
            <div className = "endDay" >
            <h2 > { displayEnd } 
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
                    return <div className = "weekday" > < p > { day } < /p></div >
                })
            } </div> 
            <CalendarDays viewDay = { this.state.viewDay }
            today = { this.state.today }
            startDay = { this.props.startDay }
            endDay = { this.props.endDay }
            changeStartDay = { this.changeStartDay }
            changeEndDay = { this.changeEndDay }
            /> 
            </div> 
            </div>
        )
    }
}