import { useState } from "react";
import "./App.css";
import HabitHeader from "./components/HabitHeader/HabitHeader.jsx";
import HabitCard from "./components/HabitCard/HabitCard.jsx";
import generateCalendar from "./components/utils/generateHistory";
import "./variables.css";

const testHabits = [
	{
		habitName: "Workout",
		color: "#7A3F92",
		habitHistory: generateCalendar(30),
	},
	{
		habitName: "Drink Water",
		color: "#E84C1A",
		habitHistory: generateCalendar(30),
	},
	{
		habitName: "Wake up early",
		color: "#41B9A8",
		habitHistory: generateCalendar(30),
	},
];

function App() {
	const [habitsHistory, setHabitsHistory] = useState({});

	return (
		<div className="d-flex justify-content-center flex-column">
			{/* Top Element showing heading and dates */}
			<HabitHeader />
			{/* Will loop through habit cards to display, depending on how many habits are being tracked */}
			{testHabits.map((habit, idx) => {
				return (
					<HabitCard
						value={habit.habitName}
						color={habit.color}
						history={habit.habitHistory.map((habitHistory) => {
							return habitHistory.completed;
						})}
						key={idx}
					/>
				);
			})}
		</div>
	);
}

export default App;
