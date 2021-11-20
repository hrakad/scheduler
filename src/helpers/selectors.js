export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter(days => days.name === day);
  if (!filteredDays[0]) {
    return [];
  }
  const filteredAppointments = filteredDays[0].appointments.map((id) => {
    return state.appointments[id];
  });

  return filteredAppointments;
}
