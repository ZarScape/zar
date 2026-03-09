const canvas = document.getElementById("snake-canvas");
const ctx = canvas.getContext("2d");

const scoreEl = document.getElementById("score");
const bestEl = document.getElementById("best");
const speedEl = document.getElementById("speed");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const exitFocusBtn = document.getElementById("exit-focus");
const overlay = document.getElementById("overlay");
const overlayTitle = document.getElementById("overlay-title");
const overlayText = document.getElementById("overlay-text");
const overlayBtn = document.getElementById("overlay-btn");
document.addEventListener("contextmenu", (event) => event.preventDefault());

const GRID = 24;
const CELL = canvas.width / GRID;
const START_SPEED = 130;
const MIN_SPEED = 78;
const SPEED_STEP = 2;

let snake;
let direction;
let queuedDirection;
let food;
let running = false;
let paused = false;
let tickMs = START_SPEED;
let lastTick = 0;
let score = 0;
let best = Number(localStorage.getItem("zar_snake_best") || 0);
let foodPulse = 0;
let focusTransitioning = false;

bestEl.textContent = String(best);

function init() {
    const mid = Math.floor(GRID / 2);
    snake = [
        { x: mid - 1, y: mid },
        { x: mid - 2, y: mid },
        { x: mid - 3, y: mid }
    ];
    direction = { x: 1, y: 0 };
    queuedDirection = { x: 1, y: 0 };
    food = spawnFood();
    running = false;
    paused = false;
    tickMs = START_SPEED;
    score = 0;
    foodPulse = 0;
    updateHUD();
    showOverlay("Snake 404", "Press Start to play.", "Start");
    draw();
}

function spawnFood() {
    while (true) {
        const point = {
            x: Math.floor(Math.random() * GRID),
            y: Math.floor(Math.random() * GRID)
        };
        if (!snake.some((part) => part.x === point.x && part.y === point.y)) {
            return point;
        }
    }
}

function updateHUD() {
    scoreEl.textContent = String(score);
    speedEl.textContent = `${(START_SPEED / tickMs).toFixed(1)}x`;
}

function showOverlay(title, text, buttonText) {
    overlayTitle.textContent = title;
    overlayText.textContent = text;
    overlayBtn.textContent = buttonText;
    overlay.classList.remove("hidden");
}

function hideOverlay() {
    overlay.classList.add("hidden");
}

function startGame() {
    init();
    running = true;
    enterFocusMode();
    hideOverlay();
}

function setPause(state) {
    if (!running) return;
    paused = state;
    if (paused) {
        showOverlay("Paused", "Press Space to continue.", "Resume");
    } else {
        hideOverlay();
    }
}

function exitFocusMode() {
    if (focusTransitioning || !document.body.classList.contains("game-focus")) return;
    focusTransitioning = true;
    document.body.classList.add("game-focus-leave");
    setTimeout(() => {
        document.body.classList.remove("game-focus", "game-focus-leave");
        focusTransitioning = false;
    }, 360);
    if (running && !paused) {
        setPause(true);
    }
}

function enterFocusMode() {
    if (document.body.classList.contains("game-focus") || focusTransitioning) return;
    focusTransitioning = true;
    document.body.classList.add("game-focus-enter");
    requestAnimationFrame(() => {
        document.body.classList.add("game-focus");
        requestAnimationFrame(() => {
            document.body.classList.remove("game-focus-enter");
            focusTransitioning = false;
        });
    });
}

function isOpposite(next, current) {
    return next.x === -current.x && next.y === -current.y;
}

function setDirection(next) {
    if (!running) return;
    if (!isOpposite(next, direction) && !isOpposite(next, queuedDirection)) {
        queuedDirection = next;
    }
}

function update() {
    direction = queuedDirection;
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    const hitWall = head.x < 0 || head.y < 0 || head.x >= GRID || head.y >= GRID;
    const hitSelf = snake.some((part) => part.x === head.x && part.y === head.y);
    if (hitWall || hitSelf) {
        running = false;
        if (score > best) {
            best = score;
            localStorage.setItem("zar_snake_best", String(best));
            bestEl.textContent = String(best);
        }
        showOverlay("Game Over", `Final Score: ${score}`, "Play Again");
        return;
    }

    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        tickMs = Math.max(MIN_SPEED, tickMs - SPEED_STEP);
        food = spawnFood();
        foodPulse = 1;
        updateHUD();
    } else {
        snake.pop();
    }
}

function drawBoard() {
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "#081616");
    gradient.addColorStop(1, "#030607");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "rgba(255,255,255,0.045)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= GRID; i += 1) {
        const pos = i * CELL + 0.5;
        ctx.beginPath();
        ctx.moveTo(pos, 0);
        ctx.lineTo(pos, canvas.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, pos);
        ctx.lineTo(canvas.width, pos);
        ctx.stroke();
    }
}

function roundedRect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
}

function drawSnake() {
    for (let i = snake.length - 1; i >= 0; i -= 1) {
        const part = snake[i];
        const x = part.x * CELL + 2;
        const y = part.y * CELL + 2;
        const size = CELL - 4;
        const t = i / Math.max(1, snake.length - 1);
        const g = 220 - Math.floor(t * 80);

        ctx.fillStyle = `rgba(0, ${g}, ${185 + Math.floor(t * 40)}, 0.95)`;
        roundedRect(x, y, size, size, 6);
        ctx.fill();
    }

    const head = snake[0];
    const hx = head.x * CELL + 2;
    const hy = head.y * CELL + 2;
    const size = CELL - 4;

    ctx.shadowColor = "rgba(0,219,197,0.65)";
    ctx.shadowBlur = 14;
    ctx.fillStyle = "#00dbc5";
    roundedRect(hx, hy, size, size, 7);
    ctx.fill();
    ctx.shadowBlur = 0;
}

function drawFood() {
    const cx = food.x * CELL + CELL / 2;
    const cy = food.y * CELL + CELL / 2;
    foodPulse = Math.max(0, foodPulse - 0.04);
    const pulse = 1 + foodPulse * 0.3 + Math.sin(performance.now() / 140) * 0.04;
    const radius = (CELL * 0.24) * pulse;

    ctx.beginPath();
    ctx.fillStyle = "#ff5f7a";
    ctx.shadowColor = "rgba(255,95,122,0.65)";
    ctx.shadowBlur = 16;
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
}

function draw() {
    drawBoard();
    drawFood();
    drawSnake();
}

function frame(ts) {
    if (running && !paused && ts - lastTick >= tickMs) {
        lastTick = ts;
        update();
    }
    draw();
    requestAnimationFrame(frame);
}

document.addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();
    if (key === "arrowup" || key === "w") setDirection({ x: 0, y: -1 });
    if (key === "arrowdown" || key === "s") setDirection({ x: 0, y: 1 });
    if (key === "arrowleft" || key === "a") setDirection({ x: -1, y: 0 });
    if (key === "arrowright" || key === "d") setDirection({ x: 1, y: 0 });
    if (key === " ") {
        event.preventDefault();
        if (!running) startGame();
        else setPause(!paused);
    }
});

let touchStartX = 0;
let touchStartY = 0;

canvas.addEventListener("touchstart", (event) => {
    const touch = event.changedTouches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
}, { passive: true });

canvas.addEventListener("touchend", (event) => {
    const touch = event.changedTouches[0];
    const dx = touch.clientX - touchStartX;
    const dy = touch.clientY - touchStartY;
    if (Math.abs(dx) < 12 && Math.abs(dy) < 12) return;
    if (Math.abs(dx) > Math.abs(dy)) {
        setDirection(dx > 0 ? { x: 1, y: 0 } : { x: -1, y: 0 });
    } else {
        setDirection(dy > 0 ? { x: 0, y: 1 } : { x: 0, y: -1 });
    }
});

startBtn.addEventListener("click", startGame);
pauseBtn.addEventListener("click", () => setPause(!paused));
exitFocusBtn.addEventListener("click", exitFocusMode);
overlayBtn.addEventListener("click", () => {
    if (!running) startGame();
    else setPause(false);
});

init();
requestAnimationFrame(frame);
