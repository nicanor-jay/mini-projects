import { useEffect, useState } from "react";
import "./DateContainer.css";
import "../../variables.css";
import getDayName from "../../utils/getDayName";

function DateContainer({ dateString }) {
	return (
		<>
			<span className="date-container">
				<div>{getDayName(dateString).slice(0, 3)}</div>

				<div>{dateString.slice(0, dateString.indexOf("/"))}</div>
			</span>
		</>
	);
}

export default DateContainer;
