import { useState } from "react";
import "./PercentageChip.css";

const PercentageChip = ({ percentage, description, color }) => {
	return (
		<div className="percentage-label-container">
			<span style={{ color: color, fontWeight: 600 }}>{percentage}%</span>
			<span>{description}</span>
		</div>
	);
};

export default PercentageChip;
