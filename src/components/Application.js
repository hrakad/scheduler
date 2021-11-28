import React, { useState, useEffect } from "react";
import axios from "axios";

import DayList from "./DayList";
import Appointment from "./Appointment";

import "components/Application.scss";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from '../helpers/selectors';

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
    ])
      .then((all) => {
        setState((prev) => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        }))
      });
  }, [])
  // console.log(state.days);
  // console.log(state.appointments);
  // console.log(state.interviewers);

  const setDay = day => setState({ ...state, day });
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  function bookInterview(id, interview) {
    //console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const updateState = setState({
      ...state,
      appointments
    });
    return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then((res) => {
        if (res.headers.status === 204) updateState();
      })
  }

  const deleteInterview = (id) => {
    const updateState = setState({
      ...state,
      appointments: {
        ...state.appointments,
        [id]: { ...state.appointments[id], interview: null },
      },
    });
    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then((res) => {
        if (res.headers.status === 200) updateState();
      });
  };




  const appointmentsArray = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    const interviewers = getInterviewersForDay(state, state.day);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        deleteInterview={deleteInterview}
      />
    )
  })

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
      </section>
      <section className="schedule">
        {appointmentsArray}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}