<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Wordle</title>
    @vite('resources/css/app.css')
    @vite('resources/js/app.js')
</head>
<body>
    <main
        class="game"
        x-data="game"
        @keyup.window="onKeyPress($event.key)"
    >
        <div class="board">
            <template x-for="(row, idx) in game.board">
                <div :class="game.currentAttempt === idx ? 'board__row board__row--active' : 'board__row'">
                    <template x-for="tile in row">
                        <div class="board__tile" :class="tile.status.toLowerCase()" x-text="tile.letter"></div>
                    </template>
                </div>
            </template>
        </div>

        <output class="message" :class="game.isGameOver ? 'message--large' : ''" x-text="message"></output>

        <section
            class="keyboard"
            @click.stop="onKeyPress($event.target.dataset.key)"
        >
            <template x-for="(row, idx) in keyboard.keys">
                <div class="keyboard__row" >
                    <template x-for="key in row">
                        <div
                            class="keyboard__key"
                            :class="key.status.toLowerCase()"
                            :data-key="key.letter"
                            x-text="key.letter"
                        ></div>
                    </template>
                </template>
            </section>
        </section>
    </main>
</body>
</html>
