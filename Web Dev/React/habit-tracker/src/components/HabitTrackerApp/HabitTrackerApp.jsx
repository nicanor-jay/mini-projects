import { useState, useEffect } from "react";
import "../../variables.css";
import HabitCard from "../HabitCard/HabitCard.jsx";
import generateHistory from "../../utils/generateHistory";
import AddHabitModal from "../AddHabitModal/AddHabitModal.jsx";
import ViewHabitModal from "../ViewHabitModal/ViewHabitModal.jsx";
import HabitHeader from "../HabitHeader/HabitHeader.jsx";
import generateCalendar from "../../utils/generateCalendar";

import firebase from "../../utils/firebase.js";
import { useCollection } from "react-firebase-hooks/firestore";
import { getFirestore, collection } from "firebase/firestore";

function HabitTrackerApp() {
	const [dateIndex, setDateIndex] = useState(0);
	const [isViewingHabit, setIsViewingHabit] = useState(false);
	const [currentlyViewedHabit, setCurrentlyViewedHabit] = useState(null);
	const [currentlyViewedHabitId, setCurrentlyViewedHabitId] = useState(null);

	//firebase connections
	const firestore = firebase.firestore();
	const habitsRef = firestore.collection("habits");
	const query = habitsRef.where("uid", "==", firebase.auth().currentUser.uid);

	const [habits, loading, error] = useCollection(query);

	const handleHabitClick = (idx) => {
		if (!isViewingHabit) {
			setCurrentlyViewedHabit(habits.docs.find((doc) => doc.id === idx).data());
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

	return (
		<div className="d-flex justify-content-center flex-column">
			{/* Top Element showing heading and dates */}
			<HabitHeader
				dates={generateCalendar(365)}
				dateIndex={dateIndex}
				adjustDateIndex={adjustDateIndex}
			/>
			{/* Will loop through habit cards to display, depending on how many habits are being tracked */}
			{error && <strong>Error: {JSON.stringify(error)}</strong>}
			{loading && <span>Collection: Loading...</span>}
			{habits &&
				habits.docs.map((doc, idx) => {
					let habit = doc.data();
					return (
						<>
							<HabitCard
								habitId={doc.id}
								key={idx}
								name={habit.habitName}
								color={habit.habitColor}
								history={habit.habitHistory}
								dateIndex={dateIndex}
								handleHabitClick={(idx) => handleHabitClick(idx)}
							/>
						</>
					);
				})}

			<AddHabitModal
				CTA="Add Habit"
				icon={<i className="fa-solid fa-plus"></i>}
			/>
			{isViewingHabit && (
				<ViewHabitModal
					habit={currentlyViewedHabit}
					setCurrentlyViewedHabit={setCurrentlyViewedHabit}
					currentlyViewedHabitId={currentlyViewedHabitId}
					setIsViewingHabit={setIsViewingHabit}
				/>
			)}
		</div>
	);
}

export default HabitTrackerApp;
