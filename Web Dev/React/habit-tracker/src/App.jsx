import { useState } from "react";
import "./App.css";
import HabitCard from "./components/HabitCard/HabitCard.jsx";
import "./variables.css";

const testHabits = [
	{
		habitName: "Workout",
		color: "#7A3F92",
		habitHistory: [false, true, true, false, false, true],
	},
	{
		habitName: "Drink Water",
		color: "#E84C1A",
		habitHistory: [false, false, true, false, true, true],
	},
	{
		habitName: "Wake up early",
		color: "#41B9A8",
		habitHistory: [false, true, false, true, false, true],
	},
];

function App() {
	const [habitsHistory, setHabitsHistory] = useState({});

	return (
		<div className="d-flex justify-content-center flex-column">
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
