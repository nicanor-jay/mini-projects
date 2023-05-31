import { useState } from "react";
import "./App.css";
import HabitCard from "./components/HabitCard/HabitCard.jsx";
import "./variables.css";

function App() {
	const [habitList, setHabitList] = useState([
		"Workout",
		"Drink Water",
		"Wake up early",
	]);
	const [habitsHistory, setHabitsHistory] = useState({});

	return (
		<div className="d-flex justify-content-center flex-column">
			{/* Will loop through habit cards to display, depending on how many habits are being tracked */}
			{habitList.map((habit, idx) => {
				return (
					<HabitCard
						value={habit}
						history={[true, false, false, true, false, true, true]}
						key={idx}
					/>
				);
			})}
		</div>
	);
}

export default App;
