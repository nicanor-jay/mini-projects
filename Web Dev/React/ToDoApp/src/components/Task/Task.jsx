import {useState, useEffect} from 'react'
import '../../shared.css'


const Task = ({ value, onClickFunctions = null }) => {
	const [isHovered, setIsHovered] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [currText, setCurrText] = useState(value);
	const handleClick = () => {
		setIsEditing(true);
	};

	const handleChange = (event) => {
		setCurrText(event.target.value);
		onClickFunctions[2](currText);
	};

	const handleKeyDown = (event) => {
		if (event.keyCode === 13) {
			// Call your function here
			setIsEditing(false);
			onClickFunctions[2](currText);
		}
	};

	const handleBlur = () => {
		setIsEditing(false);
		onClickFunctions[2](currText);
	};

	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	return (
		<li
			className="task"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			{isEditing ? (
				<input
					type="text"
					value={currText}
					onChange={handleChange}
					onKeyDown={handleKeyDown}
					className="task-desc-edit"
					onBlur={handleBlur}
					autoFocus
				></input>
			) : (
				<p className="task-desc" onClick={handleClick} onChange={handleChange}>
					{value}
				</p>
			)}

			{isHovered && (
				<button onClick={onClickFunctions[1]} className="delete-button">
					<i className="fa fa-trash"></i>
				</button>
			)}
			<button onClick={onClickFunctions[0]} className="tick-button">
				<i className="fa-solid fa-check"></i>
			</button>
		</li>
	);
};

export default Task