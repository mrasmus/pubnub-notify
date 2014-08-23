pubnub-notify
=============

Notification/message-passing system built on PubNub's API's.

Allows simple, real-time notifications from anywhere/anything on the internet; useful for everything from IoT sensors sending state change messages, to build server notifications, to anything else. Currently a collection of scripts showing a proof-of-concept and a few use-cases.


##Send/message creation scripts

####electricimp-laundry-sensor
A Squirrel demo to run on an Electric Imp device + cloud agent that can be used to retrofit a laundry machine with PubNub-based cloud notifications (or any non-IoT device with an LED that you want to have share its state to the internet). Sends a notification when the built-in light sensor is brought above a certain threshold - simply tape it in place and your Thing just got Internet'd.


##Receive/display scripts

####./growl-notify.py
A Python bridge to display received notifications as [Growl notifications](http://growl.info/) on the local system using [GNTP](https://github.com/kfdm/gntp/). Could easily point to any IP on the local network receiving over GNTP. Requires keys to be saved in ./pnsettings.py, copy pnsettings.py.template and replace the values with your developer keys. Then "pip install gntp pubnub" (recommended to do in a virtualenv) and run the script.

####./notification.html
A web page that displays received notifications as [HTML Notifications](https://developer.mozilla.org/en-US/docs/Web/API/notification). Also uses keys from pnsettings.py. Must be loaded from a server, as browsers won't run it off filesystem URL's. Subscribe button initializes the system and requests necessary permissions from the browser. Should work on any [browser that supports HTML Notifications](http://caniuse.com/#feat=notifications).

####./chrome-notify-plugin/
A plugin for Chrome that acts as notification.html does, and also allows for sending browsers URL's to open automatically (a basic use of the "actions" field). Has its own pnsettings.js that requires keys to be added. Add via Chrome's Extensions menu in Developer mode, select "Load unpacked extension..."

##Message Format
````
{
  "message": "Opening Google.", //Message for client to display (optional)
  "timestamp": 1408781898,      //Time as seconds since epoch
  "actions":                    //Actions to take (optional)
  {           //Clients will look for keys they knows how to handle
    "openUrl": "http://www.google.com/" //Simple action (open associated address)
  }                                     //currently supported in Chrome plugin
}
````
