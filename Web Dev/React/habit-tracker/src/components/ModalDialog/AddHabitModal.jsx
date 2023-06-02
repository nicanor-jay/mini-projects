import React, { useState } from "react";
import "./AddHabitModal.css";
import ColorOption from "../ColorOption/ColorOption.jsx";
import "../../variables.css";

const ModalDialog = ({ CTA, icon = null, title, addHabit }) => {
	const [open, setOpen] = useState(false);
	const [habitName, setHabitName] = useState("");
	const [color, setColor] = useState("");

	const handleClose = () => {
		setOpen(false);
		setHabitName("");
		setColor("");
	};

	const handleHabitNameChange = (event) => {
		setHabitName(event.target.value);
		console.log(habitName);
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

	const handleSubmit = () => {
		if (habitName == "" || color == "") {
			return;
		}
		addHabit(habitName, color);
		handleClose();
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
			<button onClick={() => setOpen(true)} className="root-add-button">
				{CTA} {icon}
			</button>
			{open && (
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">{title}</h5>
							<button
								type="button"
								className="close"
								data-dismiss="modal"
								onClick={handleClose}
							>
								<span>&times;</span>
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
								/>
								<label htmlFor="habitName">Colour</label>
								<select name="color" onChange={handleColorChange}>
									<option value="">Select an option</option>
									{/* <option value="#FF0000">Red</option>
									<option value="#00FF00">Green</option>
									<option value="#0000FF">Blue</option>
									<option value="#A020F0">Purple</option>
									<option value="#FFA500">Orange</option>
									<option value="#FFFF00">Yellow</option>
									<option value="#000000">Black</option> */}

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
							>
								Add Habit
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ModalDialog;
