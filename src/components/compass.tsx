import { CompassProps } from '../model';

import Center from './center';
import { NorthDirection, EastDirection, SouthDirection, WestDirection } from './direction';
import Timer from './timer';

export function Compass(props: CompassProps) {
    const { active: _active, east, enabled, endTime, north, south, west } = props;

    if (!enabled) {
        return null;
    }

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
