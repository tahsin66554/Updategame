import * as THREE from 'three';

export function initBoard(scene) {
    const texture = new THREE.TextureLoader().load('boardTexture.jpg');
    const boardGeometry = new THREE.PlaneGeometry(10, 10);
    const boardMaterial = new THREE.MeshBasicMaterial({ map: texture });
    const board = new THREE.Mesh(boardGeometry, boardMaterial);
    scene.add(board);
}
