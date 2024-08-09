import _ from 'lodash';
import { useEffect } from "react";

import Chat from './chat';
import { getChannelName } from "./params";
import { Compass } from "./components/compass";
import useCompassReducer from './reducer';

import './style/app.scss';

function App() {
    const [compass, dispatch] = useCompassReducer();

    useEffect(() => {
        const chat = Chat(getChannelName());
        let timeout: number | null = null;

        // TODO need to rethink how I guard start/stops and where/how timeouts are created

        chat.onStartCompass((north, east, south, west) => {
            timeout && clearTimeout(timeout);
            dispatch({ type: 'startCompass', north, east, south, west });
        });

        chat.onStopCompass(() => {
            timeout && clearTimeout(timeout);
            dispatch({ type: 'stopCompass' });
        });

        chat.onStartTimer((milliseconds) => {
            timeout && clearTimeout(timeout);
            dispatch({ type: 'startTimer', milliseconds });
            timeout = setTimeout(() => {
                dispatch({ type: 'stopTimer' });
            }, milliseconds);
        });

        chat.onStopTimer(() => {
            timeout && clearTimeout(timeout);
            dispatch({ type: 'stopTimer' });
        });

        chat.onAddBits((directionType, bits) => {
            dispatch({ type: 'addBits', directionType, bits });
        });

        return () => {
            chat.disconnect();
            timeout && clearTimeout(timeout);
        }
    }, []);

    return <Compass {...compass} />;
}

export default App;
