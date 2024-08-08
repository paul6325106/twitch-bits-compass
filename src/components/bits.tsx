function Bits(props) {
    const { direction, enabled } = props;

    if (!enabled) {
        return null;
    }

    // TODO

    return (
        <div id={`bits-${direction}`} className='bits'>

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

export { NorthBits, EastBits, SouthBits, WestBits };
