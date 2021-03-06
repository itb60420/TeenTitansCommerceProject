import Calendar from "./calendar";

function CalendarDays(props) {
  let firstDayOfMonth = new Date(props.viewDay.getFullYear(), props.viewDay.getMonth(), 1);
  let weekdayOfFirstDay = firstDayOfMonth.getDay();
  let currentDay = firstDayOfMonth;
  let todayTrimmed = new Date(props.today.getFullYear(), props.today.getMonth(), props.today.getDate());
  let cutoffStart = new Date(todayTrimmed.getFullYear(), todayTrimmed.getMonth() + 3, todayTrimmed.getDate());
  let cutoffEnd = new Date(todayTrimmed.getFullYear(), todayTrimmed.getMonth() + 6, todayTrimmed.getDate());
  let currentDays = [];

  for (let day = 0; day < 42; day++) {
    if (day === 0 && weekdayOfFirstDay === 0) {
      currentDay.setDate(firstDayOfMonth.getDate() - 7);
    } else if (day === 0) {
      currentDay.setDate(firstDayOfMonth.getDate() + (day - weekdayOfFirstDay));
    } else {
      currentDay.setDate(firstDayOfMonth.getDate() + 1);
    }

    let calendarDay = {
      currentMonth: (currentDay.getMonth() === props.viewDay.getMonth() && currentDay >= todayTrimmed && currentDay <= cutoffStart),
      current: (currentDay >= todayTrimmed && currentDay <= cutoffEnd),
      date: (new Date(currentDay)),
      year: currentDay.getFullYear(),
      month: currentDay.getMonth(),
      number: currentDay.getDate(),
      selected: ((props.startDay && currentDay.toDateString() === props.startDay.toDateString()) || (props.endDay && currentDay.toDateString() === props.endDay.toDateString())),
      inbetween: (props.startDay && props.endDay && currentDay > props.startDay && currentDay < props.endDay)
    }

    currentDays.push(calendarDay);
  }


  return (
  <div className="table-content">
    {
      currentDays.map((day) => {
        return (
          <div className={"calendar-day" + (day.currentMonth || (props.startDay && day.current) ? " current" : "") + (day.selected ? " selected" : "") + (day.inbetween ? " inbetween" : "")}
          //If the date is in the current month AND we dont have a start day, select it
          //otherwise if we have both dates selected, allow reselection of first day
          //otherwise we have a start day, pick a end date
                onClick={() => day.current && (!props.startDay || (!props.endDay && props.startDay > day.date))  ? props.changeStartDay(day) : 
                props.startDay && props.endDay && day.date >= todayTrimmed && day.date <= cutoffStart ? (props.changeStartDay(day), props.changeEndDay(null)) : 
                props.startDay && day.date > props.startDay && day.date <= cutoffEnd ? props.changeEndDay(day) : null}>
            <p>{day.number}</p>
          </div>
        )
      })
    }
  </div>
)
}
export default CalendarDays;
