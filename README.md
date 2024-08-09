# twitch-bits-compass

* Renders a compass overlay.
* The compass can be controlled through chat commands.
* Viewers can vote for a direction by including a keyword in their Cheer message.
* Minimal running requirements.

## Setup

### Customising

The following properties can be modified in the `.env.` file:

* `VITE_CHANNEL_NAME`: name of Twitch channel to connect to.
* `VITE_NORTH_KEYWORD`: keyword for North direction in Cheer messages.
* `VITE_EAST_KEYWORD`: keyword for East direction in Cheer messages.
* `VITE_SOUTH_KEYWORD`: keyword for South direction in Cheer messages.
* `VITE_WEST_KEYWORD`: keyword for West direction in Cheer messages.

### Compiling

Install Node.js. I wrote this against v20.12.2.

Then execute `npm run build`.

### Configuring

Simply open `dist/index.html` in a Browser Source.

### Warning

Be aware that, as this exclusively runs in a browser context, that shutting the browser source down will clear the state (including all current contributions). It is highly recommended to not tick the 'Shutdown source when not visible' option if you want the compass to persist when you change scenes.

## Using the Compass Overlay

### Cheering

When viewers Cheer with Bits, they can include a message. If they include one of the keywords (case-insensitive) in their message, the bits go towards a total for that direction.

### Commands

#### Starting the compass

You can start the compass with `!compass start`.

You can restrict which directions to show on the compass by specifying the letters of `news`: `!compass start sn`.

#### Stopping the compass

You can stop the compass with `!compass stop`.

#### Starting the timer

While the compass in running, you can start a timer with a number of minutes: `!compass timer start 5m`.

Setting the timer while a timer is already running will update the timer with the new duration.

Setting the timer again after a timer has ended will reactive the existing compass with the new duration.

You can end the timer prematurely with `!compass stop timer`.

#### Testing the compass

You can test the compass without expending bits with `!testcompassbits`. This will attempt to set a random number of bits to a random direction.
