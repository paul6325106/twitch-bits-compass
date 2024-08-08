import { useEffect, useState } from "react";

function getCurrentTime(): number {
    return new Date().getTime();
}

function format(number: number): string {
    return String(number).padStart(2, '0');
}

function minutes(remainingTime: number): string {
    const value = Math.floor((remainingTime / (1000 * 60)) % 60)
    return format(value);
}

function seconds(remainingTime: number): string {
    const value =  Math.floor((remainingTime / 1000) % 60);
    return format(value);
}

interface TimerProps {
    endTime: number;
}

export default function Timer({ endTime }: TimerProps) {
    // TODO always shows 00:00 for 1 second

    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(getCurrentTime());
        }, 1000);

        return () => {
            clearInterval(interval);
        }
    }, [endTime]);

    const remainingTime = Math.max(0, endTime - currentTime);

    if (remainingTime === 0) {
        return null;
    }

    return (
        <div id='timer'>
            {minutes(remainingTime)}:{seconds(remainingTime)}
        </div>
    );
}
