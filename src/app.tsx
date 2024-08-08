import _ from 'lodash';
import { useEffect } from "react";

import Chat from './chat';
import { getChannelName } from "./params";
import { Compass } from "./components/compass";
import { useCompassReducer } from './reducer';

function App() {
    const [compass, dispatch] = useCompassReducer();

    useEffect(() => {
        const chat = Chat(getChannelName());
        let timeout: number | null = null;

        chat.onStartCompass((north, east, south, west) => {
            dispatch({ type: 'startCompass', north, east, south, west });
        });

        chat.onStopCompass(() => {
            dispatch({ type: 'stopCompass' });
            timeout && clearTimeout(timeout);
        });

        chat.onStartTimer((milliseconds) => {
            dispatch({ type: 'startTimer', milliseconds });
            timeout && clearTimeout(timeout);
            timeout = setTimeout(() => {
                dispatch({ type: 'stopTimer' });
            }, milliseconds);
        });

        chat.onStopTimer(() => {
            dispatch({ type: 'stopTimer' });
            timeout && clearTimeout(timeout);
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
