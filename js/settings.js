// Add onclick events to buttons
document.getElementById("update_sites_button").addEventListener("click", update_blocked_sites);
document.getElementById("update_gcal_button").addEventListener("click", update_gcal)

chrome.storage.sync.get("blocked_sites", function(obj) {
    let websites_block_list = obj["blocked_sites"]

    document.getElementById("block_sites_form").value = websites_block_list;

});

function update_blocked_sites() {

    current_sites = document.getElementById("block_sites_form").value;

    untrimmed_current_sites = current_sites.split(",")

    const websites_block_list = untrimmed_current_sites.map(element => {
        return element.trim();
    });

    // alert(websites_block_list)

    chrome.storage.sync.set({"blocked_sites": websites_block_list}, function() {
        console.log('Updated blocked sites');
    });
}

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