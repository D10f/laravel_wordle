import { TILE_STATE_ENUM, KEY_STATE_ENUM } from "./constants";
import Key from "./Key";

class Keyboard {
    constructor(lang = 'en') {
        this._lang = lang;
        this._layout = {
            en: [
                'qwertyuiop',
                'asdfghjkl',
                ['Enter', ...'zxcvbnm'.split(''), 'Backspace']
            ],
            es: [
                'qwertyuiop',
                'asdfghjklñ',
                ['Enter', ...'zxcvbnm'.split(''), 'Backspace']
            ]
        };
        this.keys = this._createLayout();
    }

    /**
     * Resets the status of the key. Does nothing if key has already been
     * updated to a partial or correct status.
     * @param {string} targetKey the key to be reset. 
     */
    handleDelete(targetKey) {
        const key = this._getKey(targetKey);
        key.status = KEY_STATE_ENUM.EMPTY;
    }

    /**
     * Marks the status of the key to filled. Does nothing if key has already
     * been updated to a partial or correct status.
     * @param {string} targetKey the key to be reset. 
     */
    handleWrite(targetKey) {
        const key = this._getKey(targetKey);
        key.status = KEY_STATE_ENUM.EMPTY;
    }

    /**
     * Updates the status of the keys based on the status of the tiles in the
     * submitted word.
     * @param {Tile[]} tiles the tiles that made up the submitted word.
     */
    handleSubmit(tiles) {
        for (const tile of tiles) {
            const key = this._getKey(tile.letter);
            key.status = tile.status === TILE_STATE_ENUM.FILLED
                ? KEY_STATE_ENUM.EMPTY
                : tile.status;
        }
    }

    /**
     * Retrieves the key with the provided letter.
     * @param {string} the letter to be retrieved.
     */
    _getKey(targetKey) {
        for (const row of this.keys) {
            for (const key of row) {
                if (key.letter === targetKey) {
                    return key;
                }
            }
        }
    }

    /**
     * Changes the language of the current keyboard.
     * @param {string} newLanguage Language abbreviation of the new keyboard layout.
     */
    changeLanguage(newLanguage) {
        this._lang = newLanguage;
        return this.keys;
    }

    /**
     * Returns 2D array of Keys given the current keyboard configuration. 
     */
    _createLayout() {
        const layout = this._layout[this._lang];
        const keys = [];

        for (const row of layout) {
            const _row = [];

            for (const key of row) {
                _row.push(new Key(key));
            }

            keys.push(_row);
        }

        return keys;
    }
}

export default Keyboard;
