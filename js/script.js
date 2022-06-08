function slide_youtube() {
	alert("ok");
	
}

// YouTube onclick
document.getElementById("youtube_button").addEventListener("click", slide_youtube);

// Clock
function updateClock () {
	let date = new Date();
	// time
	if (date.getHours() >= 13) {
		document.getElementById("hour").innerHTML = date.getHours() - 12;
		document.getElementById("meridiem").innerHTML = "PM"
	}
	else {
		document.getElementById("hour").innerHTML = date.getHours();
		document.getElementById("meridiem").innerHTML = "AM"
	}
	
	if (String(date.getMinutes()).length == 1) {
		document.getElementById("minutes").innerHTML = "0" + date.getMinutes();
	}
	
	else {
		document.getElementById("minutes").innerHTML = date.getMinutes();
	}

	// date
	let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	let weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
	document.getElementById("weekday").innerHTML = weekdays[date.getDay()];
	document.getElementById("month").innerHTML = months[date.getMonth()];
	document.getElementById("day").innerHTML = date.getDate();
	document.getElementById("year").innerHTML = date.getFullYear();
}

setInterval(updateClock, 1);
// Time ^^^