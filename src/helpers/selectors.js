//getAppointmentsForDay helper function
export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.find(days => days.name === day);
  let appointments = [];
  if (filteredDays) {
    appointments = filteredDays.appointments.map((id) => {
      return state.appointments[id];
    });

  }

  return appointments;
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

//getInterviewersForDay helper function
export function getInterviewersForDay(state, day) {
  const filteredDay = state.days.find(days => days.name === day);
  let interviewers = [];
  if (filteredDay) {
    interviewers = filteredDay.interviewers.map((id) => {
      return state.interviewers[id];
    });

  }

  return interviewers;
};


//getAppointmentsForDay helper function
// export function getAppointmentsForDay(state, day) {
//   const filteredDays = state.days.filter(days => days.name === day);
//   // console.log(state);
//   // console.log(state.days);
//   //console.log(filteredDays[0]);
//   if (!filteredDays[0]) {

//     return [];
//   }
//   const filteredAppointments = filteredDays[0].appointments.map((id) => {
//     return state.appointments[id];
//   });

//   return filteredAppointments;
// };
