import { useEffect, useState } from "react";

import Chat from './chat';
import { Compass, CompassProps } from "./components/compass";

import './App.css';

function getChannelName(): string {
    const channelName = new URLSearchParams(document.location.search).get('channelName');

    if (!channelName) {
        throw "Unknown channel name";
    }

    return channelName;
}

function App() {
    const [compass, setCompass] = useState<CompassProps | null>(null);

    useEffect(() => {
        const chat = Chat(getChannelName());

        chat.onStartCompass(() => {
            // TODO
        });

        chat.onAddBits(() => {
            // TODO
        });

        chat.onEndCompass(() => {
            // TODO
        });

        chat.onDismissCompass(() => {
            // TODO
        });

        return () => {
            chat.disconnect();
        }
    }, []);

    return compass ? <Compass {...compass} /> : null;
}

export default App;
