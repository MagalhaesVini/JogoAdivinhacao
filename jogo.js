
let listaPalavras = [
    { categoria: 'FRUTA', palavra: 'maça' },
    { categoria: 'FRUTA', palavra: 'banana' },
    { categoria: 'FRUTA', palavra: 'laranja' },
    { categoria: 'FRUTA', palavra: 'morango' },
    { categoria: 'FRUTA', palavra: 'abacaxi' },
    { categoria: 'FRUTA', palavra: 'uva' },
    { categoria: 'FRUTA', palavra: 'melancia' },
    { categoria: 'FRUTA', palavra: 'pera' },
    { categoria: 'FRUTA', palavra: 'kiwi' },
    { categoria: 'FRUTA', palavra: 'pessego' },
    { categoria: 'FRUTA', palavra: 'manga' },
    { categoria: 'FRUTA', palavra: 'coco' },
    { categoria: 'FRUTA', palavra: 'mamao' },
    { categoria: 'FRUTA', palavra: 'limao' },
    { categoria: 'FRUTA', palavra: 'cereja' },
    { categoria: 'FRUTA', palavra: 'melao' },
    { categoria: 'FRUTA', palavra: 'ameixa' },
    { categoria: 'FRUTA', palavra: 'framboesa' },
    { categoria: 'FRUTA', palavra: 'pitaya' },
    { categoria: 'PAIS', palavra: 'brasil' },
    { categoria: 'PAIS', palavra: 'china' },
    { categoria: 'PAIS', palavra: 'india' },
    { categoria: 'PAIS', palavra: 'russia' },
    { categoria: 'PAIS', palavra: 'japao' },
    { categoria: 'PAIS', palavra: 'alemanha' },
    { categoria: 'PAIS', palavra: 'frança' },
    { categoria: 'PAIS', palavra: 'canada' },
    { categoria: 'PAIS', palavra: 'italia' },
    { categoria: 'PAIS', palavra: 'portugal' },
    { categoria: 'PAIS', palavra: 'argentina' },
    { categoria: 'PAIS', palavra: 'uruguai' },
    { categoria: 'PAIS', palavra: 'mexico' },
    { categoria: 'PAIS', palavra: 'australia' },
    { categoria: 'PAIS', palavra: 'espanha' },
    { categoria: 'PAIS', palavra: 'egito' },
    { categoria: 'PAIS', palavra: 'paraguai' },
    { categoria: 'ANIMAL', palavra: 'cachorro' },
    { categoria: 'ANIMAL', palavra: 'gato' },
    { categoria: 'ANIMAL', palavra: 'elefante' },
    { categoria: 'ANIMAL', palavra: 'leao' },
    { categoria: 'ANIMAL', palavra: 'girafa' },
    { categoria: 'ANIMAL', palavra: 'tigre' },
    { categoria: 'ANIMAL', palavra: 'urso' },
    { categoria: 'ANIMAL', palavra: 'zebra' },
    { categoria: 'ANIMAL', palavra: 'coruja' },
    { categoria: 'ANIMAL', palavra: 'macaco' },
    { categoria: 'ANIMAL', palavra: 'rinoceronte' },
    { categoria: 'ANIMAL', palavra: 'hipopotamo' },
    { categoria: 'ANIMAL', palavra: 'lobo' },
    { categoria: 'ANIMAL', palavra: 'cobra' },
    { categoria: 'ANIMAL', palavra: 'jacare' },
    { categoria: 'ANIMAL', palavra: 'tartaruga' },
    { categoria: 'ANIMAL', palavra: 'polvo' },
    { categoria: 'ANIMAL', palavra: 'peixe' },
    { categoria: 'ANIMAL', palavra: 'pinguim' },
    { categoria: 'COR', palavra: 'azul' },
    { categoria: 'COR', palavra: 'vermelho' },
    { categoria: 'COR', palavra: 'verde' },
    { categoria: 'COR', palavra: 'amarelo' },
    { categoria: 'COR', palavra: 'roxo' },
    { categoria: 'COR', palavra: 'rosa' },
    { categoria: 'COR', palavra: 'marrom' },
    { categoria: 'COR', palavra: 'cinza' },
    { categoria: 'COR', palavra: 'preto' },
    { categoria: 'COR', palavra: 'turquesa' },
    { categoria: 'COR', palavra: 'dourado' },
    { categoria: 'COR', palavra: 'bege' },
    { categoria: 'COR', palavra: 'bordo' },
    { categoria: 'COR', palavra: 'violeta' },
    { categoria: 'COR', palavra: 'lilas' }
];

let categorias = {
    'FRUTA': true,
    'PAIS': true,
    'ANIMAL': true,
    'COR': true
};

let palavraSecreta = '';
let palavraAdivinhada = '';
let palpitesRestantes = 0;
let categoriaSelecionada = '';
let letrasUsadas = new Set();

function lidarComTeclaPressionada(evento, acao) {
    if (evento.keyCode === 13) {
        evento.preventDefault();
        if (acao === 'fazerPalpite') {
            fazerPalpite();
        } else if (acao === 'fazerPalpitePalavra') {
            fazerPalpitePalavra();
        }
    }
}

function novaJogada() {
    palavraAdivinhadaCompleta = false;

    let categoriasDisponiveis = Object.keys(categorias).filter(categoria => categorias[categoria]);
    categoriaSelecionada = categoriasDisponiveis[Math.floor(Math.random() * categoriasDisponiveis.length)];

    let palavrasParaCategoria = listaPalavras.filter(palavraObjeto => palavraObjeto.categoria === categoriaSelecionada);
    palavraSecreta = palavrasParaCategoria[Math.floor(Math.random() * palavrasParaCategoria.length)].palavra;

    letrasUsadas.clear();

    palavraAdivinhada = '_'.repeat(palavraSecreta.length);
    palpitesRestantes = 3;

    document.getElementById('category').textContent = ` ${categoriaSelecionada}`;
    document.getElementById('word-length').textContent = `CONTEM ${palavraSecreta.length} LETRAS`;
    document.getElementById('word').textContent = `${palavraAdivinhada}`;
    document.getElementById('guesses').textContent = `${palpitesRestantes} Palpites restantes`;
    document.getElementById('used-letters').textContent = '';
    document.getElementById('guess-input').value = '';
    document.getElementById('word-guess-input').value = '';

}

function fazerPalpite() {
    if (palpitesRestantes > 0 && !palavraAdivinhada.includes('_')) {
        alert('Você já acertou a palavra. Inicie um novo jogo!');
    } else if (palpitesRestantes > 0) {
        let letra = document.getElementById('guess-input').value.toLowerCase();
        if (letra.length !== 1 || letrasUsadas.has(letra)) return;

        letrasUsadas.add(letra);

        document.getElementById('used-letters').textContent = `Letras usadas: ${Array.from(letrasUsadas).join(', ').toUpperCase()}`;

        verificarLetra(letra);

    } else {
        alert('Desculpa, você não tem mais palpites. Inicie um novo jogo');
    }
    document.getElementById('guess-input').value = '';
}

function verificarLetra(letra) {
    if (palavraSecreta.includes(letra)) {
        palavraSecreta.split('').forEach((caractere, indice) => {
            if (caractere === letra) palavraAdivinhada = palavraAdivinhada.slice(0, indice) + letra + palavraAdivinhada.slice(indice + 1);
            palavraAdivinhada = palavraAdivinhada.split('').map((l, i) => (palavraSecreta[i] === l ? l.toUpperCase() : l)).join('');
        });

        if (!palavraAdivinhada.includes('_')) {
            alert('Parabéns! Você adivinhou todas as letras.');
        }
    } else {
        palpitesRestantes--;
        if (palpitesRestantes === 0) alert('Desculpa, você não tem mais palpites. Inicie um novo jogo');
    }

    document.getElementById('word').textContent = `${palavraAdivinhada}`;
    document.getElementById('guesses').textContent = `${palpitesRestantes} Palpites restantes`;
}

let palavraAdivinhadaCompleta = false;

function fazerPalpitePalavra() {
    if (palpitesRestantes > 0 && !palavraAdivinhadaCompleta && palavraAdivinhada.includes('_')) {
        const palpitePalavra = document.getElementById('word-guess-input').value.toLowerCase();
        if (palpitePalavra === '') {
            alert('Digite uma palavra antes de fazer o palpite!');
            return;
        }

        if (palpitePalavra === palavraSecreta) {
            palavraAdivinhada = palavraSecreta.toUpperCase();
            alert('Parabéns! Você acertou a palavra.');
            palavraAdivinhadaCompleta = true;
        } else {
            palpitesRestantes--;
            if (palpitesRestantes === 0) {
                alert('Desculpa, você errou a palavra.');
            }
        }

        document.getElementById('word').textContent = `${palavraAdivinhada}`;
        document.getElementById('guesses').textContent = `${palpitesRestantes} Palpites restantes`;
        document.getElementById('word-guess-input').value = '';

    } else if (palavraAdivinhadaCompleta) {
        alert('Você já acertou a palavra. Inicie um novo jogo!');
    } else {
        alert('Desculpa, você não tem mais palpites. Inicie um novo jogo');
    }
}
document.addEventListener('DOMContentLoaded', function () {
    const guessButton = document.getElementById('guessButton');
    const wordGuessButton = document.getElementById('wordGuessButton');
    const newGameButton = document.getElementById('newGameButton');
    const guessInput = document.getElementById('guess-input');
    const wordGuessInput = document.getElementById('word-guess-input');

    guessButton.addEventListener('click', fazerPalpite);
    wordGuessButton.addEventListener('click', fazerPalpitePalavra);
    newGameButton.addEventListener('click', novaJogada);

    guessInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            fazerPalpite();
        }
    });

    wordGuessInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            fazerPalpitePalavra();
        }
    });
});

novaJogada();