# twitch-bits-compass

* Renders a compass overlay.
* The compass can be controlled through chat commands.
* Viewers can vote for a direction by including a keyword in their cheer message.
* Minimal running requirements.

# Building

Install Node.js. I wrote this against v20.12.2.

Set the name of your channel as `VITE_CHANNEL_NAME` in `.env`.

Then execute `npm run build`.

# Running

Simply open `dist/index.html` in a Browser Source.

## Warning

Be aware that, as this exclusively runs in a browser context, that shutting the browser source down will clear the state (including all current contributions). It is highly recommended to not tick the 'Shutdown source when not visible' option if you want the compass to persist when you change scenes.

# Commands

## Starting the compass

You can start the compass with `!compass start`.

You can restrict which directions to show on the compass by specifying the letters of `news`: `!compass start sn`.

## Stopping the compass

You can stop the compass with `!compass stop`.

## Starting the timer

While the compass in running, you can start a timer with a number of minutes: `!compass timer start 5m`.

Setting the timer while a timer is already running will update the timer with the new duration.

Setting the timer again after a timer has ended will reactive the existing compass with the new duration.

You can end the timer prematurely with `!compass stop timer`.

## Testing the compass

You can test the compass without expending bits with `!testcompassbits`. This will attempt to set a random number of bits to a random direction.
