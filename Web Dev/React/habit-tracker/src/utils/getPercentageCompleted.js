function getPercentageCompleted(habitHistory, timeframe) {
	const today = new Date();
	let timeLimit = null;
	let filteredHistory;

	if (timeframe === "week") {
		filteredHistory = habitHistory.slice(0, 7);
	} else if (timeframe === "month") {
		filteredHistory = habitHistory.slice(0, 30);
	} else if (timeframe === "lifetime") {
		filteredHistory = habitHistory;
	}

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
