import { useEffect, useState } from "react";

function getCurrentTime(): number {
    return new Date().getTime();
}

function format(number: number): string {
    return String(number).padStart(2, '0');
}

function getTimerText(remainingTime: number): string {
    const seconds =  Math.floor((remainingTime / 1000) % 60);
    const minutes = Math.floor((remainingTime / (1000 * 60)) % 60)
    return `${format(minutes)}:${format(seconds)}`;
}

interface TimerProps {
    endTime: number;
}

export default function Timer({ endTime }: TimerProps) {
    const [currentTime, setCurrentTime] = useState(getCurrentTime());

    useEffect(() => {
        setCurrentTime(getCurrentTime());

        const interval = setInterval(() => {
            setCurrentTime(getCurrentTime());
        }, 1000);

        return () => {
            clearInterval(interval);
        }
    }, [endTime]);

    const remainingTime = Math.max(0, endTime - currentTime);

    return (
        <div id='timer' className={`${remainingTime === 0 ? 'invisible' : 'visible'}`}>
            {getTimerText(remainingTime)}
        </div>
    );
}
