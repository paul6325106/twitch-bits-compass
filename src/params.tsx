export const CHANNEL_NAME = import.meta.env.VITE_CHANNEL_NAME;
if (!CHANNEL_NAME) {
    throw `Unvalid channel name: ${CHANNEL_NAME}`;
}

export const NORTH_KEYWORD = import.meta.env.VITE_NORTH_KEYWORD;
if (!NORTH_KEYWORD) {
    throw `Unvalid north keyword: ${NORTH_KEYWORD}`;
}

export const EAST_KEYWORD = import.meta.env.VITE_EAST_KEYWORD;
if (!EAST_KEYWORD) {
    throw `Unvalid north keyword: ${EAST_KEYWORD}`;
}

export const SOUTH_KEYWORD = import.meta.env.VITE_SOUTH_KEYWORD;
if (!SOUTH_KEYWORD) {
    throw `Unvalid north keyword: ${SOUTH_KEYWORD}`;
}

export const WEST_KEYWORD = import.meta.env.VITE_WEST_KEYWORD;
if (!WEST_KEYWORD) {
    throw `Unvalid north keyword: ${WEST_KEYWORD}`;
}
