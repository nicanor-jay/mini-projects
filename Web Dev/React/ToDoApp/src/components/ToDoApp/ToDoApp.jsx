import {useState, useEffect} from 'react'
import Task from '../Task/Task.jsx'
import CompletedTask from '../CompletedTask/CompletedTask.jsx'
import '../../shared.css'

const ToDoApp = () => {
	const [taskList, setTaskList] = useState([]);
	const [text, setText] = useState("");
	const [completedTaskList, setCompletedTaskList] = useState([]);
	const [completedVisibility, setCompletedVisibility] = useState(false);

	//Stores todo list in local storage
	useEffect(() => {
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
	useEffect(() => {
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

export default ToDoApp;