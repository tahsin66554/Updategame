// লুডু বোর্ড তৈরি (Three.js ব্যবহার)
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("ludoCanvas") });

renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.8);
document.body.appendChild(renderer.domElement);

// লুডু বোর্ডের প্লেন তৈরি
const boardGeometry = new THREE.PlaneGeometry(10, 10);
const boardTexture = new THREE.TextureLoader().load('assets/ludo-board.png');
const boardMaterial = new THREE.MeshBasicMaterial({ map: boardTexture });
const board = new THREE.Mesh(boardGeometry, boardMaterial);
scene.add(board);

// গুটি (প্লেয়ার পিস) তৈরি করা
const pieceGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.5, 32);
const redMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const blueMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });

const redPiece = new THREE.Mesh(pieceGeometry, redMaterial);
redPiece.position.set(-3, 0, 3);
scene.add(redPiece);

const bluePiece = new THREE.Mesh(pieceGeometry, blueMaterial);
bluePiece.position.set(3, 0, -3);
scene.add(bluePiece);

camera.position.z = 5;

// রেন্ডার ফাংশন
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

// ডাইস রোল করা
function rollDice() {
    let diceValue = Math.floor(Math.random() * 6) + 1;
    document.getElementById("diceResult").innerText = `Roll: ${diceValue}`;

    // গুটির মুভমেন্ট (এনিমেশন)
    let newPosition = redPiece.position.x + diceValue * 0.5;
    gsap.to(redPiece.position, { x: newPosition, duration: 1 });
}
