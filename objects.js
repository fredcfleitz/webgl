export const cubeVertices = [
    // Front face
    -0.5, -0.5,  0.5,
     0.5, -0.5,  0.5,
     0.5,  0.5,  0.5,
    -0.5,  0.5,  0.5,
    // Back face
    -0.5, -0.5, -0.5,
    -0.5,  0.5, -0.5,
     0.5,  0.5, -0.5,
     0.5, -0.5, -0.5,
    // Top face
    -0.5,  0.5, -0.5,
    -0.5,  0.5,  0.5,
     0.5,  0.5,  0.5,
     0.5,  0.5, -0.5,
    // Bottom face
    -0.5, -0.5, -0.5,
     0.5, -0.5, -0.5,
     0.5, -0.5,  0.5,
    -0.5, -0.5,  0.5,
    // Right face
     0.5, -0.5, -0.5,
     0.5,  0.5, -0.5,
     0.5,  0.5,  0.5,
     0.5, -0.5,  0.5,
    // Left face
    -0.5, -0.5, -0.5,
    -0.5, -0.5,  0.5,
    -0.5,  0.5,  0.5,
    -0.5,  0.5, -0.5,
  ];
  
  export const cubeIndices = [
     0,  1,  2,      0,  2,  3,    // front
     4,  5,  6,      4,  6,  7,    // back
     8,  9, 10,      8, 10, 11,    // top
    12, 13, 14,     12, 14, 15,    // bottom
    16, 17, 18,     16, 18, 19,    // right
    20, 21, 22,     20, 22, 23,    // left
  ];

  export const cubeColors = [
    1.0, 1.0, 1.0, // White
    1.0, 0.0, 0.0, // Red
    0.0, 1.0, 0.0, // Green
    0.0, 0.0, 1.0, // Blue
    1.0, 1.0, 0.0, // Yellow
    1.0, 0.0, 1.0, // Magenta
    0.0, 1.0, 1.0, // Cyan
    0.5, 0.5, 0.5  // Gray
  ];


export function generateColors(numCubes) {
    const colors = [];
    for (let i = 0; i < numCubes; i++) {
        colors.push(...cubeColors);
    }
    return colors;
}

export function generateCubes(numCubes) {
    const cubePositions = new Array(numCubes);
    for (let i = 0; i < numCubes; i++) {
    const x = Math.random() * 20 - 10; // Random number between -10 and 10
    const y = Math.random() * 20 - 10; // Random number between -10 and 10
    const z = -Math.random() * 90 - 10; // Random number between -100 and -10
    cubePositions[i] = [x, y, z];
    }
    return cubePositions;
}