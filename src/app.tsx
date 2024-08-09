import _ from 'lodash';
import { useEffect } from "react";

import Chat from './chat';
import { Compass } from "./components/compass";
import useCompassReducer from './reducer';

import './style/app.scss';

const CHANNEL_NAME = import.meta.env.VITE_CHANNEL_NAME;
if (!CHANNEL_NAME) {
    throw `Unvalid channel name: ${CHANNEL_NAME}`;
}

function App() {
    const [compass, dispatch] = useCompassReducer();

    useEffect(() => {
        const chat = Chat(CHANNEL_NAME);

        chat.onStartCompass((north, east, south, west) => {
            dispatch({ type: 'startCompass', north, east, south, west });
        });

        chat.onStopCompass(() => {
            dispatch({ type: 'stopCompass' });
        });

        chat.onStartTimer((milliseconds) => {
            dispatch({ type: 'startTimer', milliseconds });
        });

        chat.onStopTimer(() => {
            dispatch({ type: 'stopTimer' });
        });

        chat.onAddBits((directionType, bits) => {
            dispatch({ type: 'addBits', directionType, bits });
        });

        return () => {
            chat.disconnect();
        };
    }, []);

    useEffect(() => {
        if (compass.endTime === null) {
            return;
        }

        const now = new Date().getTime();

        const timeoutID = setTimeout(() => {
            dispatch({ type: 'stopTimer' });
        }, compass.endTime - now);

        return () => {
            clearTimeout(timeoutID);
        };
    }), [compass.endTime];

    return <Compass {...compass} />;
}

export default App;
