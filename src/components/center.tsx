import { DirectionProps } from "../model";

interface DirectionCircleProps {
    id: string
    percentage: number
    winner: boolean
}

function DirectionCircle({ id, percentage, winner }: DirectionCircleProps) {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;

    const style = {
        strokeDasharray: `${circumference * percentage}, ${circumference}`
    };

    return (
        <circle id={id} className={`circle ${winner ? 'winner' : 'loser'}`} style={style} r={radius} cx='50' cy='50' />
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
                <DirectionCircle id='circle-back' percentage={1} winner={true}/>
                <DirectionCircle id='circle-west' percentage={westPercentage} winner={west.winner} />
                <DirectionCircle id='circle-south' percentage={southPercentage} winner={south.winner} />
                <DirectionCircle id='circle-east' percentage={eastPercentage} winner={east.winner} />
                <DirectionCircle id='circle-north' percentage={northPercentage} winner={north.winner} />
            </svg>
        </div>
    );
}
