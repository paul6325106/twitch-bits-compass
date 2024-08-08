import ComfyJS from "comfy.js";

function getChannelName() {
    return new URLSearchParams(location.search).channelName;
}

function hasPermission(flags) {
    return flags.broadcaster || flags.mod;
}

function parseCompassParams(message) {
    // TODO
}

function Chat() {
    let startCompass = null;
    const onStartCompass = callback => {
        startCompass = callback;
    }

    let addBits = null;
    const onAddBits = callback => {
        addBits = callback;
    }

    let endCompass = null;
    const onEndCompass = callback => {
        endCompass = callback;
    }

    ComfyJS.Init(getChannelName());

    ComfyJS.onCommand = (user, command, message, flags, extra) => {
        if (!hasPermission(flags) || command !== 'compass') {
            return;
        }

        // TODO parseParams

        // if start and inactive, startCompass, setTimer for stopCompass

        // if kill and active, stopCompass, clearCompass

        // if clear, stop if active, clear
    };

    ComfyJS.onCheer = ( user, message, bits, flags, extra ) => {
        // TODO parse direction from message
    }

    const disconnect = () => {
        ComfyJS.Disconnect();
    }

    return {
        onStartCompass,
        onAddBits,
        onEndCompass,
        disconnect,
    }
}

export default Chat;
