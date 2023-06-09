import React, { useState } from "react";
import "./AddHabitModal.css";
import "../../variables.css";
import ColorOption from "../ColorOption/ColorOption.jsx";
import firebase from "../../utils/firebase.js";
import generateCalendar from "../../utils/generateCalendar";
import generateHistory from "../../utils/generateHistory";
import { getAuth } from "firebase/auth";

const AddHabitModal = ({ CTA, icon = null }) => {
	const [habitName, setHabitName] = useState("");
	const [color, setColor] = useState("");

	const firestore = firebase.firestore();
	const auth = getAuth();
	const habitsRef = firestore.collection("habits");
	const query = habitsRef.orderBy("createdAt");

	const addHabitToFirestore = async (e) => {
		const { uid, photoURL } = auth.currentUser;

		await habitsRef.add({
			uid,
			habitName: habitName,
			habitColor: color,
			habitHistory: generateHistory(30),
			createdAt: firebase.firestore.FieldValue.serverTimestamp(),
		});
	};

	const handleClose = () => {
		setHabitName("");
		setColor("");
	};

	const handleSubmit = () => {
		if (habitName == "" || color == "") {
			return;
		}
		// addHabit(habitName, color);
		addHabitToFirestore();
		handleClose();
	};

	const handleHabitNameChange = (event) => {
		setHabitName(event.target.value);
	};

	const handleKeyDown = (event) => {
		if (event.keyCode === 13) {
			// Call your function here
			event.preventDefault();
			handleSubmit();
		}
	};

	const handleColorChange = (event) => {
		setColor(event.target.value);
	};

	const colorOptions = {
		"#FF0000": "Red",
		"#00FF00": "Green",
		"#0000FF": "Blue",
		"#A020F0": "Purple",
		"#FFA500": "Orange",
		"#FFFF00": "Yellow",
		"#000000": "Black",
	};

	return (
		<div className="d-flex justify-content-center align-items-center mt-1">
			<button
				className="root-add-button"
				type="button"
				data-toggle="modal"
				data-target="#addHabitModal"
			>
				{CTA} {icon}{" "}
			</button>

			<div
				className="modal fade"
				id="addHabitModal"
				tabIndex="-1"
				role="dialog"
				aria-labelledby="addHabitModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog modal-dialog-centered" role="document">
					<div className="modal-content d-flex flex-column add-habit-modal">
						<div className="modal-header">
							<h3 className="modal-title">Add Title</h3>
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
							<form className="modal-form">
								<label htmlFor="habitName">Habit Name</label>
								<input
									type="text"
									id="habitName"
									onChange={handleHabitNameChange}
									onKeyDown={handleKeyDown}
									value={habitName}
								/>
								<label htmlFor="habitName">Colour</label>
								<select name="color" onChange={handleColorChange} value={color}>
									<option value="">Select an option</option>
									{Object.entries(colorOptions).map(([colorCode, label]) => (
										<ColorOption
											label={label}
											colorCode={colorCode}
											key={label}
										/>
									))}
								</select>
							</form>
						</div>
						<div className="modal-footer">
							<button
								type="submit"
								className="modal-add-button"
								onClick={handleSubmit}
								data-dismiss={habitName == "" || color == "" ? null : "modal"}
							>
								Add Habit
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddHabitModal;
