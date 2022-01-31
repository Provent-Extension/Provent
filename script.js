function pomodoro() {
	minute = document.getElementById("minute");
	second = document.getElementById("second");
	
	minute.innerHTML = 25;
	second.innerHTML = "00";

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

	document.getElementById("pomodoro_button").classList.remove("pomodoro_button_selected");
	document.getElementById("short_pomodoro_button").classList.add("pomodoro_button_selected");
	document.getElementById("long_pomodoro_button").classList.remove("pomodoro_button_selected");
	
	clearInterval(interval); 
}

function long_break() {
	minute = document.getElementById("minute");
	second = document.getElementById("second");
	
	minute.innerHTML = 15;
	second.innerHTML = "00";

	document.getElementById("pomodoro_button").classList.remove("pomodoro_button_selected");
	document.getElementById("short_pomodoro_button").classList.remove("pomodoro_button_selected");
	document.getElementById("long_pomodoro_button").classList.add("pomodoro_button_selected");

	clearInterval(interval); 
}

var seconds = 0;
var interval ;

function run_pomodoro(mins) {
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
				 short_break();
			 }
			 else {
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
		var notification = new Notification("Hi there!");
	  }
	
	  // Otherwise, we need to ask the user for permission
	  else if (Notification.permission !== "denied") {
		Notification.requestPermission().then(function (permission) {
		  // If the user accepts, let's create a notification
		  if (permission === "granted") {
			var notification = new Notification("Hi there!");
		  }
		});
	  }

	  else if (Notification.permission !== "default") {
		Notification.requestPermission().then(function (permission) {
		  // If the user accepts, let's create a notification
		  if (permission === "granted") {
			var notification = new Notification("Hi there!");
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


function add_task_button() {
	the_task = document.getElementById("task_input").value;
	
	tasks_list = document.getElementById("tasks_list");

	const task = document.createElement("li");
	task.innerHTML = the_task;
	task.classList.add("a_task");
	

	// <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
	// REPLACE LI WITH INPUT ^^

	// Add a checkbox beside the task
	// task.appendChild(check_box)

	// Add a X beside the task
	const delete_button = document.createElement('button');
	delete_button.innerHTML = "X";
	task.appendChild(delete_button);


	tasks_list.appendChild(task);



}

document.getElementById("add_task_button").addEventListener("click", add_task_button);