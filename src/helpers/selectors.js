//getAppointmentsForDay helper function
export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter(days => days.name === day);
  if (!filteredDays[0]) {
    return [];
  }
  const filteredAppointments = filteredDays[0].appointments.map((id) => {
    return state.appointments[id];
  });

  return filteredAppointments;
};


//getInterview helper function
export function getInterview(state, interview) {

  if (!interview) {
    return null;
  }
  const interviews = {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  };
  return interviews;
};