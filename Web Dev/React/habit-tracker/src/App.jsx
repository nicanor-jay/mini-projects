import { useState, useEffect } from "react";
import "./App.css";
import "./variables.css";
import HabitHeader from "./components/HabitHeader/HabitHeader.jsx";
import HabitCard from "./components/HabitCard/HabitCard.jsx";
import generateHistory from "./utils/generateHistory";
import AddHabitModal from "./components/AddHabitModal/AddHabitModal.jsx";
import ViewHabitModal from "./components/ViewHabitModal/ViewHabitModal.jsx";
import generateCalendar from "./utils/generateCalendar";

function App() {
	const [habits, setHabits] = useState([
		{
			habitName: "Workout",
			color: "#7A3F92",
			habitHistory: generateHistory(45),
		},
		{
			habitName: "Drink Water",
			color: "#E84C1A",
			habitHistory: generateHistory(45),
		},
		{
			habitName: "Wake up early",
			color: "#41B9A8",
			habitHistory: generateHistory(45),
		},
	]);
	const [dateIndex, setDateIndex] = useState(0);
	const [isViewingHabit, setIsViewingHabit] = useState(false);
	const [currentlyViewedHabit, setCurrentlyViewedHabit] = useState(null);
	const [currentlyViewedHabitId, setCurrentlyViewedHabitId] = useState(null);

	const handleHabitClick = (idx) => {
		if (!isViewingHabit) {
			setCurrentlyViewedHabit(habits[idx]);
			setCurrentlyViewedHabitId(idx);
		} else {
			setCurrentlyViewedHabit(null);
			setCurrentlyViewedHabitId(null);
		}
		setIsViewingHabit(!isViewingHabit);
	};

	const adjustDateIndex = (val) => {
		if (dateIndex + val < 0) {
			return;
		}
		setDateIndex(dateIndex + val);
	};

	const updateHabitsHistory = (habitId, idx) => {
		let updatedHabits = [...habits];
		updatedHabits[habitId].habitHistory[idx].completed =
			!habits[habitId].habitHistory[idx].completed;

		setHabits(updatedHabits);
	};

	const updateHabitName = (habitId, newName) => {
		let updatedHabits = [...habits];
		updatedHabits[habitId].habitName = newName;

		setHabits(updatedHabits);
	};

	const addHabit = (habitName, color, habitHistory = null) => {
		let newHabit = {
			habitName: habitName,
			color: color,
			habitHistory: generateHistory(30),
		};

		let updatedHabits = [...habits, newHabit];
		setHabits(updatedHabits);
	};

	return (
		<div className="d-flex justify-content-center flex-column">
			{/* Top Element showing heading and dates */}
			<HabitHeader
				dates={generateCalendar(30)}
				dateIndex={dateIndex}
				adjustDateIndex={adjustDateIndex}
			/>
			{/* Will loop through habit cards to display, depending on how many habits are being tracked */}
			{habits.map((habit, idx) => {
				return (
					<HabitCard
						habitId={idx}
						key={idx}
						name={habit.habitName}
						color={habit.color}
						history={habit.habitHistory}
						updateHabitsHistory={updateHabitsHistory}
						dateIndex={dateIndex}
						onClick={(idx) => handleHabitClick(idx)}
					/>
				);
			})}
			<AddHabitModal
				CTA="Add Habit"
				icon={<i className="fa-solid fa-plus"></i>}
				title="Add Habit"
				addHabit={addHabit}
			/>
			{isViewingHabit && (
				<ViewHabitModal
					habit={currentlyViewedHabit}
					setCurrentlyViewedHabit={setCurrentlyViewedHabit}
					currentlyViewedHabitId={currentlyViewedHabitId}
					setIsViewingHabit={setIsViewingHabit}
					updateHabitName={updateHabitName}
				/>
			)}
		</div>
	);
}

export default App;
