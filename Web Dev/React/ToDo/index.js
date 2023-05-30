const Task = ({ value, onClickFunctions = null }) => {
	const [isHovered, setIsHovered] = React.useState(false);
	const [isEditing, setIsEditing] = React.useState(false);
	const [currText, setCurrText] = React.useState(value);

	const handleClick = () => {
		setIsEditing(!isEditing);
	};

	const handleChange = (event) => {
		setCurrText(event.target.value);
	};

	const handleKeyDown = (event) => {
		if (event.keyCode === 13) {
			// Call your function here
			setIsEditing(false);
			onClickFunctions[2](currText);
		}
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

const CompletedTask = ({ value, onClick = null }) => {
	const [isHovered, setIsHovered] = React.useState(false);

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

const ToDoApp = () => {
	const [taskList, setTaskList] = React.useState([]);
	const [text, setText] = React.useState("");
	const [completedTaskList, setCompletedTaskList] = React.useState([]);
	const [completedVisibility, setCompletedVisibility] = React.useState(false);

	//Stores todo list in local storage
	React.useEffect(() => {
		let storedTasks = JSON.parse(localStorage.getItem("tasks"));
		let storedCompletedTasks = JSON.parse(
			localStorage.getItem("completedTasks")
		);
		if (storedTasks) {
			setTaskList(storedTasks);
		}
		if (storedCompletedTasks) {
			setCompletedTaskList(storedCompletedTasks);
		}
	}, []);

	//Retrives todo list from local storage if it exists
	React.useEffect(() => {
		localStorage.clear();
		localStorage.setItem("tasks", JSON.stringify(taskList));
		localStorage.setItem("completedTasks", JSON.stringify(completedTaskList));
	}, [taskList, completedTaskList]);

	const handleChange = (event) => {
		setText(event.target.value);
	};

	const handleKeyDown = (event) => {
		if (event.keyCode === 13) {
			// Call your function here
			addTask();
		}
	};

	const deleteTask = (idx, desiredList = null) => {
		if (desiredList === null) {
			const updatedTasks = [...completedTaskList];
			updatedTasks.splice(idx, 1);
			setCompletedTaskList(updatedTasks);
		} else {
			const updatedTasks = [...taskList];
			updatedTasks.splice(idx, 1);
			setTaskList(updatedTasks);
		}
	};

	const showCompleted = () => {
		setCompletedVisibility(!completedVisibility);
	};

	const taskCompleted = (idx) => {
		const updatedTasks = [...taskList];
		updatedTasks.splice(idx, 1);
		setCompletedTaskList([
			...completedTaskList,
			...taskList.slice(idx, idx + 1),
		]);
		setTaskList(updatedTasks);

		return;
	};

	const addTask = () => {
		if (text === "" || taskList.includes(text)) {
			setText("");
			return;
		}
		setTaskList([...taskList, text]);
		setText("");
	};

	const editTask = (idx, newValue = null) => {
		if (newValue === "") {
			deleteTask(idx, "tasks");
			return;
		}
		let newTaskList = [...taskList];
		newTaskList[idx] = newValue;
		setTaskList(newTaskList);
	};

	return (
		<div className="toDoApp">
			<ul>
				<input
					type="text"
					placeholder="Enter task..."
					onChange={handleChange}
					value={text}
					className="taskEntry"
					onKeyDown={handleKeyDown}
				></input>
				<button className="addTaskButton" onClick={addTask}>
					<i className="fa-solid fa-plus"></i>
				</button>
				{taskList.length > 0 && <hr className="separator"></hr>}
				{taskList.map((task, idx) => {
					return (
						<Task
							value={task}
							key={idx}
							onClickFunctions={[
								() => taskCompleted(idx),
								() => deleteTask(idx, "tasks"),
								(updatedTask) => editTask(idx, updatedTask),
							]}
						/>
					);
				})}
				{completedTaskList.length > 0 && <hr className="separator"></hr>}
				<div className="show-button-container">
					{completedTaskList.length != 0 && (
						<button className="show-button" onClick={showCompleted}>
							{completedVisibility ? "Hide Completed" : "Show Completed"}
							{completedVisibility ? (
								<i className="fa-solid fa-angle-up"></i>
							) : (
								<i className="fa-solid fa-angle-down"></i>
							)}
						</button>
					)}
				</div>
				{completedVisibility &&
					completedTaskList.map((task, idx) => {
						return (
							<CompletedTask
								key={idx}
								value={task}
								onClick={() => deleteTask(idx)}
							/>
						);
					})}
			</ul>
			<div></div>
		</div>
	);
};

function App() {
	return (
		<div className="container">
			<h1>To Do List</h1>
			<ToDoApp />
		</div>
	);
}

const domNode = document.getElementById("app");
const root = ReactDOM.createRoot(domNode);

root.render(<App />);
