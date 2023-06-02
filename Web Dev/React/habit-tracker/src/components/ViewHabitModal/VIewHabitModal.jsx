import React, {
	useState,
	setIsViewingHabit,
	setCurrentlyViewedHabit,
} from "react";
import "./ViewHabitModal.css";
import "../../variables.css";
import "../../utils/getPercentageCompleted";
import getPercentageCompleted from "../../utils/getPercentageCompleted";

const ViewHabitModal = ({
	habit,
	setCurrentlyViewedHabit,
	setIsViewingHabit,
}) => {
	const handleClose = () => {
		setCurrentlyViewedHabit(null);
		setIsViewingHabit(false);
	};
	return (
		<div className="d-flex justify-content-center align-items-center mt-1">
			{open && (
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" style={{ color: habit.color }}>
								{habit.habitName} <i className="fa-solid fa-pencil"></i>
							</h5>
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
							<div className="percentages-container">
								<span>
									{getPercentageCompleted(habit.habitHistory, "week")}%
								</span>
								<span>
									{getPercentageCompleted(habit.habitHistory, "month")}%
								</span>
								<span>
									{getPercentageCompleted(habit.habitHistory, "lifetime")}%
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
