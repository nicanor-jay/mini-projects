const Task = ({ value, onClick = null }) => {
	return (
		<li className="task">
			<p className="task-desc">{value}</p>
			<button onClick={onClick}>
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
				<button onClick={onClick}>
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

	//Retries todo list from local storage if it exists
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

	const deleteTask = (idx) => {
		const updatedTasks = [...completedTaskList];
		updatedTasks.splice(idx, 1);
		setCompletedTaskList(updatedTasks);
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
		if (text === "") {
			return;
		}
		setTaskList([...taskList, text]);
		setText("");
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
					return <Task value={task} onClick={() => taskCompleted(idx)} />;
				})}
				{completedTaskList.length > 0 && <hr className="separator"></hr>}
				{completedTaskList.map((task, idx) => {
					return <CompletedTask value={task} onClick={() => deleteTask(idx)} />;
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
