

// Unsplash

// const numImagesAvailable = 2  //how many photos are total in the collection
const numItemsToGenerate = 1000; // How many photos you want to display
const imageWidth = screen.width;   // Image width in pixels
const imageHeight = screen.height;   // Image height in pixels
const collectionID = 10938601  // Collection ID

const background = document.querySelector('.page_background')
let image_index = 1;
fetch(`https://source.unsplash.com/collection/${collectionID}/${imageWidth}x${imageHeight}/?sig=${image_index}`)
		.then((response) => {
			background.src = response.url;
		})

let date = new Date().getDate();

chrome.storage.sync.get("previous_date", function (obj) {
	let previous_date = obj["previous_date"]

	// If it's been more then a day, then create a new list
	if (date != previous_date) {
		let background_lists = [];
		let image_index = 1;
		fetch(`https://source.unsplash.com/collection/${collectionID}/${imageWidth}x${imageHeight}/?sig=${image_index}`)
		.then((response) => {
			// alert(response.url)
			// background.src = response.url;
			for (let i=0; i<numItemsToGenerate; i++) {
				background_lists.push(response.url);
			}
			chrome.storage.sync.set({"backgrounds": background_lists}, function() {
				console.log('Collected new backgrounds');
			});	
			chrome.storage.sync.set({"previous_date": date}, function() {
				console.log('Changed the previous date');
			});	
		})
		// Unsplash ^^^
	}
});

chrome.storage.sync.get("backgrounds", function (obj) {
	let background_lists = obj["backgrounds"]
	background.src = background_lists[Math.floor(Math.random() * background_lists.length)];
});

// let image_index = Math.floor(Math.random() * numImagesAvailable);



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
	else if (date.getHours() == 0) {
		document.getElementById("hour").innerHTML = 12;
		document.getElementById("meridiem").innerHTML = "AM"
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
    
	// Gets the ordinal suffix of the number
    if (date.getDate() % 10 == 1 && date.getDate() % 100 != 11) {
        var ordinal_suffix = "st"
    }
    else if (date.getDate() % 10 == 2 && date.getDate() % 100 != 12) {
        var ordinal_suffix = "nd"
    }
    else if (date.getDate() % 10 == 3 && date.getDate() % 100 != 13) {
        var ordinal_suffix = "rd"
    }
	else {
		var ordinal_suffix = "th"
	}

	document.getElementById("day").innerHTML = date.getDate() + ordinal_suffix;
	document.getElementById("year").innerHTML = date.getFullYear();
}

setInterval(updateClock, 1);
// Time ^^^



// Onclick icon, get icon's data value
var widget_icons = document.querySelectorAll('[id^=widget_icon]');
var widget_app_containers = document.querySelectorAll('[id^=widget_app_container]');

// for (let i=0; i <= widget_icons.length; i++) {
// 	widget_icons[i].addEventListener("click", function() {
// 		// alert(widget_icons[i].getAttribute("data"));
	
// 		// For every widget app with data X

// 		for (let i=0; i <= widget_app_containers.length; i++) {
// 			// alert(widget_app_containers[i].getAttribute("data"))
// 			if (widget_app_containers[i].getAttribute("data") == widget_icons[i].getAttribute("data")) {
// 				// Display block
// 				widget_app_containers[i].style.display = "block";
// 			}

// 			else {
// 				widget_app_containers[i].style.display = "none";
// 			}
// 		}


// 	});
// }



