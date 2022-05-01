//Import functionalities
import React, { useState, useEffect } from "react";
import axios from 'axios';

//Import style
import "components/Application.scss";

//Import components
import DayList from "./DayList";
import Appointment from "./Appointment";

//Import helpers
import {getAppointmentsForDay} from "./helpers/selectors"


export default function Application(props) {

  //One variable for all things tracked in state
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });


  //Custom function to update the day of the state
  const setDay = day => setState(prev => ({ ...state, day }));
  

  //Run on every re-render
  useEffect(() => {
    //Make 3 API calls and update the state at the same time
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ])
    .then((all) => {
      setState(prev => ({
        ...prev, 
        days: all[0].data, 
        appointments: all[1].data,
        interviewers: all[2].data
      }))
    })
  }, []);

  //Extract appointments for a specific day (the selected one)
  const dailyAppointments = getAppointmentsForDay(state, state.day);


  //Create list of appointment components
  const appointmentsList = dailyAppointments.map(appointment => {
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
