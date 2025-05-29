document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("sakura");
  const ctx = canvas.getContext("2d");

  // 设置canvas尺寸
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  // 樱花类
  class Sakura {
    constructor() {
      this.reset();
      // 添加随机大小和旋转角度
      this.size = Math.random() * 6 + 4; // 4-10px
      this.rotateSpeed = (Math.random() - 0.5) * 2;
      this.angle = Math.random() * 360;
      // 添加随机颜色
      this.colors = [
        "rgba(255, 183, 197, 0.9)", // 浅粉色
        "rgba(255, 197, 208, 0.9)", // 中粉色
        "rgba(255, 218, 224, 0.9)", // 淡粉色
        "rgba(255, 228, 234, 0.9)", // 极淡粉色
      ];
      this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
    }

    reset() {
      // 初始位置在画布顶部随机位置
      this.x = Math.random() * canvas.width;
      this.y = -10;
      // 随机速度
      this.speedX = Math.random() * 2 - 1;
      this.speedY = Math.random() * 2 + 1;
      // 添加摆动效果
      this.swing = 0;
      this.swingSpeed = (Math.random() - 0.5) * 0.1;
      this.swingRange = Math.random() * 3;
      // 透明度
      this.opacity = Math.random() * 0.3 + 0.7;
    }

    update() {
      // 更新位置
      this.x += this.speedX + Math.sin(this.swing) * this.swingRange;
      this.y += this.speedY;
      // 更新摆动
      this.swing += this.swingSpeed;
      // 更新旋转
      this.angle += this.rotateSpeed;
      // 透明度渐变
      if (this.y > canvas.height * 0.8) {
        this.opacity -= 0.01;
      }

      // 如果超出画布或完全透明则重置
      if (this.y > canvas.height || this.opacity <= 0) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.angle * Math.PI) / 180);
      ctx.globalAlpha = this.opacity;

      // 绘制樱花瓣
      ctx.beginPath();
      ctx.fillStyle = this.color;

      // 绘制五瓣樱花
      for (let i = 0; i < 5; i++) {
        ctx.ellipse(
          0,
          0,
          this.size,
          this.size / 2,
          (i * 72 * Math.PI) / 180,
          0,
          2 * Math.PI
        );
      }

      ctx.fill();
      // 添加花瓣纹理
      ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // 添加花心
      ctx.beginPath();
      ctx.fillStyle = "rgba(255, 230, 240, 0.9)";
      ctx.arc(0, 0, this.size / 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }
  }

  // 创建樱花数组
  const sakuras = Array.from({ length: 50 }, () => new Sakura());

  // 动画循环
  function animate() {
    // 添加半透明遮罩制造拖尾效果
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    sakuras.forEach((sakura) => {
      sakura.update();
      sakura.draw();
    });

    requestAnimationFrame(animate);
  }

  // 添加鼠标交互
  let mouseX = 0;
  let mouseY = 0;

  canvas.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // 影响附近樱花的运动
    sakuras.forEach((sakura) => {
      const dx = mouseX - sakura.x;
      const dy = mouseY - sakura.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 100) {
        sakura.speedX += dx * 0.001;
        sakura.speedY += dy * 0.001;
      }
    });
  });

  // 开始动画
  animate();
});
