const Task = ({ value, onClick = null }) => {
	return (
		<li className="task">
			<p class="taskDesc">{value}</p>
			<button onClick={onClick}>
				<i className="fa-solid fa-check"></i>
			</button>
		</li>
	);
};

const ToDoApp = () => {
	const [taskList, setTaskList] = React.useState([]);
	const [text, setText] = React.useState("");

	const handleChange = (event) => {
		console.log(event.target.value + "");
		setText(event.target.value);
	};

	const handleKeyDown = (event) => {
		if (event.keyCode === 13) {
			// Call your function here
			addTask();
		}
	};

	const taskCompleted = (idx) => {
		const updatedTasks = [...taskList];
		updatedTasks.splice(idx, 1);
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
				<hr className="separator"></hr>
				{taskList.map((task, idx) => {
					return <Task value={task} onClick={() => taskCompleted(idx)} />;
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
