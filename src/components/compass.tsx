import { CompassProps } from '../model';

import Center from './center';
import { NorthDirection, EastDirection, SouthDirection, WestDirection } from './direction';
import Timer from './timer';

export function Compass(props: CompassProps) {
    const { active, east, enabled, endTime, north, south, west } = props;

    if (!enabled) {
        return null;
    }

    return (
        <div id='compass' className={`${active ? 'active' : 'inactive'}`}>
            <Center north={north} east={east} south={south} west={west} />
            <Timer endTime={endTime || 0} />
            <NorthDirection { ...north } />
            <EastDirection { ...east  } />
            <SouthDirection { ...south } />
            <WestDirection { ...west  } />
        </div>
    );
}
