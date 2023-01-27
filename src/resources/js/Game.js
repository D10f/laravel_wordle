import Board from './Board';
import FrequencyMap from './FrequencyMap';
import { GAME_STATE_ENUM, TILE_STATE_ENUM } from './constants';

class Game {

    constructor(maxAttempts, wordLength) {
        this._maxAttmepts = maxAttempts;
        this._wordLength = wordLength;
        this.currentAttempt = 0;
        this._board = new Board(maxAttempts, wordLength);
        // this._targetWord = this.pickRandomWord(wordLength);
        this._targetWord = 'pizza';
        this.state = GAME_STATE_ENUM.ACTIVE;
    }

    /**
     * Attempts to write the next character entered by the user.
     * @param {string} key a single character within the a-z range.
     */
    handleWrite(key) {
        this._board.writeLetter(key, this.currentAttempt);
        if (this.currentRow.every(tile => tile.status === TILE_STATE_ENUM.FILLED)) {
            this.state = GAME_STATE_ENUM.WAIT;
        }
    }

    /**
     * Attempts to delete the latest character in the current attempt.
     */
    handleDelete() {
        this.state = GAME_STATE_ENUM.ACTIVE;
        return this._board.deleteLetter(this.currentAttempt);
    }

    /**
     * Compares the guess with the target word.
     */
    handleSubmit() {
        const guess = this.currentGuess;

        if (guess !== this._targetWord) {
            this.evaluateGuess();
            this.currentAttempt++;

            if (this.hasAttemptsLeft) {
                this.state = GAME_STATE_ENUM.DEFEATED;
                return 'You lost!';
            }

            this.state = GAME_STATE_ENUM.ACTIVE;
            return `Try again! You still have ${this.attemptsLeft} attempts`;
        }

        this.state = GAME_STATE_ENUM.COMPLETED;
        this.currentRow.forEach(tile => tile.update({
            status: TILE_STATE_ENUM.CORRECT
        }));

        return `Well done, you guessed it in ${this.currentAttempt + 1} attempts. Congrats!`;
    }

    /**
     * Compares the position of each character input with the target word.
     */
    evaluateGuess() {
        const currentRow = this.currentRow;
        const targetWordFrequencyMap = new FrequencyMap(this._targetWord);
        const partialMatches = [];

        currentRow.forEach((tile, idx) => {
            if (!this._targetWord.includes(tile.letter)) {
                return;
            }

            const isPerfectMatch = tile.letter === this._targetWord[idx];

            if (!isPerfectMatch) {
                partialMatches.push(tile);
                return;
            }

            targetWordFrequencyMap.decrease(tile.letter);
            tile.update({ status: TILE_STATE_ENUM.CORRECT });
        });

        partialMatches.forEach((tile) => {
            // Check frequency of appearance of letter in target word
            const targetLetterFreq = targetWordFrequencyMap.get(tile.letter);

            if (targetLetterFreq > 0) {
                targetWordFrequencyMap.decrease(tile.letter);
                tile.update({
                    status: TILE_STATE_ENUM.PARTIAL
                });
            }
        });
    }

    /**
     * Retrieves a row of tiles at the provided index.
     * @param {number} row the row index.
     */
    getRowAt(rowIdx) {
        return this._board.board[rowIdx];
    }

    /**
     * Returns the underlying 2D array that holds all the letters.
     */
    get board() {
        return this._board.board;
    }

    /**
     * Calculates the number of attempts left to guess the word.
     */
    get attemptsLeft() {
        return this._maxAttmepts - this.currentAttempt;
    }

    /**
     * Returns an array of tiles corresponding the current attempt.
     */
    get currentRow() {
        return this._board.board[this.currentAttempt];
    }

    /**
     * Returns the user input as an array of character strings.
     */
    get currentGuess() {
        return this.currentRow.reduce((result, tile) => result + tile.letter, '').toLowerCase();
    }

    /**
     * Returns true if the user has consumed all attempts at guessing the word.
     */
    get hasAttemptsLeft() {
        return this.currentAttempt === this._maxAttmepts;
    }

    /**
     * Returns true if the game state is in one of 'defeated' or 'completed' states.
     */
    get isGameOver() {
        return this.state === GAME_STATE_ENUM.DEFEATED || this.state === GAME_STATE_ENUM.COMPLETED;
    }
}

export default Game;
