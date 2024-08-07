function Bits(props) {
    const { direction } = props;

    // TODO

    return (
        <div id={`bits-${direction}`}>

        </div>
    );
}

function NorthBits(props) {
    return Bits({...props, direction: 'north'});
}

function EastBits(props) {
    return Bits({...props, direction: 'east'});
}

function SouthBits(props) {
    return Bits({...props, direction: 'south'});
}

function WestBits(props) {
    return Bits({...props, direction: 'west'});
}

function Timer(props) {
    const { endTime } = props;

    // TODO

    return (
        <div id='timer'>

        </div>
    );
}

function Compass(props) {
    const { north, east, south, west, endTime } = props;

    const now = new Date().getTime();
    const active = now <= endTime;

    return (
        <div id='compass'>
            {active && <Timer endTime={endTime} />}

            {north  && <NorthBits { ...north}  />}
            {east   && <EastBits  { ...east }  />}
            {south  && <SouthBits { ...south } />}
            {west   && <WestBits  { ...west }  />}
        </div>
    );
}

export default Compass;
