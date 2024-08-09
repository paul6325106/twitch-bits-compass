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
    endTime: 0,
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

function getStartedCompass({ north, east, south, west } : StartCompassAction): CompassProps {
    return {
        active: true,
        east: {
            bits: 0,
            enabled: east,
            winner: false,
        },
        enabled: true,
        endTime: 0,
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

function getStartedTimer(compass: CompassProps, { milliseconds }: StartTimerAction): CompassProps {
    const endTime = new Date().getTime() + milliseconds;
    return { ...compass, active: true, endTime };
}

function getStoppedTimer(compass: CompassProps): CompassProps {
    const now = new Date().getTime();
    return { ...compass, active: false, endTime: now };
}

function getAddedBits(compass: CompassProps, action: AddBitsAction): CompassProps {
    // TODO set winner
    // const maxBits = Math.max(...[north, east, south, west].map(d => d.bits));
    // const northWinner = north.bits === maxBits;
    // const eastWinner = east.bits === maxBits;
    // const southWinner = south.bits === maxBits;
    // const westWinner = west.bits === maxBits;

    const { directionType, bits } = action;
    return _.update({ ...compass }, [directionType, 'bits'], oldBits => oldBits + bits);
}

function compassReducer(compass: CompassProps, action: CompassAction): CompassProps {
    switch (action.type) {
        case "startCompass":
            return getStartedCompass(action);
        case "stopCompass":
            return initialCompass;
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
