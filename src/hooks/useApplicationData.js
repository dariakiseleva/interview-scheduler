import React, { useState, useEffect } from "react";
import axios from 'axios';

//Import helpers
import {getAppointmentsForDay} from "../helpers/selectors"


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
      const updatedDays = updateSpots(state, appointments, id);
      setState(prev => {return { ...prev, appointments, updatedDays }})
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
        const updatedDays = updateSpots(state, appointments, id);
        setState(prev => {return { ...prev, appointments, updatedDays }})
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



  const updateSpots = function (state, appointments, id) {

    const currDay = state.days.filter(day => day.name === state.day)[0];

    let spots = 0;
    for (const id of currDay.appointments) {
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


  // //Runs every time appointments are updated
  // useEffect(() => {
  //   updateSpots();
  // }, [state.appointments])


  // const updateSpots = () => {
  //   //Appointments in state we already updated
  //   //STEPS: 
  //   let spots = 0;
  //   console.log("STATE");
  //   console.log(state);
  //   for (let appointment of getAppointmentsForDay(state, state.day)){
  //     if (!appointment.interview) {
  //       spots++;
  //     }
  //   }
  //   console.log(`${spots} free spots`);

  //   //TEMP - FIX - ID OF DAY THAT IS OURS
  //   let dayIndex = 0;

  //   for (let index in state.days){
  //     if (state.days[index].name===state.day){
  //       dayIndex = index;
  //     }
  //   }

  //   // const updatedDay = {
  //   //   ...state.days[dayIndex],
  //   //   spots
  //   // }

  //   //axios.post('http://localhost:8001/api/days',).then(response => console.log(response.data));


  //     const newState = {...state}

  //     console.log(newState.days[dayIndex]);

  //     // for (let key of Object.keys(newState.days[dayIndex])){
  //     //   console.log(key);
  //     // }

  //     //console.log(newState.days[dayIndex]);
  // }

  return { 
    state,
    setDay,
    bookInterview,
    cancelInterview
  };

}