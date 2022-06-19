// function detect_pomo_status() {
//     chrome.storage.sync.get("pomo_status", function (obj) {
//         let status = obj["pomo_status"];
//         if (status === "productivity") {   

//             // Adds a box that prevents the user from viewing the contents of the distracting website
//             block_site_box = document.createElement("div");
//             block_site_box.classList.add("block_container");

//             heading_text = document.createElement("h1");
//             heading_text.innerHTML = "Your break hasn't started yet! Keep working!!";
//             heading_text.classList.add("heading_text")

//             block_site_box.appendChild(heading_text);
//             document.body.appendChild(block_site_box);
    
//         }
    
//         else {
//             // alert("Break ended!")
//             document.body.removeChild(block_site_box);
//         }
//     });
// }


function detect_pomo_status() {
    chrome.storage.sync.get("pomo_status", function (obj) {
        let status = obj["pomo_status"];
        if (status === "productivity") {   
            document.getElementsByTagName("body")[0].innerHTML = "";
            // Adds a box that prevents the user from viewing the contents of the distracting website
            block_site_box = document.createElement("div");
            block_site_box.classList.add("block_container");
            block_site_box.innerHTML = '<!DOCTYPE html> <html> <head> <link rel="stylesheet" href="css/blocksite.css"> </head> <!-- Copy and paste everything in the body to blocksite.js --> <body> <div class="block_container"> <div class="hero_column hero_left"> <img class="provent_timer" src="https://raw.githubusercontent.com/Provent-Extension/External-Assets/fd7613110f9dd394c5a05d8e30098b38cbe6f4fd/images/timerimage.svg" alt="Provent Timer"> </div> <div class="hero_column hero_right"> <p class="blocker_message">Hey! It’s not time for your break yet, you’re almost there!</p> <h1 class="timer"><span id="minute">24</span>:<span id="second">12</span></h1> </div> <img class="blocksitegraphic" src="https://raw.githubusercontent.com/Provent-Extension/External-Assets/fd7613110f9dd394c5a05d8e30098b38cbe6f4fd/images/blocksitegraphic.svg"> <footer> <div class="footer_container"> <p class="credit">Made by <strong>Provent</strong></p> <a href="settings.html" class="settings_icon_link" target="_blank"><i class="settings_icon fas fa-gear"></i></a> </div> <!-- Adds fontawesome --> <script src="js/fontawesome.js"></script> </footer> </div> </body> </html>';
            // document.getElementById("blocksitegraphic").src = chrome.extension.getURL("../images/timerimage.svg");
            
            // DOESN'T WORK, NEED TO FIX
            if (document.body.contains(block_site_box)) {
                console.log("Already has blocker")
            }
            else {
                document.body.appendChild(block_site_box);
            }
        }
    
        else {
            // alert("Break ended!")
            document.body.removeChild(block_site_box);
            document.location.reload()
        }
    });
}


// Get list of websites to block

chrome.storage.sync.get("blocked_sites", function(obj) {
    let websites_block_list = obj["blocked_sites"]
    // alert(websites_block_list)

    for (i=0; i<websites_block_list.length; i++) {
        if (window.location.href.includes(websites_block_list[i])) {
            // Runs detect_pomo_status regularly to check if we should block the website or not
            setInterval(detect_pomo_status, 2000);
        }
    }
});




// If current URL is in that list, turn on the detect_pomo_status interval

// https://developer.chrome.com/docs/extensions/reference/storage/