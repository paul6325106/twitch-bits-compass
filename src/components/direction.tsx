import { DirectionProps } from "../model";

function formatBits(bits: number): string {
    return (bits / 100).toLocaleString('en-US', {
        currency: 'USD',
        style: 'currency',
    });
}

function Direction({ bits, enabled }: DirectionProps, label: string, id: string) {
    return (
        <div id={id} className={`direction ${enabled ? 'visible' : 'invisible'}`}>
            <div className='direction-label'>{label}</div>
            <div className='direction-bits'>{formatBits(bits)}</div>
        </div>
    );
}

export function NorthDirection(props: DirectionProps) {
    return Direction(props, '#North', 'direction-north');
}

export function EastDirection(props: DirectionProps) {
    return Direction(props, '#East', 'direction-east');
}

export function SouthDirection(props: DirectionProps) {
    return Direction(props, '#South', 'direction-south');
}

export function WestDirection(props: DirectionProps) {
    return Direction(props, '#West', 'direction-west');
}
