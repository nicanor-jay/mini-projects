import { useEffect, useState } from "react";
import "./HabitHeader.css";
import "../../variables.css";
import generateCalendar from "../../utils/generateCalendar";
import DateContainer from "../DateContainer/DateContainer";

function HabitHeader({ dates }) {
	const [currDates, setCurrDates] = useState(dates);

	return (
		<div className="card">
			<h2 className="habit-title fw-bold">Habits</h2>
			<div className="dates-container">
				{dates.slice(0, 5).map((date) => {
					return <DateContainer dateString={date.dateString} />;
				})}
			</div>
		</div>
	);
}

export default HabitHeader;
