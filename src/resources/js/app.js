import Alpine from 'alpinejs';
import Game from './Game';
import { GAME_STATE_ENUM, MAX_ATTEMPTS, WORD_LENGTH } from './constants';

document.addEventListener('alpine:init', () => {
    Alpine.data('game', () => ({
        message: '',

        init() {
            this.game = new Game(MAX_ATTEMPTS, WORD_LENGTH);
        },

        onKeyPress(key) {
            switch (this.game.state) {
                case GAME_STATE_ENUM.ACTIVE:
                    if (key === 'Enter') {
                        this.message = this.game.handleSubmit();
                        return;
                    }

                    if (key === 'Backspace') {
                        return this.game.handleDelete();
                    }

                    if (/^[a-zA-Z]$/.test(key)) {
                        return this.game.handleWrite(key);
                    }

                    break;
                case GAME_STATE_ENUM.WAIT:
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
