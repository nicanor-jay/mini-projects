import { useState } from "react";
import "./App.css";
import HabitHeader from "./components/HabitHeader/HabitHeader.jsx";
import HabitCard from "./components/HabitCard/HabitCard.jsx";
import generateHistory from "./utils/generateHistory";
import "./variables.css";
import generateCalendar from "./utils/generateCalendar";

let testHabits = [
	{
		habitName: "Workout",
		color: "#7A3F92",
		habitHistory: generateHistory(30),
	},
	{
		habitName: "Drink Water",
		color: "#E84C1A",
		habitHistory: generateHistory(30),
	},
	{
		habitName: "Wake up early",
		color: "#41B9A8",
		habitHistory: generateHistory(30),
	},
];

function App() {
	const [habitsHistory, setHabitsHistory] = useState({});

	return (
		<div className="d-flex justify-content-center flex-column">
			{/* Top Element showing heading and dates */}
			<HabitHeader dates={generateCalendar(30)} />
			{/* Will loop through habit cards to display, depending on how many habits are being tracked */}
			{testHabits.map((habit, idx) => {
				return (
					<HabitCard
						value={habit.habitName}
						color={habit.color}
						history={habit.habitHistory}
						key={idx}
					/>
				);
			})}
		</div>
	);
}

export default App;
