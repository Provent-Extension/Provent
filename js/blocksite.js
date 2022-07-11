// Website blocker
function detect_pomo_status() {
    chrome.storage.sync.get("pomo_status", function (obj) {
        let status = obj["pomo_status"];
		console.log(status);
		
		
        if (status === "productivity") {   

            // Adds a box that prevents the user from viewing the contents of the distracting website
            block_site_box = document.createElement("div");
			block_site_box.setAttribute("id", "block_site_box")
            block_site_box.classList.add("proventbs_block_container");
            block_site_box.innerHTML = '<!DOCTYPE html> <html> <head> <link rel="stylesheet" href="css/blocksite.css"> </head> <!-- Copy and paste everything in the body to blocksite.js --> <body> <div class="proventbs_block_container"> <div class="proventbs_hero_column proventbs_hero_left"> <img class="proventbs_provent_timer" src="https://raw.githubusercontent.com/Provent-Extension/External-Assets/fd7613110f9dd394c5a05d8e30098b38cbe6f4fd/images/timerimage.svg" alt="Provent Timer"> </div> <div class="proventbs_hero_column proventbs_hero_right"> <p class="proventbs_blocker_message">Hey! It’s not time for your break yet, you’re almost there!</p> <h1 class="proventbs_timer"><span id="minute">--</span>:<span id="second">--</span></h1> </div> <img class="proventbs_blocksitegraphic" src="https://raw.githubusercontent.com/Provent-Extension/External-Assets/fd7613110f9dd394c5a05d8e30098b38cbe6f4fd/images/blocksitegraphic.svg"> <footer> <div class="proventbs_footer_container"> <p class="proventbs_credit">Made by <strong>Provent</strong></p> <a href="settings.html" class="proventbs_settings_icon_link" target="_blank"><i class="proventbs_settings_icon fas fa-gear"></i></a> </div> <!-- Adds fontawesome --> <script src="js/fontawesome.js"></script> </footer> </div> </body> </html>';
            // document.getElementById("blocksitegraphic").src = chrome.extension.getURL("../images/timerimage.svg");
            
            // If the blocker doesn't exist yet, add it
		
            if (!document.getElementById("block_site_box")) {
				document.body.appendChild(block_site_box);
            }
   
        }
    
        else {
			if (document.getElementById("block_site_box")) {
				if (document.getElementById("block_site_box")) {
					document.location.reload()
				}
            }
        }
    });
}


// Get list of websites to block
chrome.storage.sync.get("blocked_sites", function(obj) {
    let websites_block_list = obj["blocked_sites"]
	
	// If current URL is in that list, turn on the detect_pomo_status interval

    for (i=0; i<websites_block_list.length; i++) {
        if (window.location.href.includes(websites_block_list[i])) {
            // Runs detect_pomo_status regularly to check if we should block the website or not
            setInterval(detect_pomo_status, 2000);
        }
    }
});

// Website blocker ^^

// Get time left

interval = setInterval(function() {
	chrome.storage.sync.get("end_time", function (obj) {
		let end_time = obj["end_time"];
				
		const date = new Date();
		let current_time = date.getTime();
					
		// Timer has ended
		if (end_time <= current_time) {
			// REMOVE WEBSITE BLOCKER
			if (document.getElementById("block_site_box")) {

				chrome.storage.sync.set({"pomo_status": "break"}, function() {
					console.log('Value is set to break');
				});
				// document.body.removeChild(block_site_box);
				document.location.reload()
			}
		}
				
		// Timer has not ended yet
		else {
			milliseconds_left = end_time - current_time;
			minutes_left = (milliseconds_left/1000)/60;
			console.log(minutes_left);
			
			minute = document.getElementById("minute");
			second = document.getElementById("second");

			seconds = minutes_left*60 || 0;     
		

			seconds--;
					
			// Changes the text on the timer
			minutes_text = ("0" + (seconds/60 | 0)).split("."); // Removes decimal in seconds
			minutes_text = minutes_text[0].slice(-2); // Removes the "0" if it is 3 digits
			minute.innerHTML = minutes_text;

					
			seconds_text = ("0" + (seconds%60)).split("."); // Removes decimal in seconds
			seconds_text = seconds_text[0].slice(-2); // Removes the "0" if it is 3 digits
					
			second.innerHTML = seconds_text;
		}
		
	});
},1000)


// If current URL is in that list, turn on the detect_pomo_status interval




// https://developer.chrome.com/docs/extensions/reference/storage/