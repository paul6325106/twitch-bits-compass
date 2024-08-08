import '../style/compass.scss';

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
    const { active, east, enabled, endTime, north, south, west } = props;

    if (!enabled) {
        return null;
    }

    return (
        <div id='compass' className={active ? 'active' : 'inactive'}>
            <Timer endTime={endTime} />
            <NorthDirection { ...north } />
            <EastDirection { ...east  } />
            <SouthDirection { ...south } />
            <WestDirection { ...west  } />
        </div>
    );
}
