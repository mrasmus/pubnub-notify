var channel = "notify";

var pubnub = PUBNUB.init({
    publish_key: publish_key, 
    subscribe_key: subscribe_key
});

function handleMessage(message) {
    if ("message" in message)
    {
        var notification = new Notification(message["message"], {'body':(new Date(message["timestamp"] * 1000)).toLocaleTimeString(), 'icon':'icon_600.png'});
    }
    if ("actions" in message)
    {
        if ("openUrl" in message["actions"])
        {
            var address = message["actions"]["openUrl"];
            chrome.tabs.create({url:address});
            console.log("[PNNotify] Opened URL:" + message["actions"]["openUrl"]);
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
