const canvas = document.getElementById("beerCanvas");
const ctx = canvas.getContext("2d");
let particles = [];
let particleCount = 280;

for (let i = 0; i < particleCount; i++) {
    particles.push(new particle());
}

function particle() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + Math.random() * 300;
    this.speed = 1 + Math.random() / 2;
    this.radius = Math.random() * 3;
    this.opacity = (Math.random() * 100) / 1000;
}

function loop() {
    requestAnimationFrame(loop);
    draw();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "lighter";
    for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        ctx.beginPath();
        ctx.fillStyle = "rgba(255,255,255," + p.opacity + ")";
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
        ctx.fill();
        p.y -= p.speed;
        if (p.y <= -10) particles[i] = new particle();
    }
}

function setHeights() {
    var windowHeight = $(window).height();
    $(".slide").height(windowHeight);
}

setHeights();

loop();

$(window).resize(function () {
    setHeights();
});

$(() => {
    $.get("/counter.php");
});
