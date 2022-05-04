//Import functionalities
import React from "react";

//Import style
import "components/Application.scss";

//Import components
import DayList from "./DayList";
import Appointment from "./Appointment";

//Import helpers and hooks
import {getAppointmentsForDay, getInterviewersForDay, getInterview} from "../helpers/selectors"
import useApplicationData from "../hooks/useApplicationData"


export default function Application(props) {

  //Import things from a hook
  //Running the function also means that useEffect inside it will be applied
  const {state, setDay, bookInterview, cancelInterview} = useApplicationData();

  //Extract appointments and interviewers for a specific day (the selected one)
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);

  //Create list of appointment components
  const appointmentsList = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    return <Appointment 
      key = {appointment.id}
      {...appointment}
      interview = {interview}
      interviewers = {dailyInterviewers}
      bookInterview = {bookInterview} //Function
      cancelInterview = {cancelInterview} //Function
    />
  })


  //RENDER THE APPLICATION
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
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
