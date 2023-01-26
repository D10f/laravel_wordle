import Tile from './Tile';
import { TILE_STATE_ENUM } from './constants';

class Board {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.board = this.createBoard(rows, cols);
    }

    /**
     * Returns a 2D array that represents the game board.
     * @param {number} rows the number of attempts to guess the word.
     * @param {number} cols the number of letters in the word.
     * @returns A 2D array filled with Tile objects.
     */
    createBoard(rows, cols) {
        const board = [];
        for (let i = 0; i < rows; i++) {

            const row = [];
            for (let i = 0; i < cols; i++) {
                row.push(new Tile());
            }

            board.push(row);
        }
        return board;
    }

    /**
     * Writes the character entered by the user the next available tile.
     * @param {string} key a single character within the a-z range.
     * @param {number} rowIdx the current active row.
     */
    writeLetter(key, rowIdx) {
        const tile = this.nextTile(rowIdx);
        if (tile) {
            tile.update({
                letter: key,
                status: TILE_STATE_ENUM.FILLED
            });
        }
    }

    /**
     * Attempts to delete the letter from the last tile in the row.
     * @param {number} rowIdx the current active row.
     */
    deleteLetter(rowIdx) {
        const row = this.board[rowIdx];
        for (let i = this.cols - 1; i >= 0; i--) {
            const tile = row[i];
            if (tile.status === TILE_STATE_ENUM.FILLED) {
                tile.update({
                    letter: '',
                    status: TILE_STATE_ENUM.EMPTY
                });
                break;
            }
        }
    }

    /**
     * Returns the next empty tile for the current attempt.
     * @param {number} rowIdx the current active row.
     */
    nextTile(rowIdx) {
        return this.board[rowIdx].find((tile) => tile.status === TILE_STATE_ENUM.EMPTY);
    }

    /**
     * Retrieves a tile at the provided coordinates
     * @param {number} col the column index
     * @param {number} row the row index
     */
    getTileAt(row, col) {
        return this.board[row][col];
    }
}

export default Board;
