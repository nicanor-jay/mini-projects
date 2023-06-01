import { useEffect, useState } from "react";
import "./DateContainer.css";
import "../../variables.css";
import getDayName from "../../utils/getDayName";

function DateContainer({ dateString }) {
	return (
		<span className="date-container">{getDayName(dateString).slice(0, 3)}</span>
	);
}

export default DateContainer;
