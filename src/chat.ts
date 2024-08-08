import ComfyJS, { OnMessageFlags } from "comfy.js";

type StartCompassCallback = () => void; // TODO
type AddBitsCallback = (directionType: DirectionType, bits: number) => void;
type EndCompassCallback = () => void;
type DismissCompassCallback = () => void;

function hasPermission(flags: OnMessageFlags): boolean {
    return flags.broadcaster || flags.mod;
}

function parseCommandParams(message: string) {
    // TODO
}

export type DirectionType = 'north' | 'east' | 'south' | 'west';

function parseCheerMessage(message: string): DirectionType | null {
    const lowerCase = message.toLowerCase();
    if (lowerCase.includes('#north')) {
        return 'north';
    } else if (lowerCase.includes('#east')) {
        return 'east';
    } else if (lowerCase.includes('#south')) {
        return 'south'
    } else if (lowerCase.includes('#west')) {
        return 'west';
    } else {
        return null;
    }
}

export default function Chat(channelName: string) {
    let startCompass: StartCompassCallback | null = null;
    const onStartCompass = (callback: StartCompassCallback) => {
        startCompass = callback;
    }

    let addBits: AddBitsCallback | null = null;
    const onAddBits = (callback: AddBitsCallback) => {
        addBits = callback;
    }

    let endCompass: EndCompassCallback | null = null;
    const onEndCompass = (callback: EndCompassCallback) => {
        endCompass = callback;
    }

    let dismissCompass: DismissCompassCallback | null = null;
    const onDismissCompass = (callback: DismissCompassCallback) => {
        dismissCompass = callback;
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
        const directionType = parseCheerMessage(message);
        if (directionType && addBits) {
            addBits(directionType, bits);
        }
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
