# twitch-bits-compass

* Renders a compass overlay.
* The compass can be controlled through chat commands.
* Viewers can vote for a direction by including a keyword in their Cheer message.
* Minimal running requirements.

## Setup

### Customising

The following properties can be modified in the `.env` file:

* `VITE_CHANNEL_NAME`: name of Twitch channel to connect to.
* `VITE_NORTH_KEYWORD`: keyword for North direction in Cheer messages.
* `VITE_EAST_KEYWORD`: keyword for East direction in Cheer messages.
* `VITE_SOUTH_KEYWORD`: keyword for South direction in Cheer messages.
* `VITE_WEST_KEYWORD`: keyword for West direction in Cheer messages.

### Compiling

Install Node.js. I wrote this against v20.12.2.

Install dependencies with `npm install`.

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

While the compass in running, you can start a timer. You should specify a duration with minutes with the suffix `m` (e.g. `!compass timer start 5m`) or seconds with the suffix `s` (e.g. `!compass timer start 30s`).

When the duration ends, losing directions will become faded and no new Cheers will be acknowledged.

Setting the timer while a timer is already running will update the timer with the new duration.

Setting the timer again after a timer has ended will reactive the existing compass with the new duration.

You can end the timer prematurely with `!compass stop timer`.

#### Testing the compass

You can test the compass without expending bits with `!compass test`. This will parse the rest of your message and then try to add a random number of bits.
