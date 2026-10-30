const emojis = ['🍎','🍌','🍇','🍓','🍒','🥝','🍑','🍍']; // 8 pares = 16 cartas
let tablero = document.getElementById('tablero');
let contadorEl = document.getElementById('contador');

let primeraCarta = null;
let segundaCarta = null;
let bloqueado = false;
let movimientos = 0;
let encontradas = 0;

function mezclar(array) {
    return array.sort(() => Math.random() - 0.5);
}

function crearTablero() {
    tablero.innerHTML = '';
    const pares = [...emojis, ...emojis]; // duplicamos
    const mezcladas = mezclar(pares);

    mezcladas.forEach((emoji) => {
        const carta = document.createElement('div');
        carta.classList.add('carta');
        carta.dataset.emoji = emoji;
        carta.textContent = ''; // boca abajo
        carta.addEventListener('click', () => voltear(carta));
        tablero.appendChild(carta);
    });
}

function voltear(carta) {
    if (bloqueado) return;
    if (carta.classList.contains('destapada')) return;
    if (carta.classList.contains('encontrada')) return;

    carta.textContent = carta.dataset.emoji;
    carta.classList.add('destapada');

    if (!primeraCarta) {
        primeraCarta = carta;
        return;
    }

    segundaCarta = carta;
    movimientos++;
    contadorEl.textContent = `Movimientos: ${movimientos}`;
    bloqueado = true;

    if (primeraCarta.dataset.emoji === segundaCarta.dataset.emoji) {
        // Coinciden
        primeraCarta.classList.add('encontrada');
        segundaCarta.classList.add('encontrada');
        encontradas++;
        resetTurno();

        if (encontradas === emojis.length) {
            setTimeout(() => alert(`¡Ganaste en ${movimientos} movimientos! 🎉`), 300);
        }
    } else {
        // No coinciden
        setTimeout(() => {
            primeraCarta.textContent = '';
            segundaCarta.textContent = '';
            primeraCarta.classList.remove('destapada');
            segundaCarta.classList.remove('destapada');
            resetTurno();
        }, 800);
    }
}

function resetTurno() {
    primeraCarta = null;
    segundaCarta = null;
    bloqueado = false;
}

function reiniciar() {
    primeraCarta = null;
    segundaCarta = null;
    bloqueado = false;
    movimientos = 0;
    encontradas = 0;
    contadorEl.textContent = 'Movimientos: 0';
    crearTablero();
}

document.getElementById('reiniciar').addEventListener('click', reiniciar);

// Arrancar
crearTablero();
