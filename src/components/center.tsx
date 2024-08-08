import { DirectionProps } from "./direction";

interface CircleProps {
    className: string;
    percentage: number;
}

function Circle({ className, percentage }: CircleProps) {
    const radius = 45;

    // TODO this is very almost but not actually the right idea
    const style = {
        strokeDasharray: 2 * Math.PI * radius * percentage
    };

    return (
        <circle id={className} className='circle' style={style} r={radius} cx='50' cy='50' fill='none' />
    );
}

interface CenterProps {
    east: DirectionProps
    north: DirectionProps
    south: DirectionProps
    west: DirectionProps
}

export default function Center({ north, east, south, west }: CenterProps) {
    const totalBits = north.bits + east.bits + south.bits + west.bits;

    const northPercentage = totalBits ? north.bits / totalBits : 0;
    const eastPercentage = totalBits ? northPercentage + (east.bits / totalBits) : 0;
    const southPercentage = totalBits ? eastPercentage + (south.bits / totalBits) : 0;
    const westPercentage = totalBits ? southPercentage + (west.bits / totalBits) : 0;

    // TODO would like a little bit more decoration in the middle of the circle

    return (
        <div id='center'>
            <svg viewBox='0 0 100 100'>
                <Circle className='circle-back' percentage={1} />
                <Circle className='circle-west' percentage={westPercentage} />
                <Circle className='circle-south' percentage={southPercentage} />
                <Circle className='circle-east' percentage={eastPercentage} />
                <Circle className='circle-north' percentage={northPercentage} />
            </svg>
        </div>
    );
}
