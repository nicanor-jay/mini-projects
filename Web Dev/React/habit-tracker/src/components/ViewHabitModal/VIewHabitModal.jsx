import React, { useState } from "react";
import "./ViewHabitModal.css";
import "../../variables.css";
import "../../utils/getPercentageCompleted";
import firebase from "../../utils/firebase.js";
import getPercentageCompleted from "../../utils/getPercentageCompleted";
import PercentageChip from "../PercentageChip/PercentageChip";

import { doc, deleteDoc, updateDoc, getDoc } from "firebase/firestore";

const ViewHabitModal = ({
	habit,
	setCurrentlyViewedHabit,
	currentlyViewedHabitId,
	setIsViewingHabit,
}) => {
	const [isEditingHabitName, setIsEditingHabitName] = useState(false);
	const [habitName, setHabitName] = useState(habit.habitName);
	const firestore = firebase.firestore();

	const handleClose = () => {
		setCurrentlyViewedHabit(null);
		setIsViewingHabit(false);
	};
	const handleChange = (event) => {
		setHabitName(event.target.value);
	};
	const submitNameChange = () => {
		updateHabitName();
		setIsEditingHabitName(!isEditingHabitName);
	};

	const updateHabitName = async () => {
		// let updatedHabits = [...habits];
		// updatedHabits[habitId].habitName = newName;
		// setHabits(updatedHabits);

		const ref = doc(firestore, "habits", currentlyViewedHabitId);
		const habitSnap = await getDoc(ref);
		await updateDoc(ref, { habitName: habitName });
	};

	const handleKeyDown = (event) => {
		if (event.keyCode === 13) {
			// Call your function here
			submitNameChange();
		}
	};

	const deleteHabit = async () => {
		handleClose();
		const ref = doc(firestore, "habits", currentlyViewedHabitId);
		await deleteDoc(ref);
	};

	const handleClick = () => {
		setIsEditingHabitName(!isEditingHabitName);
	};

	return (
		<>
			<div
				className="modal fade"
				id="viewHabitModal"
				tabIndex="-1"
				role="dialog"
				aria-labelledby="viewHabitModalLabel"
				aria-hidden="false"
			>
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content d-flex flex-column view-habit-modal">
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
								<h5 className="modal-title" style={{ color: habit.habitColor }}>
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
									color={habit.habitColor}
								/>
								<span>
									<PercentageChip
										percentage={getPercentageCompleted(
											habit.habitHistory,
											"month"
										)}
										description="last month"
										color={habit.habitColor}
									/>
								</span>
								<span>
									<PercentageChip
										percentage={getPercentageCompleted(
											habit.habitHistory,
											"lifetime"
										)}
										description="lifetime"
										color={habit.habitColor}
									/>
								</span>
							</div>
						</div>
						<div className="modal-footer">
							<button
								className="btn btn-danger"
								data-dismiss="modal"
								onClick={deleteHabit}
							>
								Delete Habit
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ViewHabitModal;
