// BLOCKED SITES FEATURE
// Add onclick events to buttons
document.getElementById("update_sites_button").addEventListener("click", update_blocked_sites);

function show_blocked_sites() {
    chrome.storage.sync.get("blocked_sites", function(obj) {
        let websites_block_list = obj["blocked_sites"]
        
        for (let i=0; i<websites_block_list.length; i++) {
            // Add to the ul
            blocked_websites_ul = document.getElementById("blocked_websites_ul");

            blocked_websites_li = document.createElement("li");
            blocked_websites_li.innerHTML = websites_block_list[i]
            blocked_websites_li.classList.add("blocked_websites_li");
     
            const delete_button = document.createElement('button');
            delete_button.innerHTML = '<i class="delete_site_button fa-solid fa-xmark"></i>';
            delete_button.setAttribute("data-url", websites_block_list[i])
            blocked_websites_li.appendChild(delete_button);
            blocked_websites_ul.appendChild(blocked_websites_li);
            
            // Removes the task when the button is clicked
            delete_button.onclick = function() { 
                website_to_remove = delete_button.getAttribute('data-url');
                // Remove website from array
                website_index = websites_block_list.indexOf(website_to_remove)
                websites_block_list.splice(website_index, 1)
                
                // Save list
                chrome.storage.sync.set({"blocked_sites": websites_block_list}, function() {
                    console.log('Updated blocked sites');
                });

                // Refresh interface
                blocked_websites_ul.innerHTML = ""
                show_blocked_sites()
            };
        }
    });
}

show_blocked_sites() // MAKE THIS RUN WHEN EXPAND IS CLICKED

chrome.storage.sync.get("blocked_sites", function(obj) {
    let websites_block_list = obj["blocked_sites"]

    document.getElementById("block_sites_data").value = websites_block_list;

});

function update_blocked_sites() {
    new_site = document.getElementById("block_sites_form").value;

    if (new_site) {
        current_sites = document.getElementById("block_sites_data").value;
        untrimmed_current_sites = current_sites.split(",")
        
        if (!untrimmed_current_sites.includes(new_site)) {
            untrimmed_current_sites.push(new_site);
        }
    
        const websites_block_list = untrimmed_current_sites.map(element => {
            return element.trim();
        });
    
        for (let i=0; i<websites_block_list.length; i++) {
            if (websites_block_list[i].length == 0) {
                websites_block_list.splice(i, 1)
            }
        }

        chrome.storage.sync.set({"blocked_sites": websites_block_list}, function() {
            console.log('Updated blocked sites');
        });

        show_blocked_sites()
    }
}
// BLOCKED SITES FEATURE ^^^

// GOOGLE CALENDAR
// Adds onclick event to button
document.getElementById("update_gcal_button").addEventListener("click", update_gcal)

function update_gcal() {
    current_gcal = document.getElementById("gcal_form").value;
    chrome.storage.sync.set({"gcal_link": current_gcal}, function() {
        console.log('Updated gcal');
    });
}

chrome.storage.sync.get("gcal_link", function(obj) {
    let current_gcal = obj["gcal_link"];
    document.getElementById("gcal_form").value = current_gcal;
}) 
// GOOGLE CALENDAR ^^^


// YOUTUBE FEATURE
// // Add onclick events to buttons
// document.getElementById("update_youtube_button").addEventListener("click", update_blocked_sites);

// function show_blocked_sites() {
//     chrome.storage.sync.get("youtube_playlists", function(obj) {
//         let youtube_playlist_list = obj["youtube_playlists"]
        
//         for (let i=0; i<youtube_playlist_list.length; i++) {
//             // Add to the ul
//             blocked_websites_ul = document.getElementById("blocked_websites_ul");

//             blocked_websites_li = document.createElement("li");
//             blocked_websites_li.innerHTML = youtube_playlist_list[i]
//             blocked_websites_li.classList.add("blocked_websites_li");
     
//             const delete_button = document.createElement('button');
//             delete_button.innerHTML = '<i class="delete_site_button fa-solid fa-xmark"></i>';
//             delete_button.setAttribute("data-url", youtube_playlist_list[i])
//             blocked_websites_li.appendChild(delete_button);
//             blocked_websites_ul.appendChild(blocked_websites_li);
            
//             // Removes the task when the button is clicked
//             delete_button.onclick = function() { 
//                 website_to_remove = delete_button.getAttribute('data-url');
//                 // Remove website from array
//                 website_index = youtube_playlist_list.indexOf(website_to_remove)
//                 youtube_playlist_list.splice(website_index, 1)
                
//                 // Save list
//                 chrome.storage.sync.set({"blocked_sites": youtube_playlist_list}, function() {
//                     console.log('Updated blocked sites');
//                 });

//                 // Refresh interface
//                 blocked_websites_ul.innerHTML = ""
//                 show_blocked_sites()
//             };
//         }
//     });
// }

// show_blocked_sites() // MAKE THIS RUN WHEN EXPAND IS CLICKED

// chrome.storage.sync.get("blocked_sites", function(obj) {
//     let websites_block_list = obj["blocked_sites"]

//     document.getElementById("block_sites_data").value = websites_block_list;

// });

// function update_blocked_sites() {
//     new_site = document.getElementById("block_sites_form").value;

//     if (new_site) {
//         current_sites = document.getElementById("block_sites_data").value;
//         untrimmed_current_sites = current_sites.split(",")
        
//         if (!untrimmed_current_sites.includes(new_site)) {
//             untrimmed_current_sites.push(new_site);
//         }
    
//         const websites_block_list = untrimmed_current_sites.map(element => {
//             return element.trim();
//         });
    
//         for (let i=0; i<websites_block_list.length; i++) {
//             if (websites_block_list[i].length == 0) {
//                 websites_block_list.splice(i, 1)
//             }
//         }

//         chrome.storage.sync.set({"blocked_sites": websites_block_list}, function() {
//             console.log('Updated blocked sites');
//         });

//         show_blocked_sites()
//     }
// }
// YOUTUBE FEATURE ^^^


// EXPAND FEATURE
// Add onclick expand, show expanded items
var expand = document.querySelectorAll('[id^=expand]');
var expanded_items = document.querySelectorAll('[id^=expanded_items]');


for (let i=0; i <= expand.length; i++) {
	// If the widget icon exists
	if (expand[i]) {
		expand[i].addEventListener("click", function() {
			// For every widget app with data X
			for (let k=0; k <= expanded_items.length; k++) {
				if (expanded_items[k]) {
					if (expanded_items[k].getAttribute("data-option") === expand[i].getAttribute("data-option")) {
						
                        if (expanded_items[k].style.display === "none") {
                            // expand[i].classList.add("expand_selected");
                            expand[i].innerHTML = "Collopse &uarr;"
                            expanded_items[k].style.display = "block";
                        }

                        else {
                            // expand[i].classList.remove("expand_selected");
                            expand[i].innerHTML = "Expand >"
                            expanded_items[k].style.display = "none";
                        }
					}
		
				}
			}
		});
	}
}
// EXPAND FEATURE ^^^