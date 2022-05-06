chrome.storage.sync.get("end_time", function (obj) {
	let end_time = obj["end_time"];

	const date = new Date();
	let current_time = date.getTime();


	console.log(end_time)
	console.log(current_time)
	// Timer has ended
	if (end_time <= current_time) {
		console.log("TIMER OVER!!! YAY!!!");
	}

	// Timer has not ended yet
	else {
		milliseconds_left = end_time - current_time;
		minutes_left = (milliseconds_left/1000)/60;
		console.log(minutes_left);
		run_pomodoro(minutes_left)
		console.log("TIMER NOT ENDED!! GET BACK TO WORK!");
	}
});

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

    chrome.storage.sync.set({"pomo_status": "break"}, function() {
		console.log('Value is set to break');
	});

	clearInterval(interval); 
}

var seconds = 0;
var interval ;

// What if I make this into seconds?
function run_pomodoro(mins) {
    const date = new Date();
    let start_time = date.getTime();

    // Calculates the end time
    end_time = start_time + (mins * 60000); // (60000 cause milliseconds)


	milliseconds_left = end_time - start_time;
	minutes_left = (milliseconds_left/1000)/60;

	console.log(minutes_left)

	chrome.storage.sync.set({"end_time": end_time}, function() {
		console.log('End time is set to ' + end_time + " and start time is " + start_time);
	});

	console.log(minutes_left)


	pomodoro_status = document.getElementById("pomodoro_button").classList.contains("pomodoro_button_selected");


	// If pomodoro has the selected class
	if (pomodoro_status) {
		chrome.storage.sync.set({"pomo_status": "productivity"}, function() {
			console.log('Value is set to productivity');
		});
	}

    // Else (if the pomodoro does not have the selected class)
	else {
		chrome.storage.sync.set({"pomo_status": "break"}, function() {
			console.log('Value is set to break');
		});
	}


	minute = document.getElementById("minute");
	second = document.getElementById("second");

   seconds = mins*60 || 0;     
   console.log("running")
   interval = setInterval(function() {

        seconds--;
		
		// Changes the text on the timer
		minutes_text = ("0" + (seconds/60 | 0)).split("."); // Removes decimal in seconds
		minutes_text = minutes_text[0].slice(-2); // Removes the "0" if it is 3 digits
		minute.innerHTML = minutes_text;

		
		seconds_text = ("0" + (seconds%60)).split("."); // Removes decimal in seconds
		seconds_text = seconds_text[0].slice(-2); // Removes the "0" if it is 3 digits
		
		second.innerHTML = seconds_text;


        // If over
        if(!seconds){
             clearInterval(interval); 
             // If the user was using the pomodoro timer
			 if (pomodoro_status) {
                 
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
			run_pomodoro(minute);
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


