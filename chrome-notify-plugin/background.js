var channel = "notify";

var pubnub = PUBNUB.init({
  publish_key: publish_key, 
  subscribe_key: subscribe_key
});

var settings = {popups:true, urls:true};

chrome.storage.local.get(settings, function(items) {
  settings.popups = items.popups;
  settings.urls = items.urls;
});

chrome.storage.onChanged.addListener(function(changes, namespace) {
  for (key in settings) {
    if (key in changes) {
      console.log("Changing " + key + " setting to value: " + changes[key].newValue);
      settings[key] = changes[key].newValue;
    }
  }
});

function handleMessage(message) {
  if ("message" in message) {
    if (settings.popups) {
      var notification = new Notification(message["message"], {'body':(new Date(message["timestamp"] * 1000)).toLocaleTimeString(), 'icon':'icon_600.png'});
    }
  }
  if ("actions" in message) {
    if ("openUrl" in message["actions"]) {
      var address = message["actions"]["openUrl"];
      
      if (settings.urls) {
        chrome.tabs.create({url:address});
        console.log("[PNNotify] Opened URL:" + message["actions"]["openUrl"]);
      }
    }
  }
  console.log("[PNNotify] Received message:");
  console.log(message);
}

function connected() {
  chrome.browserAction.setIcon({path: "icon_128.png"});
}

function disconnected() {
  chrome.browserAction.setIcon({path: "icon_128g.png"});
}

pubnub.subscribe( {channel: channel, message: handleMessage, restore: true, connect: connected, disconnect: disconnected, reconnect: connected});
console.log("[PNNotify] Subscribed.");
