import { NorthBits, EastBits, SouthBits, WestBits } from './bits';
import Timer from './timer';

function Compass(props) {
    const { north, east, south, west, endTime } = props;

    return (
        <div id='compass'>
            <Timer endTime={endTime} />
            <NorthBits { ...north } />
            <EastBits { ...east  } />
            <SouthBits { ...south } />
            <WestBits { ...west  } />
        </div>
    );
}

export default Compass;
