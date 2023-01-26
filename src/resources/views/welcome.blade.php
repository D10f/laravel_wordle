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
        <template x-for="(row, idx) in game.board">
            <div :class="game.currentAttempt === idx ? 'row active' : 'row'">
                <template x-for="tile in row">
                    <div class="tile" :class="tile.status.toLowerCase()" x-text="tile.letter"></div>
                </template>
            </div>
        </template>

        <output x-text="message"></output>
    </main>
</body>
</html>
