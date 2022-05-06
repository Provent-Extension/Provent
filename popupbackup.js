chrome.storage.sync.get("end_time", function (obj) {
	let end_time = obj["end_time"];

	const date = new Date();
	let current_time = date.getTime();

	// Timer has ended
	if (end_time <= current_time) {
		alert("TIMER OVER!!! YAY!!!");
	}

	// Timer has not ended yet
	else {
		seconds_left = end_time - current_time;
		minutes_left = seconds_left/60000
		run_pomodoro(minutes_left)
		alert("TIMER NOT ENDED!! GET BACK TO WORK!");
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

	clearInterval(interval); 
}

var seconds = 0;
var interval ;

function run_pomodoro(mins) {
    const date = new Date();
    let start_time = date.getTime();

    // Calculates the end time
    end_time = start_time + (mins * 60000);
	seconds_left = end_time - start_time;
	minutes_left = seconds_left/60000

	chrome.storage.sync.set({"end_time": end_time}, function() {
		console.log('End time is set to' + end_time);
	});

	console.log(minutes_left)

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


