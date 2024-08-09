import ComfyJS, { OnMessageFlags } from "comfy.js";

import { EAST_KEYWORD, NORTH_KEYWORD, SOUTH_KEYWORD, WEST_KEYWORD } from "./params";

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
    test: boolean
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
        test: message.includes('test'),
    }
}

export type DirectionType = 'north' | 'east' | 'south' | 'west';

function parseCheerMessage(message: string): DirectionType | null {
    const lowerCase = message.toLowerCase();
    if (lowerCase.includes(NORTH_KEYWORD.toLowerCase())) {
        return 'north';
    } else if (lowerCase.includes(EAST_KEYWORD.toLowerCase())) {
        return 'east';
    } else if (lowerCase.includes(SOUTH_KEYWORD.toLowerCase())) {
        return 'south'
    } else if (lowerCase.includes(WEST_KEYWORD.toLowerCase())) {
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
        if (!hasPermission(flags) || command !== 'compass') {
            return;
        }

        const { timer, start, stop, milliseconds, north, east, south, west, test } = parseCommandParams(message);

        if (test) {
            const directionType = parseCheerMessage(message);
            if (directionType && addBits) {
                addBits(directionType, Math.random() * 500);
            }
        } else if (timer) {
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
