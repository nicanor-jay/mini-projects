import {useState} from 'react'
import '../../shared.css'

const CompletedTask = ({ value, onClick = null }) => {
	const [isHovered, setIsHovered] = useState(false);

	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};
	return (
		<li
			className="completed-task"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<p className="completed-task-desc">{value}</p>
			{isHovered && (
				<button onClick={onClick} className="delete-button">
					<i className="fa fa-trash"></i>
				</button>
			)}
		</li>
	);
};


export default CompletedTask