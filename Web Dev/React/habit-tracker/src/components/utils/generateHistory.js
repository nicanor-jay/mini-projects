function generateCalendar(x) {
	// Get the current date.
	var today = new Date();

	// Create an array to store the dates.
	var dates = [];

	// Loop through the dates from today to x days ago.
	for (var i = 0; i < x; i++) {
		// Get the date at the current index.
		var date = new Date(today.getTime() - i * 86400000);

		// Convert the date to a string in calendar form.
		var dateString = date.toLocaleDateString();

		// Generate a random boolean value.
		var completed = Math.random() > 0.5;

		// Add the date and completed to the dates array.
		dates.push({
			date: dateString,
			completed: completed,
		});
	}

	// Return the dates array.
	return dates;
}

export default generateCalendar;
