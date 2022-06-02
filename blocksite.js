function detect_pomo_status() {
    chrome.storage.sync.get("pomo_status", function (obj) {
        let status = obj["pomo_status"];
        if (status === "productivity") {   

            // Adds a box that prevents the user from viewing the contents of the distracting website
            block_site_box = document.createElement("div");
            block_site_box.classList.add("block_container");

            heading_text = document.createElement("h1");
            heading_text.innerHTML = "Your break hasn't started yet! Keep working!!";
            heading_text.classList.add("heading_text")

            block_site_box.appendChild(heading_text);


            document.body.appendChild(block_site_box);
    
        }
    
        else {

            document.body.removeChild(block_site_box);
        }
    });
}


// Get list of websites to block

websites_block_list = ["https://www.instagram.com/", "https://www.youtube.com/"]

if (websites_block_list.includes(window.location.href)) {
    // Runs detect_pomo_status regularly to check if we should block the website or not
    setInterval(detect_pomo_status, 2000);

}



// If current URL is in that list, turn on the detect_pomo_status interval

// https://developer.chrome.com/docs/extensions/reference/storage/