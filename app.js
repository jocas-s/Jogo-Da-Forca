const listaPalavras = ['laranja', 'abacaxi', 'melancia', 'maça'];
const bancoDePalavras = {
        Animais: ["cachorro", "gato", "elefante", "girafa"],
        Comidas: ["pizza", "hamburguer", "salada", "sushi"],
        Profissoes: ["engenheiro", "medico", "professor", "advogado"]
    };

        let palavraEscolhida;
        let exibicaoPalavra;
        let letrasChutadas;
        let tentativasRestantes;
        let numeroErros;

function reiniciarJogo() {
    document.getElementById('botao-reiniciar').style.display = 'none';
    document.getElementById('entrada-letra').disabled = false;

    const categorias = Object.keys(bancoDePalavras); // Obtém os nomes das categorias
    const categoriaAleatoria = categorias[Math.floor(Math.random() * categorias.length)];

    const palavrasDaCategoria = bancoDePalavras[categoriaAleatoria];
    palavraEscolhida = palavrasDaCategoria[Math.floor(Math.random() * palavrasDaCategoria.length)];

    //ESCOLHER UMA PALAVRA ALEATORIA DA LISTA
    console.log(palavraEscolhida);
    document.getElementById("dica").innerText = `Dica: ${categoriaAleatoria}`;
    //INICIALIZAR A EXIBIÇÃO COM UNDERSCORES "_"
    exibicaoPalavra = Array(palavraEscolhida.length).fill('_');
    console.log(exibicaoPalavra);

    //INICIALIZAR A LISTA DE PALAVRAS CHUTADAS
    letrasChutadas = [];

    //DEFINIR O NUMERO MAXIMO DE TENTATIVAS
    tentativasRestantes = 6;

    //INICIALIZA O NUMERO DE ERROS
    numeroErros = 0;

    atualizarExibicao();
}

function atualizarExibicao() {
    document.getElementById("exibicao-palavra").innerText = exibicaoPalavra.join(' ');
    document.getElementById("letras-chutadas").innerText = `${letrasChutadas.join(', ')}`;

    document.getElementById('mensagem').innerText = 'Jogo da Forca';
    document.getElementById("imagem").src = `img/forca${numeroErros}.png`;

    //VERIFICAR SE O JOGO TERMINOU
    if (tentativasRestantes === 0) {
        encerrarJogo('VOCÊ PERDEU!');
    } else if (!exibicaoPalavra.includes('_')) {
        encerrarJogo('VOCÊ GANHOU!');
    }

}

function verificarChute() {
    const entradaLetra = document.getElementById('entrada-letra');
    const letra = entradaLetra.value.toLowerCase();

    if (!letra.match(/[a-zà-ùç]/i)) {
        alert('Por favor, insira uma letra válida.');
        return;
    }

    if (letrasChutadas.includes(letra)) {
        alert('Você já tentou esta letra. Tente outra.');
        return;
    }

    letrasChutadas.push(letra);

    if (palavraEscolhida.includes(letra)) {
        for (let i = 0; i < palavraEscolhida.length; i++) {
            if (palavraEscolhida[i] === letra) {
                exibicaoPalavra[i] = letra;
            }
        }
    } else {
        tentativasRestantes--;
        numeroErros++;
    }

    entradaLetra.value = '';

    atualizarExibicao();
}

function encerrarJogo(mensagem) {
    //DESABILITAR O CAMPO DE DIGITACAO
    document.getElementById('entrada-letra').disabled = true;

    //EXIBIR A MENSAGEM
    document.getElementById('mensagem').style.display = 'block';
    document.getElementById('mensagem').innerText = mensagem;

    //EXIBIR O BOTÃO REINICIAR
    document.getElementById('botao-reiniciar').style.display = 'block';

}

window.load = reiniciarJogo();