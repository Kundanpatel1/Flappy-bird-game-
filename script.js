const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let bird = {
  x: 100,
  y: canvas.height / 2,
  width: 40,
  height: 30,
  gravity: 0.6,
  lift: -12,
  velocity: 0
};

function drawBird() {
  ctx.fillStyle = "yellow";
  ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
}

function updateBird() {
  bird.velocity += bird.gravity;
  bird.y += bird.velocity;

  if (bird.y + bird.height > canvas.height) {
    bird.y = canvas.height - bird.height;
    bird.velocity = 0;
  }

  if (bird.y < 0) {
    bird.y = 0;
    bird.velocity = 0;
  }
}

function flap() {
  bird.velocity = bird.lift;
}

document.addEventListener("keydown", function(e){
  if(e.code === "Space") flap();
});
document.addEventListener("touchstart", flap);

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  updateBird();
  drawBird();
  requestAnimationFrame(gameLoop);
}

gameLoop();
