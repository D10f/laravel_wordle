import { KEY_STATE_ENUM } from "./constants";

class Key {
    constructor(letter) {
        this._letter = letter;
        this._status = KEY_STATE_ENUM.EMPTY;
    }

    /**
     * A getter for the key letter.
     */
    get letter() {
        return this._letter;
    }

    /**
     * A getter for the key status.
     */
    get status() {
        return this._status;
    }

    /**
     * Prevents changes on the status property when these are "lower tier".
     */
    set status(newStatus) {
        if (this.status === KEY_STATE_ENUM.CORRECT) {
            return;
        }

        if (this.status === KEY_STATE_ENUM.PARTIAL && newStatus !== KEY_STATE_ENUM.CORRECT) {
            return;
        }

        this._status = newStatus;
    }
}

export default Key;
