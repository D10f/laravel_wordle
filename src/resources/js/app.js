import Alpine from 'alpinejs';
import Game from './Game';
import Keyboard from './Keyboard';
import { GAME_STATE_ENUM, MAX_ATTEMPTS, WORD_LENGTH } from './constants';

document.addEventListener('alpine:init', () => {
    Alpine.data('game', () => ({
        message: '',

        init() {
            this.game = new Game(MAX_ATTEMPTS, WORD_LENGTH);
            this.keyboard = new Keyboard();
        },

        onKeyPress(key) {
            switch (this.game.state) {
                case GAME_STATE_ENUM.ACTIVE:

                    if (key === 'Backspace') {
                        const letterDeleted = this.game.handleDelete();
                        if (letterDeleted) {
                            this.keyboard.handleDelete(letterDeleted);
                        }
                        return;
                    }

                    if (/^[a-zA-Z]$/.test(key)) {
                        this.game.handleWrite(key);
                        this.keyboard.handleWrite(key);
                        return;
                    }

                    break;
                case GAME_STATE_ENUM.WAIT:
                    if (key === 'Enter') {
                        this.message = this.game.handleSubmit();
                        const updatedRow = this.game.getRowAt(this.game.currentAttempt - 1);
                        this.keyboard.handleSubmit(updatedRow);
                        return;
                    }

                    if (key === 'Backspace') {
                        const letterDeleted = this.game.handleDelete();
                        if (letterDeleted) {
                            this.keyboard.handleDelete(letterDeleted);
                        }
                        return;
                    }

                    break;
                case GAME_STATE_ENUM.LOAD:
                case GAME_STATE_ENUM.DEFEATED:
                case GAME_STATE_ENUM.COMPLETED:
                default:
                    break;
            }
        },
    }));
});

window.Alpine = Alpine;
Alpine.start();
