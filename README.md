# twitch-bits-compass

TODO

# Building

TODO

npm run build

# Running

TODO

Single file in /dist

Load as local file in browser source

Right now you set your channel name as a param

file:///path/to/repo/twitch-bits-compass/dist/index.html?channelName=voodoocowboy

But this doesn't work well with OBS, so this will change soon

Highly recommend not ticking 'Shutdown source when not visible', because compass functionality is tied to browser source lifecycle

# Commands

TODO

* Start the compass: `!compass start`
* Start the compass with only north and west: `!compass start wn`
* Start the compass with only south and east `!compass start se`
* Start the timer for 1 minute: `!compass timer start 1m`
* Start the timer for 15 minute: `!compass start timer 15m`
* Stop the timer prematurely: `!compass stop timer`
* Stop the compass: `!compass stop`
* Test command to add random bits to a random direction: `!testcompassbits`
