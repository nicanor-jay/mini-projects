function getPercentageCompleted(habitHistory, timeframe) {
	const today = new Date();
	let timeLimit = null;

	if (timeframe === "week") {
		timeLimit = new Date(today.setDate(today.getDate() - 7)); // Calculate the date one week ago
	} else if (timeframe === "month") {
		timeLimit = new Date(today.setMonth(today.getMonth() - 1)); // Calculate the date one month ago
	}

	const filteredHistory = timeLimit
		? habitHistory.filter((entry) => new Date(entry.date) >= timeLimit)
		: habitHistory;

	const totalEntries = filteredHistory.length;
	const completedEntries = filteredHistory.filter(
		(entry) => entry.completed
	).length;

	if (totalEntries === 0) {
		return 0; // Handle the case when the filtered habit history is empty
	}

	const completionPercentage = (completedEntries / totalEntries) * 100;
	return completionPercentage.toFixed(2); // Return the percentage rounded to 2 decimal places
}

export default getPercentageCompleted;
