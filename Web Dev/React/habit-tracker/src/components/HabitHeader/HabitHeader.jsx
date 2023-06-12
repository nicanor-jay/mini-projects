import { useEffect, useState } from "react";
import "./HabitHeader.css";
import "../../variables.css";
import generateCalendar from "../../utils/generateCalendar";
import DateContainer from "../DateContainer/DateContainer";

function HabitHeader({ dates, dateIndex, adjustDateIndex }) {
	return (
		<div className="card">
			<h2 className="habit-title fw-bold">Habits</h2>
			{dateIndex === 0 ? (
				<i
					className="fa-solid fa-caret-left navigate"
					onClick={() => adjustDateIndex(-1)}
					style={{ color: "gray", cursor: "default", pointerEvents: "none" }}
				></i>
			) : (
				<i
					className="fa-solid fa-caret-left navigate"
					onClick={() => adjustDateIndex(-1)}
				></i>
			)}
			<div className="dates-container">
				{dates.slice(dateIndex, dateIndex + 10).map((date, idx) => {
					return <DateContainer dateString={date.dateString} key={idx} />;
				})}
			</div>

			{dateIndex + 10 == dates.length ? (
				<i
					className="fa-solid fa-caret-right navigate"
					style={{ color: "gray", cursor: "default", pointerEvents: "none" }}
				></i>
			) : (
				<i
					className="fa-solid fa-caret-right navigate"
					onClick={() => adjustDateIndex(1)}
				></i>
			)}
		</div>
	);
}

export default HabitHeader;
