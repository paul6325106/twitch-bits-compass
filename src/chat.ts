import ComfyJS, { OnMessageFlags } from "comfy.js";

type StartCompassCallback = () => void; // TODO
type AddBitsCallback = () => void; // TODO
type EndCompassCallback = () => void; // TODO
type DismissCompassCallback = () => void; // TODO

function hasPermission(flags: OnMessageFlags): boolean {
    return flags.broadcaster || flags.mod;
}

function parseCommandParams(message: string) {
    // TODO
}

function parseCheerMessage(message: string) {
    // TODO
}

export default function Chat(channelName: string) {
    let startCompass = null;
    const onStartCompass = (callback: StartCompassCallback) => {
        startCompass = callback;
    }

    let addBits = null;
    const onAddBits = (callback: AddBitsCallback) => {
        addBits = callback;
    }

    let endCompass = null;
    const onEndCompass = (callback: EndCompassCallback) => {
        endCompass = callback;
    }

    let hideCompass = null;
    const onDismissCompass = (callback: DismissCompassCallback) => {
        hideCompass = callback;
    }

    ComfyJS.Init(channelName);

    ComfyJS.onCommand = (_user, command, message, flags, _extra) => {
        if (!hasPermission(flags) || command !== 'compass') {
            return;
        }

        // TODO parseCommandParams
        // TODO onStartCompass
        // TODO onEndCompass
        // TODO onDismissCompass
    };

    ComfyJS.onCheer = ( _user, message, bits, _flags, _extra ) => {
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
        onDismissCompass,
        disconnect,
    }
}
