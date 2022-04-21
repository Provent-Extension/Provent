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

function pomodoro() {
	minute = document.getElementById("minute");
	second = document.getElementById("second");
	
	minute.innerHTML = 25;
	second.innerHTML = "00";

	start_pomodoro_button.innerHTML = "Start";

	document.getElementById("pomodoro_button").classList.add("pomodoro_button_selected");
	document.getElementById("short_pomodoro_button").classList.remove("pomodoro_button_selected");
	document.getElementById("long_pomodoro_button").classList.remove("pomodoro_button_selected");
	clearInterval(interval); 
}

function short_break() {
	minute = document.getElementById("minute");
	second = document.getElementById("second");
	
	minute.innerHTML = "05";
	second.innerHTML = "00";

	start_pomodoro_button.innerHTML = "Start";

	document.getElementById("pomodoro_button").classList.remove("pomodoro_button_selected");
	document.getElementById("short_pomodoro_button").classList.add("pomodoro_button_selected");
	document.getElementById("long_pomodoro_button").classList.remove("pomodoro_button_selected");
	
	chrome.storage.sync.set({"pomo_status": "break"}, function() {
		console.log('Value is set to break');
	});

	clearInterval(interval); 
}

function long_break() {
	minute = document.getElementById("minute");
	second = document.getElementById("second");
	
	minute.innerHTML = 15;
	second.innerHTML = "00";

	start_pomodoro_button.innerHTML = "Start";

	document.getElementById("pomodoro_button").classList.remove("pomodoro_button_selected");
	document.getElementById("short_pomodoro_button").classList.remove("pomodoro_button_selected");
	document.getElementById("long_pomodoro_button").classList.add("pomodoro_button_selected");

	clearInterval(interval); 
}

var seconds = 0;
var interval ;

function run_pomodoro(mins) {
	// If it's the 25 minute timer, change the status in the Chrome Storage
	if (mins == "25") {
		chrome.storage.sync.set({"pomo_status": "productivity"}, function() {
			console.log('Value is set to productivity');
		});
	}

	else {
		chrome.storage.sync.set({"pomo_status": "break"}, function() {
			console.log('Value is set to break');
		});
	}


	minute = document.getElementById("minute");
	second = document.getElementById("second");

   seconds = mins*60 || 0;     
   
   interval = setInterval(function() {
        seconds--;
		
		minute.innerHTML = ("0" + (seconds/60 | 0)).slice(-2);
		second.innerHTML = ("0" + (seconds%60)).slice(-2);

        if(!seconds){
             clearInterval(interval); 
			 if (mins == "25") {
				 // Notification that says time to take a short break
				
				 short_break();
			 }
			 else {

				// Notification that says your break is over! Time to be productive again

				 pomodoro();
			 }
        }
   },1000)

}

document.getElementById("start_pomodoro_button").addEventListener("click", start_pomodoro);

document.getElementById("pomodoro_button").addEventListener("click", pomodoro);
document.getElementById("short_pomodoro_button").addEventListener("click", short_break);
document.getElementById("long_pomodoro_button").addEventListener("click", long_break);

function start_pomodoro() {
	if (!("Notification" in window)) {
		alert("This browser does not support desktop notification");
	  }
	
	  // Let's check whether notification permissions have already been granted
	  else if (Notification.permission === "granted") {
		// If it's okay let's create a notification
		var notification = new Notification("Hi there!", {
			body: "Your pomodoro timer has just started! It's time to get to work!",
			icon: "images/icon-transparent.png"
		});

	  }
	
	  // Otherwise, we need to ask the user for permission
	  else if (Notification.permission !== "denied") {
		Notification.requestPermission().then(function (permission) {
		  // If the user accepts, let's create a notification
		  if (permission === "granted") {
			var notification = new Notification("Hi there!", {
				body: "Your pomodoro timer has just started! It's time to get to work!",
				icon: "images/icon-transparent.png"
			});
	
		  }
		});
	  }

	  else if (Notification.permission !== "default") {
		Notification.requestPermission().then(function (permission) {
		  // If the user accepts, let's create a notification
		  if (permission === "granted") {
			var notification = new Notification("Hi there!", {
				body: "Your pomodoro timer has just started! It's time to get to work!",
				icon: "images/icon-transparent.png"
			});
	
		  }
		});
	  }

	minute = document.getElementById("minute").innerHTML;
	
	if (start_pomodoro_button.innerHTML == "Start") {
		if (document.getElementById("pomodoro_button").classList.contains("pomodoro_button_selected")) {
			run_pomodoro(25);
		}
			
		else if (document.getElementById("short_pomodoro_button").classList.contains("pomodoro_button_selected")) {
			run_pomodoro(5);
		}
			
		else if (document.getElementById("long_pomodoro_button").classList.contains("pomodoro_button_selected")) {
			run_pomodoro(15);
		}

		start_pomodoro_button.innerHTML = "Pause";
	}
	
	else if (start_pomodoro_button.innerHTML == "Resume") {
		// alert(seconds);
		run_pomodoro(seconds/60);
		start_pomodoro_button.innerHTML = "Pause";
	}

	else {
		start_pomodoro_button.innerHTML = "Resume";
		clearInterval(interval);
	}
}

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


