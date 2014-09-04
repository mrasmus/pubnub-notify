// Saves options to chrome.storage
function save_options() {
  var values = {
    popups: document.getElementById('options_popups').checked,
    urls: document.getElementById('options_urls').checked
  };
  chrome.storage.local.set(values, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.style.visibility = "visible";
    setTimeout(function() {
      status.style.visibility = "hidden";
    }, 750);
  });
}

// Get settings from storage and set form to match
function restore_options() {
  chrome.storage.local.get({
    popups: true,
    urls: true
  }, function(items) {
    document.getElementById('options_popups').checked = items.popups;
    document.getElementById('options_urls').checked = items.urls;
console.log(items);
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('options_popups').addEventListener('change',
    save_options);
document.getElementById('options_urls').addEventListener('change',
    save_options);
