import { TILE_STATE_ENUM } from './constants';

class Tile {
    constructor() {
        this.letter = '';
        this.status = TILE_STATE_ENUM.EMPTY;
    }

    /**
     * Updates the current letter and status of the tile.
     * @param {object} props an object containing the letter and status
     */
    update(props) {
        for (const [key, value] of Object.entries(props)) {
            this[key] = value;
        }
    }
}

export default Tile;
