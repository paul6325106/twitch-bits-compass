import { DirectionProps } from "../model";

interface CircleProps {
    className: string;
    percentage: number;
}

function DirectionCircle({ className, percentage }: CircleProps) {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;

    const style = {
        strokeDasharray: `${circumference * percentage}, ${circumference}`
    };

    return (
        <circle id={className} className='circle' style={style} r={radius} cx='50' cy='50' />
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
                <DirectionCircle className='circle-back' percentage={1} />
                <DirectionCircle className='circle-west' percentage={westPercentage} />
                <DirectionCircle className='circle-south' percentage={southPercentage} />
                <DirectionCircle className='circle-east' percentage={eastPercentage} />
                <DirectionCircle className='circle-north' percentage={northPercentage} />
            </svg>
        </div>
    );
}
