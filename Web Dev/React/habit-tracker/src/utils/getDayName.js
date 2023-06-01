function getDayName(stringDate) {
	const dateParts = stringDate.split("/");
	const day = parseInt(dateParts[0], 10);
	const month = parseInt(dateParts[1], 10) - 1; // Months in JavaScript are zero-based (0-11)
	const year = parseInt(dateParts[2], 10);

	const dateObject = new Date(year, month, day);
	const dayName = dateObject.toLocaleDateString("en-US", { weekday: "long" });

	return dayName;
}

export default getDayName;
