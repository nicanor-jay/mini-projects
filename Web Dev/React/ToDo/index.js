const Task = ({ value, onClick = null }) => {
	return (
		<li className="task">
			<p>{value}</p>
			<button onClick={onClick}>
				<i className="fa-solid fa-check green"></i>
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

	const taskCompleted = (idx) => {
		const updatedTasks = [...taskList];
		updatedTasks.splice(idx, 1);
		setTaskList(updatedTasks);
		return;
	};

	const addTask = () => {
		setTaskList([...taskList, text]);
		setText("");
	};

	return (
		<div className="toDoApp">
			<ul>
				{taskList.map((task, idx) => {
					return <Task value={task} onClick={() => taskCompleted(idx)} />;
				})}
				<input
					type="text"
					placeholder="Enter task..."
					onChange={handleChange}
					value={text}
				></input>
				<button onClick={addTask}>Add</button>
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
