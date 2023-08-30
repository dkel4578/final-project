import React, { useState, useEffect } from "react"; // eslint-disable-line no-unused-vars
import ScheduleShare from "../components/ScheduleShare";
import { useParams } from 'react-router-dom';
import "../css/schedule.css";

function CalendarShare() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [date, setDate] = useState(new Date().getDate()); // eslint-disable-line no-unused-vars
 

  const [events, setEvents] = useState(() => {
    const storedEvents = localStorage.getItem("events");
    try {
      return storedEvents ? JSON.parse(storedEvents) : [];
    } catch (error) {
      console.error("Error parsing stored events:", error);
      return [];
    }
  });

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear((prevYear) => prevYear + 1);
    } else {
      setMonth((prevMonth) => prevMonth + 1);
    }
  };

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear((prevYear) => prevYear - 1);
    } else {
      setMonth((prevMonth) => prevMonth - 1);
    }
  };


  useEffect(() => {
    // events 상태가 변경될 때마다 localStorage에 저장
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  return (
    <div className="calender-page">
    <div className="calender-page-title">
      <h1 className="Date-march">
        <span className="small-text"></span> {year}
      </h1>
      <button className="prev" onClick={prevMonth}>
       
      </button>
      <button className="next" onClick={nextMonth}>
       
      </button>
    </div>
    <ScheduleShare
      year={year}
      month={month}
      date={date}
      events={events}
    />
    <div className="btn-group"></div>
  </div>
  )
}

export default CalendarShare
