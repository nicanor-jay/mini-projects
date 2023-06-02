const ColorOption = ({ label, colorCode }) => {
	return (
		<option value={colorCode} style={{ color: colorCode }}>
			{label}
		</option>
	);
};

export default ColorOption;
