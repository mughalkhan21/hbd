alert("Hey Kralitsa!!!Find And Click The One With Different Colour");


function newPage(){
    alert("Wooohoooo You Find It!")
}




document.addEventListener('DOMContentLoaded', () => {
    const wishButton = document.getElementById('wishButton');
    const personalMessage = document.getElementById('personalMessage');
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');
    const celebrationSound = document.getElementById('celebrationSound');

    // Resize canvas to cover the entire window
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];

    function createConfetti() {
        const colors = ['#ff6347', '#ff4500', '#32cd32', '#4682b4', '#ffd700'];
        const numParticles = 150;
        for (let i = 0; i < numParticles; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 10 + 2,
                speedX: Math.random() * 4 - 2,
                speedY: Math.random() * 5 + 2,
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

    wishButton.addEventListener('click', () => {
        personalMessage.textContent = "May this year bring you closer to your dreams and fill your life with happiness!";
        personalMessage.classList.remove('hidden');

        // Play sound effect
        celebrationSound.play();

        // Trigger confetti animation
        createConfetti();
        animateConfetti();
    });

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});
