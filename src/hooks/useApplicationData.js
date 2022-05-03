import React, { useState, useEffect } from "react";
import axios from 'axios';


export default function useApplicationData(){

  //One variable for all things tracked in state
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });


  //Custom function to update the day of the state
  const setDay = day => setState(prev => ({ ...state, day }));

  //Book interview - both local and remote change
  const bookInterview = (id, interview) => {

    //Create an appointment
    const appointment = {
      ...state.appointments[id], //The ID and time of this appointment
      interview: { ...interview } //Add the interview to the slot
    };
    
    //Insert the appointment into list of appointments in state
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios
    //Put a new appointment into the backend server
    .put(
      `/api/appointments/${id}`,
      appointment //New data that was created above
    )
    //Then re-render with updated appointments
    .then(() => {
      setState({ ...state, appointments });
    });


    
  }
  
  //Delete interview - both local and remote change
  const cancelInterview  = (id) => {

    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .delete(`/api/appointments/${id}`)
      .then(() => {
        setState({ ...state, appointments });
      })
  }
  

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

  return { 
    state,
    setDay,
    bookInterview,
    cancelInterview
  };

}