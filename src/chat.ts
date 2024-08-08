import ComfyJS, { OnMessageFlags } from "comfy.js";

function hasPermission(flags: OnMessageFlags) {
    return flags.broadcaster || flags.mod;
}

function parseCommandParams(message: string) {
    // TODO
}

function parseCheerMessage(message: string) {
    // TODO
}

function Chat(channelName: string) {
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

    let hideCompass = null;
    const onHideCompass = callback => {
        hideCompass = callback;
    }

    ComfyJS.Init(channelName);

    ComfyJS.onCommand = (user, command, message, flags, extra) => {
        if (!hasPermission(flags) || command !== 'compass') {
            return;
        }

        // TODO parseCommandParams
        // TODO onStartCompass
        // TODO onEndCompass
        // TODO onHideCompass
    };

    ComfyJS.onCheer = ( user, message, bits, flags, extra ) => {
        // TODO parseCheerMessage
        // TODO onAddBits
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
