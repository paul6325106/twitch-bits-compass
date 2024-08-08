import { NorthDirection, EastDirection, SouthDirection, WestDirection, DirectionProps } from './direction';
import Timer from './timer';

export interface CompassProps {
    north: DirectionProps
    east: DirectionProps
    south: DirectionProps
    west: DirectionProps
    endTime: number
}

export function Compass(props: CompassProps) {
    const { north, east, south, west, endTime } = props;

    return (
        <div id='compass'>
            <Timer endTime={endTime} />
            <NorthDirection { ...north } />
            <EastDirection { ...east  } />
            <SouthDirection { ...south } />
            <WestDirection { ...west  } />
        </div>
    );
}
