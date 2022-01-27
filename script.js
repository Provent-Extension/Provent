var type = "pomodoro"

function pomodoro() {
	minute = document.getElementById("minute");
	second = document.getElementById("second");
	
	minute.innerHTML = 25;
	second.innerHTML = 00;
	var type = "pomodoro"
}

function short_break() {
	minute = document.getElementById("minute");
	second = document.getElementById("second");
	
	minute.innerHTML = 05;
	second.innerHTML = 00;
	
	var type = "short"
}

function long_break() {
	minute = document.getElementById("minute");
	second = document.getElementById("second");
	
	minute.innerHTML = 15;
	second.innerHTML = 00;
	
	var type = "long"
}

var seconds = 0;
var interval ;
function pomodoro(mins) {
	minute = document.getElementById("minute");
	second = document.getElementById("second");
	

   seconds = mins*60 || 0;     
   interval = setInterval(function() {
        seconds--;
		
		minute.innerHTML = seconds/60 | 0;
		
		second.innerHTML = seconds;
        if(!seconds){
             clearInterval(interval); 
        }
   },1000)
}

document.getElementById("start_pomodoro_button").addEventListener("click", start_pomodoro);

function start_pomodoro() {
	if (type == "pomodoro") {
		pomodoro(25);
	}
}

