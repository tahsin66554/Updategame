const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 600;

let mobs = [];
let obstacles = [];
let powerUps = [];
let score = 0;
let level = 1;
let speed = 2;

// মাউস ক্লিক করলে নতুন Mob তৈরি হবে
canvas.addEventListener("click", function(event) {
    let x = event.clientX - canvas.getBoundingClientRect().left;
    mobs.push({ x: x, y: canvas.height - 20, radius: 10, color: "blue" });
});

// বাধা তৈরি করা
function spawnObstacle() {
    let x = Math.random() * (canvas.width - 50);
    let type = Math.random() > 0.5 ? "normal" : "fast"; // দুই ধরনের বাধা
    obstacles.push({
        x: x, y: 0, width: 50, height: 20, color: type === "normal" ? "red" : "purple",
        speed: type === "normal" ? speed : speed + 2
    });
}

// পাওয়ার-আপ তৈরি করা
function spawnPowerUp() {
    let x = Math.random() * (canvas.width - 30);
    powerUps.push({ x: x, y: 0, radius: 10, color: "yellow" });
}

setInterval(spawnObstacle, 2000);
setInterval(spawnPowerUp, 5000); // প্রতি ৫ সেকেন্ডে পাওয়ার-আপ আসবে

// গেম আপডেট লজিক
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // মব মুভমেন্ট
    mobs.forEach((mob, index) => {
        mob.y -= speed;
        ctx.beginPath();
        ctx.arc(mob.x, mob.y, mob.radius, 0, Math.PI * 2);
        ctx.fillStyle = mob.color;
        ctx.fill();
        ctx.closePath();

        // বাধার সাথে সংঘর্ষ চেক করা
        obstacles.forEach((obstacle, obsIndex) => {
            if (
                mob.x > obstacle.x &&
                mob.x < obstacle.x + obstacle.width &&
                mob.y > obstacle.y &&
                mob.y < obstacle.y + obstacle.height
            ) {
                mobs.splice(index, 1);
                obstacles.splice(obsIndex, 1);
                score++;
                if (score % 10 === 0) {
                    level++;
                    speed += 0.5; // লেভেল বাড়লে গেম দ্রুত হবে
                }
            }
        });

        // পাওয়ার-আপ সংগ্রহ করা
        powerUps.forEach((powerUp, pIndex) => {
            let dist = Math.hypot(mob.x - powerUp.x, mob.y - powerUp.y);
            if (dist < mob.radius + powerUp.radius) {
                powerUps.splice(pIndex, 1);
                speed += 1; // পাওয়ার-আপ নিলে স্পিড বাড়বে
            }
        });
    });

    // বাধার মুভমেন্ট
    obstacles.forEach((obstacle) => {
        obstacle.y += obstacle.speed;
        ctx.fillStyle = obstacle.color;
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });

    // পাওয়ার-আপ মুভমেন্ট
    powerUps.forEach((powerUp) => {
        powerUp.y += 2;
        ctx.beginPath();
        ctx.arc(powerUp.x, powerUp.y, powerUp.radius, 0, Math.PI * 2);
        ctx.fillStyle = powerUp.color;
        ctx.fill();
        ctx.closePath();
    });

    // স্কোর ও লেভেল দেখানো
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 20, 30);
    ctx.fillText("Level: " + level, 300, 30);

    requestAnimationFrame(update);
}

// গেম শুরু করা
update();