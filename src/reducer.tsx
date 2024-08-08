import _ from 'lodash';
import { useReducer } from "react";

import { CompassProps } from "./components/compass";

export type CompassAction =
    | { type: 'startCompass', north: boolean, east: boolean, south: boolean, west: boolean }
    | { type: 'stopCompass' }
    | { type: 'startTimer', milliseconds: number }
    | { type: 'stopTimer' }
    | { type: 'addBits', directionType: string, bits: number };

const initialCompass: CompassProps = {
    active: false,
    east: {
        bits: 0,
        enabled: false,
    },
    enabled: false,
    endTime: 0,
    north: {
        bits: 0,
        enabled: false,
    },
    south: {
        bits: 0,
        enabled: false,
    },
    west: {
        bits: 0,
        enabled: false,
    },
}

function compassReducer(compass: CompassProps, action: CompassAction): CompassProps {
    switch (action.type) {
        case "startCompass":
            const { north, east, south, west } = action;
            return {
                active: true,
                east: {
                    bits: 0,
                    enabled: east,
                },
                enabled: true,
                endTime: 0,
                north: {
                    bits: 0,
                    enabled: north,
                },
                south: {
                    bits: 0,
                    enabled: south,
                },
                west: {
                    bits: 0,
                    enabled: west,
                }
            };
        case "stopCompass":
            return initialCompass;
        case 'startTimer':
            const { milliseconds } = action;
            const endTime = new Date().getTime() + milliseconds;
            return { ...compass, active: true, endTime };
        case 'stopTimer':
            const now = new Date().getTime();
            return { ...compass, active: false, endTime: now };
        case "addBits":
            const { directionType, bits } = action;
            return _.update({ ...compass }, [directionType, 'bits'], oldBits => oldBits + bits);
        default:
            return compass;
    }
}

export function useCompassReducer() {
    return useReducer(compassReducer, initialCompass);
}
