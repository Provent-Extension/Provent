function pomodoro() {
	minute = document.getElementById("minute");
	second = document.getElementById("second");
	
	minute.innerHTML = 25;
	second.innerHTML = "00";

	document.getElementById("pomodoro_button").classList.add("pomodoro_button_selected");
	document.getElementById("short_pomodoro_button").classList.remove("pomodoro_button_selected");
	document.getElementById("long_pomodoro_button").classList.remove("pomodoro_button_selected");
}

function short_break() {
	minute = document.getElementById("minute");
	second = document.getElementById("second");
	
	minute.innerHTML = "05";
	second.innerHTML = "00";

	document.getElementById("pomodoro_button").classList.remove("pomodoro_button_selected");
	document.getElementById("short_pomodoro_button").classList.add("pomodoro_button_selected");
	document.getElementById("long_pomodoro_button").classList.remove("pomodoro_button_selected");
}

function long_break() {
	minute = document.getElementById("minute");
	second = document.getElementById("second");
	
	minute.innerHTML = 15;
	second.innerHTML = "00";

	document.getElementById("pomodoro_button").classList.remove("pomodoro_button_selected");
	document.getElementById("short_pomodoro_button").classList.remove("pomodoro_button_selected");
	document.getElementById("long_pomodoro_button").classList.add("pomodoro_button_selected");
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

function start_pomodoro() {
	minute = document.getElementById("minute").innerHTML;
	
	if (minute == "25") {
		run_pomodoro(25);
	}
	else if (minute == "05") {
		run_pomodoro(5);
	}
	else if (minute == "15") {
		run_pomodoro(15);
	}
	
}

