import { useState, useEffect } from "react";

import "./App.css";
import "./variables.css";
import HabitTrackerApp from "./components/HabitTrackerApp/HabitTrackerApp.jsx";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

import { useAuthState } from "react-firebase-hooks/auth";

firebase.initializeApp({
	apiKey: "AIzaSyBRm9Watfh8JiVl1wHT0OuwZdvIcZbk6X4",
	authDomain: "habit-tracker-65c64.firebaseapp.com",
	projectId: "habit-tracker-65c64",
	storageBucket: "habit-tracker-65c64.appspot.com",
	messagingSenderId: "514320397527",
	appId: "1:514320397527:web:d602920f9841f9bd81ec92",
	measurementId: "G-4DENP0R52L",
});

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
	const [user] = useAuthState(auth);

	const signInWithGoogle = () => {
		const provider = new GoogleAuthProvider();
		auth.signInWithPopup(provider);
	};

	return user ? (
		<HabitTrackerApp />
	) : (
		<button className="btn btn-primary" onClick={signInWithGoogle}>
			Sign in with Google
		</button>
	);
}

export default App;
