import { useState, useEffect } from "react";
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
      const updatedDays = updateSpots(state, appointments);
      setState(prev => {return { ...prev, appointments, days: updatedDays }})
    })
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
        const updatedDays = updateSpots(state, appointments);
        setState(prev => {return { ...prev, appointments, days: updatedDays }})
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



  //Modify "days" and return in state to reflect the accurate number of spots
  const updateSpots = function (state, appointments) {

    const currDay = state.days.filter(day => day.name === state.day)[0];

    let spots = 0;
    for (let id of currDay.appointments) {
      if (!appointments[id].interview) {
        spots++;
      }
    }

    const updatedDay = { ...currDay, spots };
    const updatedDays = [...state.days]

    for (let dayIndex in state.days){
      if(state.days[dayIndex].name===state.day) updatedDays[dayIndex] = updatedDay;
    }

    return updatedDays;
  };

  return { 
    state,
    setDay,
    bookInterview,
    cancelInterview
  };

}