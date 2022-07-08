

// Unsplash
function update_background() {
	const imageWidth = screen.width;   // Image width in pixels
	const imageHeight = screen.height;   // Image height in pixel
	const collections = [8936093, 10938601, 47285497]
	
	let image_index = 10;
	
	const collectionID = collections[Math.floor(Math.random()*collections.length)]

	const background = document.getElementById('unsplash_bg')
	
	fetch(`https://source.unsplash.com/collection/${collectionID}/${imageWidth}x${imageHeight}/?sig=${image_index}`)
	.then((response) => {
		// If the photo can't be found, look for a new one
		if ((response.url).includes("source-404")) {
			update_background()
		}
		else {background.src = response.url;}
	})
}

update_background()

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

// YouTube widget

var youtube_playlist = document.querySelectorAll('[id^=yt_play_btn]');
youtube_video = document.getElementById("youtube_embed");

for (let i=0; i <= youtube_playlist.length; i++) {
	// If the widget icon exists
	if (youtube_playlist[i]) {
		youtube_playlist[i].addEventListener("click", function() {

			var video_link = youtube_playlist[i].getAttribute("data")

			// Playlists
			if (video_link.includes("playlist?list=")) {
				var playlist_id = video_link.split("https://www.youtube.com/playlist?list=")[1]
				var new_link = "https://www.youtube.com/embed/videoseries?list=" + playlist_id;
			}
			
			// Video
			else {
				var video_link = video_link.split("&ab_channel=")[0]
				var playlist_id = video_link.split("https://www.youtube.com/watch?v=")[1]
				var new_link = "https://www.youtube.com/embed/" + playlist_id;
			}

			youtube_video.src = new_link;
		});
	}
}

// YouTube wiget ^^^