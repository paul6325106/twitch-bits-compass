import _ from 'lodash';
import { useEffect, useReducer } from "react";

import Chat from './chat';
import { getChannelName } from "./params";
import { Compass, CompassProps } from "./components/compass";

import './App.css';

type CompassAction =
    | { type: 'startCompass' }
    | { type: 'addBits', directionType: string, bits: number }
    | { type: 'endCompass' }
    | { type: 'dismissCompass' };

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
            // TODO
            return { ...compass };
        case "addBits":
            const { directionType, bits } = action;
            return _.update({ ...compass }, [directionType, 'bits'], oldBits => oldBits + bits);
        case "endCompass":
            return { ...compass, active: false };
        case "dismissCompass":
            return initialCompass;
        default:
            return compass;
    }
}

function App() {
    const [compass, dispatch] = useReducer(compassReducer, initialCompass);

    useEffect(() => {
        const chat = Chat(getChannelName());

        // TODO
        chat.onStartCompass(() => {
            dispatch({ type: 'startCompass' });
        });

        chat.onAddBits((directionType, bits) => {
            dispatch({ type: 'addBits', directionType, bits });
        });

        chat.onEndCompass(() => {
            dispatch({ type: 'endCompass' });
        });

        chat.onDismissCompass(() => {
            dispatch({ type: 'dismissCompass' });
        });

        return () => {
            chat.disconnect();
        }
    }, []);

    return <Compass {...compass} />;
}

export default App;
