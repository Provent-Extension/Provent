function detect_pomo_status() {
    chrome.storage.sync.get("pomo_status", function (obj) {
        let status = obj["pomo_status"];
    
        if (status === "productivity") {
            // alert("Time to be productive");
            

            // Adds a box that prevents the user from viewing the contents of the distracting website
            block_site_box = document.createElement("div");
            block_site_box.classList.add("block_container");

            document.body.appendChild(block_site_box);
    
        }
    
        else {
            // alert("No need to be productive");
            document.body.removeChild(block_site_box);
        }
    });
}


// Runs detect_pomo_status regularly to check if we should block the website or not
setInterval(detect_pomo_status, 5000);

// https://developer.chrome.com/docs/extensions/reference/storage/