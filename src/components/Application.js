//Import functionalities
import React, { useState, useEffect } from "react";
import axios from 'axios';

//Import style
import "components/Application.scss";

//Import components
import DayList from "./DayList";
import Appointment from "./Appointment";


//Mock data
const appointments = {
  "1": {
    id: 1,
    time: "12pm",
  },
  "2": {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer:{
        id: 3,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  "3": {
    id: 3,
    time: "2pm",
  },
  "4": {
    id: 4,
    time: "3pm",
    interview: {
      student: "Archie Andrews",
      interviewer:{
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  "5": {
    id: 5,
    time: "4pm",
  }
};


export default function Application(props) {
  //State 
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {}
  });

  //Custom functions to update parts of the state
  const setDay = day => setState(prev => ({ ...state, day }));
  const setDays = days => setState(prev => ({ ...prev, days }));

  

  //Get days data from the backend, happens on refresh
  useEffect(() => {
    axios.get("/api/days")
    .then(res => setDays(res.data));
  }, []);


  const appointmentsList = Object.values(appointments).map(appointment => {
    return <Appointment 
      key = {appointment.id}
      {...appointment} 
    />
  })
  appointmentsList.push(<Appointment key="last" time="5pm" />)

  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />

      {/* Navigation */}
      <nav className="sidebar__menu">
        <DayList days={state.days} value={state.day} onChange={setDay}/>
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>

      {/* Schedule of appointments */}
      <section className="schedule">
        {appointmentsList}
      </section>
    </main>
  );
}
