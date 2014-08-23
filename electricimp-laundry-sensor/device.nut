const THRESHOLD = 55; // Adjusted light sensor level below LED brightness

done <- false; // Flag to hold device state

function read_light_level() {
    local light = hardware.lightlevel() / 655.35;
    server.log("Current ambient light level is: " + light);
    
    if (light > THRESHOLD) {
        if (!done) {
            agent.send("washingmachine", "finished");
        }
        done = true;
    } else {
        done = false;
    }
    imp.wakeup(1.0, read_light_level);
}

read_light_level();