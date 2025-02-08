const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fireworks = [];
const particles = [];
const fireworksColors = ["#A1E44D", "#EEFFDB", "#FFA630", "cyan"];
const gravity = 0.11;

class Firework {
  constructor({
    x,
    y,
    color,
    radius = 10,
    impulse = 8,
    angle = 90,
    mass = 0.4,
  }) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = radius;
    this.mass = mass;
    this.velocityX = Math.cos((Math.PI * angle) / 180) * impulse;
    this.velocityY = -Math.sin((Math.PI * angle) / 180) * impulse;
    this.gravity = gravity || 0.08;
    this.isExploded = false;
    this.trail = [];
  }

  update() {
    if (!this.isExploded) {
      this.velocityY += this.gravity;
      this.x += this.velocityX;
      this.y += this.velocityY;

      // Store previous positions for trail effect
      this.trail.push({ x: this.x, y: this.y });
      if (this.trail.length > 9) this.trail.shift();

      // Explosion condition (when velocity peaks downward)
      if (this.velocityY >= -0.5) {
        this.explode();
      }
    }
  }

  explode() {
    this.isExploded = true;
    for (let i = 0; i < 50; i++) {
      particles.push(new Particle({ x: this.x, y: this.y, color: this.color }));
    }
  }

  draw() {
    if (!this.isExploded) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();

      // Draw trail
      ctx.globalAlpha = 0.3;
      for (let i = 0; i < this.trail.length; i++) {
        ctx.beginPath();
        ctx.arc(
          this.trail[i].x,
          this.trail[i].y,
          this.radius / 2,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
      }
      ctx.globalAlpha = 1;
    }
  }
}

class Particle {
  constructor({ x, y, color }) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = Math.random() * 3 + 1;
    this.velocityX = (Math.random() - 0.5) * 5;
    this.velocityY = (Math.random() - 0.5) * 5;
    this.gravity = gravity || 0.08;
    this.lifespan = 100; // Fades over time
  }

  update() {
    this.velocityY += this.gravity;
    this.x += this.velocityX;
    this.y += this.velocityY;
    this.lifespan -= 2; // Fading effect
  }

  draw() {
    ctx.globalAlpha = this.lifespan / 100; // Gradual fade out
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
    ctx.globalAlpha = 1;
  }
}

function getRandomNumberInRange(max, min = 0) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Generate fireworks
function generateFirework() {
  const x = getRandomNumberInRange(canvas.width - 50, 50);
  const color = fireworksColors[getRandomNumberInRange(fireworksColors.length)];
  const angle = getRandomNumberInRange(95, 85);
  const firework = new Firework({ x, y: canvas.height, color, angle, impulse: 12, mass: 0.45 });
  fireworks.push(firework);
}

// Animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update fireworks
  fireworks.forEach((firework, index) => {
    firework.update();
    firework.draw();
    if (firework.isExploded) fireworks.splice(index, 1);
  });

  // Update particles
  particles.forEach((particle, index) => {
    particle.update();
    particle.draw();
    if (particle.lifespan <= 0) particles.splice(index, 1);
  });

  requestAnimationFrame(animate);
}

// Start animation

// Start Animation
const startAnimation = () => {
  setInterval(generateFirework, 500);
  animate();
};

// startAnimation();
