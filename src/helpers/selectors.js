//Take interview object update it to replace interviewer id by the full details of the interviewer
export function getInterview(state, interview) {
  if (interview && interview.interviewer){
    const updatedInterview = {
      ...interview,
      interviewer: state.interviewers[interview.interviewer]
    }
    return updatedInterview;
  }
  return null;
}

//Return a list of appointment objects scheduled for the specified day
export function getAppointmentsForDay(state, day) {
  
  const appointments = []
  //Only push data if state.days contains the day we're looking for
  if (state.days.filter(item => item.name===day).length>0){
    //Find the day objects we look for
    const matchedDay = state.days.filter(item => item.name===day)[0];
    //If the appointments property does not exist, for whatever reason, return empty array
    if (!matchedDay.appointments) return appointments;
    //Find and append appointment details that match the appointment IDs
    for (let appID of matchedDay.appointments){
      appointments.push(state.appointments[appID])
    }
  }

  //Return empty array, or array with appointment objects
  return appointments;
}


//Returns a list of interviewers - same logic as getAppointmentsForDay
export function getInterviewersForDay (state, day) {
  const interviewers = [];

  if (state.days.filter(item => item.name===day).length>0){
    const matchedDay = state.days.filter(item => item.name===day)[0];

    if (!matchedDay.interviewers) return interviewers;

    for (let interviewerID of matchedDay.interviewers){
      interviewers.push(state.interviewers[interviewerID])
    }
  }

  return interviewers;

}