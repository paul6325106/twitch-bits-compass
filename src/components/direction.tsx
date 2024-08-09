import { DirectionProps } from "../model";
import { EAST_KEYWORD, NORTH_KEYWORD, SOUTH_KEYWORD, WEST_KEYWORD } from "../params";

function formatBits(bits: number): string {
    return (bits / 100).toLocaleString('en-US', {
        currency: 'USD',
        style: 'currency',
    });
}

function Direction({ bits, enabled, winner }: DirectionProps, label: string, id: string) {
    return (
        <div id={id} className={`direction ${enabled ? 'visible' : 'invisible'} ${winner ? 'winner' : 'loser'}`}>
            <div className='direction-label'>{label}</div>
            <div className='direction-bits'>{formatBits(bits)}</div>
        </div>
    );
}

export function NorthDirection(props: DirectionProps) {
    return Direction(props, NORTH_KEYWORD, 'direction-north');
}

export function EastDirection(props: DirectionProps) {
    return Direction(props, EAST_KEYWORD, 'direction-east');
}

export function SouthDirection(props: DirectionProps) {
    return Direction(props, SOUTH_KEYWORD, 'direction-south');
}

export function WestDirection(props: DirectionProps) {
    return Direction(props, WEST_KEYWORD, 'direction-west');
}
