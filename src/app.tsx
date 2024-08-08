import { useEffect, useState } from "react";

import Chat from './chat';
import Compass from "./components/compass";

import './App.css';

function getChannelName(): string {
    const channelName = new URLSearchParams(document.location.search).get('channelName');

    if (!channelName) {
        throw "Unknown channel name";
    }

    return channelName;
}

function App() {
    const [state, setState] = useState(null);

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

    if (!state) {
        return null;
    }

    // TODO
    return (
        <Compass />
    )
}

export default App;
