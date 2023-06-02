import React, {
	useState,
	setIsViewingHabit,
	setCurrentlyViewedHabit,
} from "react";
import "./ViewHabitModal.css";
import "../../variables.css";
import "../../utils/getPercentageCompleted";
import getPercentageCompleted from "../../utils/getPercentageCompleted";
import PercentageChip from "../PercentageChip/PercentageChip";

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
