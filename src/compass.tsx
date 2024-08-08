import { useEffect, useState } from "react";

function Bits(props) {
    const { direction, enabled } = props;

    if (!enabled) {
        return null;
    }

    // TODO

    return (
        <div id={`bits-${direction}`}>

        </div>
    );
}

function NorthBits(props) {
    return Bits({...props, direction: 'north'});
}

function EastBits(props) {
    return Bits({...props, direction: 'east'});
}

function SouthBits(props) {
    return Bits({...props, direction: 'south'});
}

function WestBits(props) {
    return Bits({...props, direction: 'west'});
}

function getCurrentTime() {
    return new Date().getTime();
}

function Timer(props) {
    const { endTime } = props;
    const [currentTime, setCurrentTime] = useState(getCurrentTime());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(getCurrentTime());
        }, 1000);

        return () => {
            clearInterval(interval);
        }
    }, [endTime]);

    const remainingTime = Math.max(0, endTime - currentTime);

    const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
    const seconds = Math.floor((remainingTime / 1000) % 60);

    const formatted = number = String(number).padStart(2, '0');

    return (
        <div id='timer'>
            {formatted(minutes)}:{formatted(seconds)}
        </div>
    );
}

function Compass(props) {
    const { north, east, south, west, endTime } = props;

    const now = new Date().getTime();
    const active = now <= endTime;

    // TODO highlight winner if not active

    return (
        <div id='compass'>
            <Timer endTime={endTime} />
            <NorthBits { ...north } />
            <EastBits { ...east  } />
            <SouthBits { ...south } />
            <WestBits { ...west  } />
        </div>
    );
}

export default Compass;
