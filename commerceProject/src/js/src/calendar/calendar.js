import React, {Component} from 'react';
import CalendarDays from './calendar-days';
import ChevronLeft from './chevronLeft';
import ChevronRight from './chevronRight';
import './calendar.css';

export default class CalendarPicker extends Component {
  constructor() {
    super();

    this.daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    this.months = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];

    this.state = {
      today: new Date(),
      viewDay: new Date(),
      startDay: null,
      endDay: null
    }
  }

  changeStartDay = (day) => {
    this.setState({ startDay: new Date(day.year, day.month, day.number) });
  }

  changeEndDay = (day) => {
    day ? this.setState({ endDay: new Date(day.year, day.month, day.number) }) : this.setState({endDay : null});
  }

  changeViewDay = (day) => {
    this.setState({ viewDay: new Date(day.year, day.month, day.number)})
  }

  render() {

    let displayStart = this.state.startDay ? "" + (this.months[this.state.startDay.getMonth()] + " " + this.state.startDay.getDate() + ", " + this.state.startDay.getFullYear()) : "";
    let displayEnd = this.state.endDay ? "" + (this.months[this.state.endDay.getMonth()] + " " + this.state.endDay.getDate() + ", " + this.state.endDay.getFullYear()) : "";
    return (
      <div className="calendar">
        <div className="calendar-header">
          <h2> 
          <div className ="startDay">
          {displayStart}
          </div>
          </h2>
          <div className = "endDay">
          <h2>
          {displayEnd}
          </h2>
          </div>
        </div>
        <div className="calendar-body">
        <div className = "viewDay">
        <h1>
          <ChevronLeft viewDay={this.state.viewDay} changeViewDay={this.changeViewDay} />
          {this.months[this.state.viewDay.getMonth()]}
          <ChevronRight viewDay={this.state.viewDay} changeViewDay={this.changeViewDay} />
          </h1>
          </div>
          <div className="table-header">
            {
              this.daysOfWeek.map((day) => {
                return <div className="weekday"><p>{day}</p></div>
              })
            }
          </div>
          <CalendarDays viewDay={this.state.viewDay} today ={this.state.today} startDay={this.state.startDay} endDay={this.state.endDay} 
          changeStartDay={this.changeStartDay} changeEndDay={this.changeEndDay} />
        </div>
      </div>
    )
  }
}