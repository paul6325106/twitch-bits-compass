import _ from 'lodash';
import { useReducer } from "react";
import { CompassProps } from './model';

type StartCompassAction = { type: 'startCompass', north: boolean, east: boolean, south: boolean, west: boolean };
type StopCompassAction = { type: 'stopCompass' };
type StartTimerAction = { type: 'startTimer', milliseconds: number };
type StopTimerAction = { type: 'stopTimer' };
type AddBitsAction ={ type: 'addBits', directionType: string, bits: number };

export type CompassAction =
    | StartCompassAction
    | StopCompassAction
    | StartTimerAction
    | StopTimerAction
    | AddBitsAction;

const initialCompass: CompassProps = {
    active: false,
    east: {
        bits: 0,
        enabled: false,
        winner: false,
    },
    enabled: false,
    endTime: null,
    north: {
        bits: 0,
        enabled: false,
        winner: false,
    },
    south: {
        bits: 0,
        enabled: false,
        winner: false,
    },
    west: {
        bits: 0,
        enabled: false,
        winner: false,
    },
}

function getStartedCompass(compass: CompassProps, { north, east, south, west } : StartCompassAction): CompassProps {
    if (compass.enabled) {
        return compass;
    }

    return {
        active: true,
        east: {
            bits: 0,
            enabled: east,
            winner: false,
        },
        enabled: true,
        endTime: null,
        north: {
            bits: 0,
            enabled: north,
            winner: false,
        },
        south: {
            bits: 0,
            enabled: south,
            winner: false,
        },
        west: {
            bits: 0,
            enabled: west,
            winner: false,
        }
    };
}

function getStoppedCompass(compass: CompassProps): CompassProps {
    return compass.enabled ? initialCompass : compass;
}

function getStartedTimer(compass: CompassProps, { milliseconds }: StartTimerAction): CompassProps {
    if (!compass.enabled) {
        return compass;
    }

    const endTime = new Date().getTime() + milliseconds;

    return { ...compass, active: true, endTime };
}

function getStoppedTimer(compass: CompassProps): CompassProps {
    if (!compass.enabled || !compass.active) {
        return compass;
    }

    const now = new Date().getTime();

    return { ...compass, active: false, endTime: now };
}

function getAddedBits(compass: CompassProps, action: AddBitsAction): CompassProps {
    if (!compass.enabled || !compass.active) {
        return compass;
    }

    const { directionType, bits } = action;

    const enabled: boolean = _.get(compass, [directionType, 'enabled'], false);

    if (!enabled) {
        return compass;
    }

    const newCompass = { ...compass };

    _.update(newCompass, [directionType, 'bits'], (oldBits) => oldBits + bits);

    const maxBits = getMaxBits(newCompass);
    newCompass.north.winner = newCompass.north.bits === maxBits;
    newCompass.east.winner = newCompass.east.bits === maxBits;
    newCompass.south.winner = newCompass.south.bits === maxBits;
    newCompass.west.winner = newCompass.west.bits === maxBits;

    return newCompass;
}

function getMaxBits(compass: CompassProps): number {
    const { north, east, south, west } = compass;
    return Math.max(...[north, east, south, west].map(direction => direction.bits));
}

function compassReducer(compass: CompassProps, action: CompassAction): CompassProps {
    console.log(action);
    switch (action.type) {
        case "startCompass":
            return getStartedCompass(compass, action);
        case "stopCompass":
            return getStoppedCompass(compass);
        case 'startTimer':
            return getStartedTimer(compass, action);
        case 'stopTimer':
            return getStoppedTimer(compass);
        case "addBits":
            return getAddedBits(compass, action);
        default:
            return compass;
    }
}

export default function useCompassReducer() {
    return useReducer(compassReducer, initialCompass);
}
