import { useEffect, useReducer } from "react";

import Chat from './chat';
import { getChannelName } from "./params";
import { Compass, CompassProps } from "./components/compass";

import './App.css';

type CompassAction =
    | { type: 'startCompass' }
    | { type: 'addBits' }
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
    // TODO
    switch (action.type) {
        case "startCompass":
            return { ...compass };
        case "addBits":
            return { ...compass };
        case "endCompass":
            return { ...compass };
        case "dismissCompass":
            return { ...compass };
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

        // TODO
        chat.onAddBits(() => {
            dispatch({ type: 'addBits' });
        });

        // TODO
        chat.onEndCompass(() => {
            dispatch({ type: 'endCompass' });
        });

        // TODO
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
