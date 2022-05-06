function slide_youtube() {
	alert("ok");
	
}

// YouTube onclick
document.getElementById("youtube_button").addEventListener("click", slide_youtube);

function load_tasks() {
	saved_tasks_string = localStorage.getItem("tasks");

	var html_element = document.createElement("div");
	html_element.innerHTML = saved_tasks_string;

	var childDivs = html_element.getElementsByTagName('div');

	// alert(html_element.innerHTML); <-- works

	for (i=0; i < childDivs.length; i++) {
		// Get task name
		task_data = childDivs[i].innerHTML;

		var task_data_element = document.createElement('html');
		task_data_element.innerHTML = task_data;
		
		// Saves the task name
		the_task = task_data_element.getElementsByTagName('span')[0].innerHTML;


		// Container containing all the tasks
		tasks_list = document.getElementById("tasks_list");

		// Create a div for the task
		const task_container = document.createElement("div");

		// Add a checkbox beside the task
		const checkbox = document.createElement("input");
		checkbox.type = "checkbox";
		checkbox.classList.add("task_checkbox")

		// See if the task is crossed out
		if (task_data_element.getElementsByTagName('span')[0].classList.contains("cross_out")) {
			// If so, check it's checkbox boxed and add the cross_out class
			checkbox.checked = true;

		}

		task_container.appendChild(checkbox);

		// Crosses out the task when the box is clicked
		checkbox.onclick = function() { 
			// If it has the class "cross_out", remove the class "cross_out" from the element
			if (task_name.classList.contains("cross_out")) {
				task_name.classList.remove("cross_out");
			}

			else {
				// Else, adds the class "cross_out" to the element
				task_name.classList.add("cross_out");
			}

			save_tasks();
		};

		// Adds the name of the task to the task container
		const task_name = document.createElement("span");

		task_name.innerHTML = the_task;
		task_name.classList.add("a_task");

		if (checkbox.checked == true) {task_name.classList.add("cross_out");}
		task_container.appendChild(task_name);

		// Add a X beside the task
		const delete_button = document.createElement('button');
		delete_button.innerHTML = "X";
		delete_button.classList.add("delete_task_button")
		task_container.appendChild(delete_button);

		// Removes the task when the button is clicked
		delete_button.onclick = function() { 
			task_container.remove();
			save_tasks();
		};

		tasks_list.appendChild(task_container);	
		save_tasks();
	}
}

load_tasks();

function save_tasks() {
	// Convert all the tasks into JSON format, then save it


	// EXAMPLE

	/*

	<div><input type="checkbox"><span class="a_task">ddd</span><button>X</button></div>
	<div><input type="checkbox"><span class="a_task cross_out">dfffffsss</span><button>X</button></div>
	
	*/
	
	// Does not have: onclick functions
	// do we have to convert to JSON then?? Or just make it so that when I load the tasks, it adds the onclick functions to it
	// Let's try that

	current_tasks_unformatted = document.getElementById("tasks_list").innerHTML;
	// alert(current_tasks_unformatted)

	localStorage.setItem('tasks', current_tasks_unformatted);
}


function add_task_button() {
	the_task = document.getElementById("task_input").value;
	
	// Makes the text box empty
	document.getElementById("task_input").value = "";

	// Container containing all the tasks
	tasks_list = document.getElementById("tasks_list");

	// Create a div for the task
	const task_container = document.createElement("div");
	

	// Add a checkbox beside the task
	const checkbox = document.createElement("input");
	checkbox.type = "checkbox";
	checkbox.classList.add("task_checkbox")
	task_container.appendChild(checkbox);

	// Crosses out the task when the box is clicked
	checkbox.onclick = function() { 
		// If it has the class "cross_out", remove the class "cross_out" from the element
		if (task_name.classList.contains("cross_out")) {
			task_name.classList.remove("cross_out");
		}
	
		else {
			// Else, adds the class "cross_out" to the element
			task_name.classList.add("cross_out");
		}

		save_tasks();
	};

	// Adds the name of the task to the task container
	const task_name = document.createElement("span");

	task_name.innerHTML = the_task;
	task_name.classList.add("a_task");
	task_container.appendChild(task_name);

	// Add a X beside the task
	const delete_button = document.createElement('button');
	delete_button.innerHTML = "X";
	delete_button.classList.add("delete_task_button")
	task_container.appendChild(delete_button);

	// Removes the task when the button is clicked
	delete_button.onclick = function() { 
		task_container.remove();
		save_tasks();
	 };

	tasks_list.appendChild(task_container);	
	save_tasks();
}

// When the user presses the "Enter" key on the keyboard, submit the form to add a task
document.getElementById("task_input").addEventListener("keyup", 
	function(event) {
		// Number 13 is the "Enter" key on the keyboard
		if (event.keyCode === 13) {
			add_task_button();
		}
	}
);

// Add task button onclick
document.getElementById("add_task_button").addEventListener("click", add_task_button);


