import ComfyJS, { OnMessageFlags } from "comfy.js";

type StartCompassCallback = (north: boolean, east: boolean, south: boolean, west: boolean) => void;
type StopCompassCallback = () => void;
type StartTimerCallback = (milliseconds: number) => void;
type StopTimerCallback = () => void;
type AddBitsCallback = (directionType: DirectionType, bits: number) => void;

function hasPermission(flags: OnMessageFlags): boolean {
    return flags.broadcaster || flags.mod;
}

type CommandParams = {
    timer: boolean
    milliseconds: number | null
    start: boolean
    stop: boolean
    north: boolean
    east: boolean
    south: boolean
    west: boolean
}

const regexMinutes = /\b([0-9]+)[Mm]\b/;

function parseMinutes(message: string): number | null {
    const match = message.match(regexMinutes)
    return match ? parseInt(match[1]) : null;
}

const regexNews = /\b[NnEeWwSs]+\b/;

function parseNews(message: string): string {
    const match = message.match(regexNews);
    return match ? match[0].toLowerCase() : 'news';
}

function parseCommandParams(message: string): CommandParams {
    const minutes = parseMinutes(message);
    const news = parseNews(message);

    return {
        timer: message.includes('timer'),
        milliseconds: minutes === null ? null : minutes * 60 * 1000,
        start: message.includes('start'),
        stop: message.includes('stop'),
        north: news.includes('n'),
        east: news.includes('e'),
        south: news.includes('s'),
        west: news.includes('w'),
    }
}

export type DirectionType = 'north' | 'east' | 'south' | 'west';

function getRandomDirectionType(): DirectionType {
    const random = Math.floor(Math.random() * 4);
    switch (random) {
        default:
        case 0:
            return 'north';
        case 1:
            return 'east'
        case 2:
            return 'south';
        case 3:
            return 'west';
    }
}

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

    let stopCompass: StopCompassCallback | null = null;
    const onStopCompass = (callback: StopCompassCallback) => {
        stopCompass = callback;
    }
    let startTimer: StartTimerCallback | null = null;
    const onStartTimer = (callback: StartTimerCallback) => {
        startTimer = callback;
    }

    let stopTimer: StopTimerCallback | null = null;
    const onStopTimer = (callback: StopTimerCallback) => {
        stopTimer = callback;
    }

    let addBits: AddBitsCallback | null = null;
    const onAddBits = (callback: AddBitsCallback) => {
        addBits = callback;
    }

    ComfyJS.Init(channelName);

    ComfyJS.onCommand = (_user, command, message, flags, _extra) => {
        if (hasPermission(flags) && command === 'testcompassbits' && addBits) {
            addBits(getRandomDirectionType(), Math.floor(Math.random() * 500));
            return;
        }

        if (!hasPermission(flags) || command !== 'compass') {
            return;
        }

        const { timer, start, stop, milliseconds, north, east, south, west } = parseCommandParams(message);

        if (timer) {
            if (start && startTimer && milliseconds !== null) {
                startTimer(milliseconds);
            } else if (stop && stopTimer) {
                stopTimer();
            }
        } else {
            if (start && startCompass) {
                startCompass(north, east, south, west);
            } else if (stop && stopCompass) {
                stopCompass();
            }
        }
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
        onStopCompass,
        onStartTimer,
        onStopTimer,
        onAddBits,
        disconnect,
    }
}
