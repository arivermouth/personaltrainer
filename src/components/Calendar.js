import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

function MyCalendar() {
	const [trainings, setTrainings] = useState([]);

	useEffect(() => fetchTrainings(), []);

	const fetchTrainings = () => {
		fetch("https://customerrest.herokuapp.com/gettrainings")
			.then(response => response.json())
			.then(data => setTrainings(data));
	};

	let events = [];
	for (let i = 0; i < trainings.length; i++) {
		events[i] = {
			title:
				trainings[i].activity +
				" / " +
				trainings[i].customer.firstname +
				" " +
				trainings[i].customer.lastname,
			start: new Date(trainings[i].date),
			end: new Date(trainings[i].date),
			allDay: false
		};
	}
	console.log(events);

	return (
		<div className="container" style={{ height: "70vh", margin: '30px' }}>
			<Calendar
				localizer={localizer}
				events={events}
				startAccessor="start"
				endAccessor="end"
			/>
		</div>
	);
}

export default MyCalendar;