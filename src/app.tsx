import { useEffect, useState } from "react";

import Chat from './chat';
import Compass from "./components/compass";

import './App.css';

function getChannelName() {
    return new URLSearchParams(document.location.search).get('channelName');
}

function getInitialState() {
    return {
        north: {
            enabled: false,
            bits: 0,
        },
        east: {
            enabled: false,
            bits: 0,
        },
        south: {
            enabled: false,
            bits: 0,
        },
        west: {
            enabled: false,
            bits: 0,
        },
    }
}

function App() {
    const [state, setState] = useState(getInitialState());

    useEffect(() => {

    }, []);

    return (
        <Compass />
    )
}

export default App;
