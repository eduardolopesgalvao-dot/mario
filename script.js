// Selecionando elementos visuais do jogo
const mario = document.querySelector('.mario');  // Seleciona pela classe
const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds');

// Selecionando elementos da interface
const scoreDisplay = document.getElementById('score');  // Seleciona pelo ID
const restartBtn = document.getElementById('restartBtn');

// Variáveis de controle do jogo
let score = 0;  // Contador de pontos
let isGameOver = false;  // Estado do jogo (jogando ou não)
const jump = () => {
    // Só permite pular se o jogo não acabou
    if (!isGameOver) {
      // Adiciona a classe 'jump' que ativa a animação CSS
      mario.classList.add('jump');
  
      // Remove a classe após 500ms (duração da animação)
      setTimeout(() => {
        mario.classList.remove('jump');
      }, 500);
    }
  };
  
  // Escuta o evento de tecla pressionada
  document.addEventListener('keydown', (event) => {
    // Verifica se a tecla pressionada é a barra de espaço
    if (event.code === 'Space') {
      jump();
    }
  });
  // Loop principal que roda a cada 10 milissegundos (100 vezes por segundo)
const loop = setInterval(() => {
    // Captura a posição horizontal do cano (distância da esquerda)
    const pipePosition = pipe.offsetLeft;

    // Captura a posição vertical do Mario (altura do chão)
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
    // O '+' converte a string "50px" para o número 50

    // Captura a posição das nuvens (para parar a animação)
    const cloudsPosition = +window.getComputedStyle(clouds).right.replace('px', '');

    // LÓGICA DE COLISÃO
    // Verifica se:
    // 1. O cano está na zona de colisão (entre 0px e 120px da esquerda)
    // 2. Mario está baixo demais (menos de 88px do chão)
    if (pipePosition < 120 && pipePosition > 0 && marioPosition < 80) {

        // PARA TODAS AS ANIMAÇÕES
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`; // Congela posição do cano

        clouds.style.animation = 'none';
        clouds.style.right = `${cloudsPosition}px`; // Congela nuvens

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`; // Congela Mario

        // Troca a imagem do Mario para "game over"
        mario.src = './Images/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';
    }
}, 10);
// Atualiza o estado do jogo
isGameOver = true;
restartBtn.style.display = 'block'; // Mostra botão de reiniciar

clearInterval(loop); // Para o loop principal

// SISTEMA DE PONTUAÇÃO
// Aumenta a pontuação a cada ciclo (se o jogo não acabou)
if (!isGameOver) {
    score++;
    scoreDisplay.textContent = score; // Atualiza o display
}

10; // Executa a cada 10ms
// Quando o botão de reiniciar for clicado
restartBtn.addEventListener('click', () => {
    location.reload(); // Recarrega a página inteira
});

// Adicione estas linhas temporariamente para testar:

// 1. Teste de posicionamento
console.log("Posição do pipe:", pipePosition);
console.log("Posição do Mario:", marioPosition);

// 2. Teste de colisão
if (pipePosition < 120 && pipePosition > 0 && marioPosition < 80) {
    console.log("COLISÃO DETECTADA!");
}

// 3. Teste de pontuação
console.log("Pontuação atual:", score);
// Dica: Adicione esta lógica dentro do loop
if (score > 100 && score < 101) {
    pipe.style.animationDuration = '1.5s';  // Mais rápido!
}

if (score > 300 && score < 301) {
    pipe.style.animationDuration = '1s';  // Ainda mais rápido!
}
// No HTML, adicione:
//<audio id="jumpSound" src="../sounds/jump.mp3"></audio>
//<audio id="gameOverSound" src="../sounds/gameover.mp3"></audio>

const jumpSound = document.getElementById('jumpSound');
const gameOverSound = document.getElementById('gameOverSound');

// Na função jump:
const jump = () => {
  if (!isGameOver) {
    mario.classList.add('jump');
    jumpSound.play(); // Toca o som
    setTimeout(() => {
      mario.classList.remove('jump');
    }, 500);
  }
};
// Na detecção de colisão:
if (pipePosition < 120 && pipePosition > 0 && marioPosition < 80) {
  gameOverSound.play(); // Som de game over
  // ... resto do código
}
// No início do arquivo
let highScore = localStorage.getItem('marioHighScore') || 0;

// No HTML, adicione:
//<div class="high-score">Recorde: <span id="highScore"></span></div>

const highScoreDisplay = document.getElementById('highScore');
highScoreDisplay.textContent = highScore;

// No game over (dentro da colisão):
if (score > highScore) {
  highScore = score;
  localStorage.setItem('marioHighScore', highScore);
  alert('Novo recorde! 🏆');
}
// No HTML, adicione mais um pipe:
// <img src="../Images/pipe.png" class="pipe pipe2">

// No CSS:
// .pipe2 {
//   animation-delay: 1s; /* Aparece 1 segundo depois */
// }

// No JS, selecione ambos:
const pipes = document.querySelectorAll('.pipe');

// Adapte a lógica de colisão para verificar todos os pipes
pipes.forEach(pipeElement => {
  const pipePos = pipeElement.offsetLeft;
  if (pipePos <= 120 && pipePos > 0 && marioPosition < 80) {
    // Game over
  }
});
// No HTML:
// <button id="themeBtn">🌙 Modo Noturno</button>

const themeBtn = document.getElementById('themeBtn');
const board = document.querySelector('.board');

themeBtn.addEventListener('click', () => {
  board.classList.toggle('night-mode');
  themeBtn.textContent = board.classList.contains('night-mode')
    ? '☀️ Modo Dia'
    : '🌙 Modo Noturno';
});
let jumpCount = 0;

// Na função jump:
function jump() {
    if (!isGameOver) {
        jumpCount++;
        mario.classList.add('jump');
        // ...
    }
}

// No game over:
console.log(`Você pulou ${jumpCount} vezes!`);
const coin = document.querySelector('.coin');

// No loop, adicione detecção de coleta:
const coinPosition = coin.offsetLeft;

if (coinPosition <= 150 && coinPosition > 100 && marioPosition >= 140) {
  score += 50;  // Bônus de 50 pontos
  coin.style.display = 'none';  // Esconde a moeda
  setTimeout(() => {
    coin.style.display = 'block';
    coin.style.animation = 'none';
    coin.offsetHeight;  // Força reflow
    coin.style.animation = 'coin-animation 3s infinite linear';
  }, 5000);
}
