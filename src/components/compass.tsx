import '../style/compass.scss';

import Center from './center';
import { NorthDirection, EastDirection, SouthDirection, WestDirection, DirectionProps } from './direction';
import Timer from './timer';

export interface CompassProps {
    active: boolean
    east: DirectionProps
    enabled: boolean
    endTime: number
    north: DirectionProps
    south: DirectionProps
    west: DirectionProps
}

export function Compass(props: CompassProps) {
    const { active: _active, east, enabled, endTime, north, south, west } = props;

    if (!enabled) {
        return null;
    }

    // TODO opacity: 0.5 on directions !winner && !active
    // const maxBits = Math.max(...[north, east, south, west].map(d => d.bits));
    // const northWinner = north.bits === maxBits;
    // const eastWinner = east.bits === maxBits;
    // const southWinner = south.bits === maxBits;
    // const westWinner = west.bits === maxBits;

    return (
        <div id='compass'>
            <Center north={north} east={east} south={south} west={west} />
            <Timer endTime={endTime} />
            <NorthDirection { ...north } />
            <EastDirection { ...east  } />
            <SouthDirection { ...south } />
            <WestDirection { ...west  } />
        </div>
    );
}
