export interface CompassProps {
    active: boolean
    east: DirectionProps
    enabled: boolean
    endTime: number | null
    north: DirectionProps
    south: DirectionProps
    west: DirectionProps
}

export interface DirectionProps {
    bits: number
    enabled: boolean
    winner: boolean
}
