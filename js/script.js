// Clock
function updateClock () {
	let date = new Date();
	// time
	if (date.getHours() >= 13) {
		document.getElementById("hour").innerHTML = date.getHours() - 12;
		document.getElementById("meridiem").innerHTML = "PM"
	}
	else if (date.getHours() == 12) {
		document.getElementById("hour").innerHTML = date.getHours();
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



// Onclick icon, get icon's data value
var widget_icons = document.querySelectorAll('[id^=widget_icon]');
var widget_app_containers = document.querySelectorAll('[id^=widget_app_container]');

for (let i=0; i <= widget_icons.length; i++) {
	widget_icons[i].addEventListener("click", function() {
		// alert(widget_icons[i].getAttribute("data"));
	
		// For every widget app with data X

		for (let i=0; i <= widget_app_containers.length; i++) {
			// alert(widget_app_containers[i].getAttribute("data"))
			if (widget_app_containers[i].getAttribute("data") == widget_icons[i].getAttribute("data")) {
				// Display block
				widget_app_containers[i].style.display = "block";
			}

			else {
				widget_app_containers[i].style.display = "none";
			}
		}


	});
}



