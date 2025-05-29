class Flower {
  constructor(canvas) {
    this.canvas = canvas;
    this.x = Math.random() * canvas.width;
    this.y = -20;
    this.size = Math.random() * 5 + 3;
    this.speedX = Math.random() * 2 - 1;
    this.speedY = Math.random() * 2 + 1;
    this.rotation = Math.random() * 360;
    this.rotationSpeed = Math.random() * 2 - 1;
    this.opacity = Math.random() * 0.5 + 0.3;
    this.color = this.getRandomColor();
  }

  getRandomColor() {
    const colors = ["#ffb7c5", "#ffd1dc", "#fff0f5", "#ff69b4", "#ffc0cb"];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  update() {
    this.y += this.speedY;
    this.x += this.speedX;
    this.rotation += this.rotationSpeed;

    if (this.y > this.canvas.height) {
      this.y = -20;
      this.x = Math.random() * this.canvas.width;
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotation * Math.PI) / 180);
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;

    // 绘制花瓣形状
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(
      this.size,
      -this.size,
      this.size * 2,
      -this.size,
      this.size * 2,
      0
    );
    ctx.bezierCurveTo(this.size * 2, this.size, this.size, this.size, 0, 0);
    ctx.fill();
    ctx.restore();
  }
}

function initFlowers() {
  const canvas = document.getElementById("flowers");
  const ctx = canvas.getContext("2d");
  const flowers = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  // 创建花瓣
  for (let i = 0; i < 50; i++) {
    flowers.push(new Flower(canvas));
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    flowers.forEach((flower) => {
      flower.update();
      flower.draw(ctx);
    });

    requestAnimationFrame(animate);
  }

  animate();
}

window.addEventListener("load", initFlowers);
