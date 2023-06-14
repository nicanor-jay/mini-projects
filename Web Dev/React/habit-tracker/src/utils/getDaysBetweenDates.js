function getDaysBetweenDates(dateString1, dateString2) {
	const dateParts1 = dateString1.split("/");
	const dateParts2 = dateString2.split("/");

	// Create Date objects using the date parts
	const date1 = new Date(`${dateParts1[2]}-${dateParts1[1]}-${dateParts1[0]}`);
	const date2 = new Date(`${dateParts2[2]}-${dateParts2[1]}-${dateParts2[0]}`);

	// Calculate the difference in milliseconds
	const timeDiff = Math.abs(date2 - date1);

	// Convert the difference to days
	const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

	return daysDiff;
}

export default getDaysBetweenDates;
