// 获取canvas元素并设置2D绘图上下文
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// 设置画布宽度和高度为窗口的宽度和高度
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// 生成一个随机数的函数
function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// 生成一个随机颜色的函数
function randomColor() {
  return (
    "rgb(" +
    random(0, 255) +
    ", " +
    random(0, 255) +
    ", " +
    random(0, 255) +
    ")"
  );
}

// 定义一个Ball构造函数，用于创建球对象
function Ball(x, y, velX, velY, color, size) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size;
}

// 在Ball原型上添加draw方法，用于绘制球
Ball.prototype.draw = function () {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
};

// 创建一个测试用的球对象
let testBall = new Ball(50, 100, 4, 4, "blue", 10);

// 访问球对象的属性
testBall.x;
testBall.size;
testBall.color;
testBall.draw();

// 在Ball原型上添加update方法，用于更新球的位置
Ball.prototype.update = function () {
  if (this.x + this.size >= width) {
    this.velX = -this.velX;
  }

  if (this.x - this.size <= 0) {
    this.velX = -this.velX;
  }

  if (this.y + this.size >= height) {
    this.velY = -this.velY;
  }

  if (this.y - this.size <= 0) {
    this.velY = -this.velY;
  }

  this.x += this.velX;
  this.y += this.velY;
};

// 创建一个数组，用于存储所有的球对象
let balls = [];

// 循环创建25个球对象，并将它们添加到balls数组中
while (balls.length < 25) {
  let size = random(10, 20);
  let ball = new Ball(
    // 为避免绘制错误，球至少离画布边缘球本身一倍宽度的距离
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomColor(),
    size,
  );
  balls.push(ball);
}

// 定义一个循环函数，用于不断更新画布上的球对象
function loop() {
  // 填充背景色
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, width, height);

  // 遍历balls数组，绘制并更新每个球对象的位置
  for (let i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
  }

  // 使用requestAnimationFrame实现动画循环
  requestAnimationFrame(loop);
}

// 调用loop函数开始动画循环
loop();

// 在Ball原型上添加collisionDetect方法，用于检测球之间的碰撞
Ball.prototype.collisionDetect = function () {
  for (let j = 0; j < balls.length; j++) {
    if (this !== balls[j]) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].color = this.color = randomColor();
      }
    }
  }
};

// 检测第一个球与其他球的碰撞情况（仅作示例）
balls[i].collisionDetect();
