import React, { useState } from "react";
import "./ViewHabitModal.css";
import "../../variables.css";
import "../../utils/getPercentageCompleted";
import getPercentageCompleted from "../../utils/getPercentageCompleted";
import PercentageChip from "../PercentageChip/PercentageChip";

const ViewHabitModal = ({
	habit,
	setCurrentlyViewedHabit,
	currentlyViewedHabitId,
	setIsViewingHabit,
	updateHabitName,
}) => {
	const [isEditingHabitName, setIsEditingHabitName] = useState(false);
	const [habitName, setHabitName] = useState(habit.habitName);

	const handleClose = () => {
		setCurrentlyViewedHabit(null);
		setIsViewingHabit(false);
	};
	const handleChange = (event) => {
		setHabitName(event.target.value);
	};
	const submitNameChange = () => {
		updateHabitName(currentlyViewedHabitId, habitName);
		setIsEditingHabitName(!isEditingHabitName);
	};

	const handleKeyDown = (event) => {
		if (event.keyCode === 13) {
			// Call your function here
			submitNameChange();
		}
	};

	const handleClick = () => {
		setIsEditingHabitName(!isEditingHabitName);
	};

	return (
		<div className="d-flex justify-content-center align-items-center mt-1">
			{open && (
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							{isEditingHabitName ? (
								<div className="modal-edit-container">
									<input
										type="text"
										value={habitName}
										onKeyDown={handleKeyDown}
										onChange={handleChange}
									></input>
									<button onClick={submitNameChange}>
										<i className="fa-solid fa-check"></i>
									</button>
								</div>
							) : (
								<h5 className="modal-title" style={{ color: habit.color }}>
									{habitName}{" "}
									<i
										className="fa-solid fa-pencil clickable"
										onClick={handleClick}
									></i>
								</h5>
							)}
							<button
								type="button"
								className="close"
								data-dismiss="modal"
								onClick={handleClose}
							>
								<i className="fa-solid fa-xmark"></i>
							</button>
						</div>
						<div className="modal-body">
							<div className="percentages-container">
								<PercentageChip
									percentage={getPercentageCompleted(
										habit.habitHistory,
										"week"
									)}
									description="last 7 days"
									color={habit.color}
								/>
								<span>
									<PercentageChip
										percentage={getPercentageCompleted(
											habit.habitHistory,
											"month"
										)}
										description="last month"
										color={habit.color}
									/>
								</span>
								<span>
									<PercentageChip
										percentage={getPercentageCompleted(
											habit.habitHistory,
											"lifetime"
										)}
										description="lifetime"
										color={habit.color}
									/>
								</span>
							</div>
						</div>
						<div className="modal-footer"></div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ViewHabitModal;
