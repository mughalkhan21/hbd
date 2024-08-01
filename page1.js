document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');

    // Resize canvas to cover the entire window
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];

    function createConfetti() {
        const colors = ['#ff6347', '#ff4500', '#32cd32', '#4682b4', '#ffd700'];
        const numParticles = 200;
        for (let i = 0; i < numParticles; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 10 + 2,
                speedX: Math.random() * 4 - 2,
                speedY: Math.random() * 6 + 2,
                color: colors[Math.floor(Math.random() * colors.length)],
                life: Math.random() * 100 + 50
            });
        }
    }

    function animateConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((particle, index) => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            particle.life -= 1;

            if (particle.life <= 0) {
                particles.splice(index, 1);
            } else {
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.fill();
            }
        });

        requestAnimationFrame(animateConfetti);
    }

    createConfetti();
    animateConfetti();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});
