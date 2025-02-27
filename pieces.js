import * as THREE from 'three';

export function initPieces(scene) {
    const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00]; 
    const positions = [[-4, -4], [4, -4], [-4, 4], [4, 4]];

    for (let i = 0; i < colors.length; i++) {
        for (let j = 0; j < 4; j++) {
            const pieceGeometry = new THREE.SphereGeometry(0.3, 32, 32);
            const pieceMaterial = new THREE.MeshBasicMaterial({ color: colors[i] });
            const piece = new THREE.Mesh(pieceGeometry, pieceMaterial);

            piece.position.set(positions[i][0] + (j % 2), positions[i][1] + Math.floor(j / 2), 0);
            scene.add(piece);
        }
    }
}
