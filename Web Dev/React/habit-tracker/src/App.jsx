import { useState, useEffect } from "react";

import "./App.css";
import "./variables.css";
import HabitTrackerApp from "./components/HabitTrackerApp/HabitTrackerApp.jsx";
import firebase from "./utils/firebase.js";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";

function App() {
	const [user] = useAuthState(firebase.auth());
	const auth = firebase.auth();

	const signInWithGoogle = () => {
		const provider = new GoogleAuthProvider();
		auth.signInWithPopup(provider);
	};

	const SignOut = () => {
		return (
			auth.currentUser && (
				<button onClick={() => auth.signOut()}>Sign Out</button>
			)
		);
	};

	return (
		<>
			{user ? (
				<>
					<HabitTrackerApp />
					<SignOut />
				</>
			) : (
				<button className="btn btn-primary" onClick={signInWithGoogle}>
					Sign in with Google
				</button>
			)}
		</>
	);
}

export default App;
