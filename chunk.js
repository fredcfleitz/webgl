const CHUNK_WIDTH = 10;
const CHUNK_HEIGHT = 100;
const CHUNK_DEPTH = 10;

const AIR_LAYERS = 30;
const DIRT_LAYERS = 30;
const STONE_LAYERS = 40;


export function createChunk() {
    const chunk = new Array(CHUNK_WIDTH);
  
    for (let x = 0; x < CHUNK_WIDTH; x++) {
      chunk[x] = new Array(CHUNK_HEIGHT);
  
      for (let y = 0; y < CHUNK_HEIGHT; y++) {
        chunk[x][y] = new Array(CHUNK_DEPTH);
      }
    }

    fillChunk(chunk);
  
    return chunk;
}

  
export function fillChunk(chunk) {
    for (let x = 0; x < CHUNK_WIDTH; x++) {
        for (let y = 0; y < CHUNK_HEIGHT; y++) {
            for (let z = 0; z < CHUNK_DEPTH; z++) {
                if (y < AIR_LAYERS) {
                chunk[x][y][z] = 0; // Air
                } else if (y < AIR_LAYERS + DIRT_LAYERS) {
                chunk[x][y][z] = 1; // Type 1 block
                } else {
                chunk[x][y][z] = 2; // Type 2 block
                }
            }
        }
    }
}

export function isNeighborTransparent(chunk, x, y, z) {
    if (x < 0 || x >= CHUNK_WIDTH || y < 0 || y >= CHUNK_HEIGHT || z < 0 || z >= CHUNK_DEPTH) {
      return true; // Outside the chunk boundaries, treat as transparent
    }
  
    return chunk[x][y][z] === 0; // Return true if the cube is air (type 0)
}

export function addFace(x, y, z, faceDirection, cubeType, positions, texCoords, indices) {
    const faceVertices = {
      front: [
        [x, y, z + 1],
        [x + 1, y, z + 1],
        [x + 1, y + 1, z + 1],
        [x, y + 1, z + 1]
      ],
      back: [
        [x + 1, y, z],
        [x, y, z],
        [x, y + 1, z],
        [x + 1, y + 1, z]
      ],
      left: [
        [x, y, z],
        [x, y, z + 1],
        [x, y + 1, z + 1],
        [x, y + 1, z]
      ],
      right: [
        [x + 1, y, z + 1],
        [x + 1, y, z],
        [x + 1, y + 1, z],
        [x + 1, y + 1, z + 1]
      ],
      top: [
        [x, y + 1, z],
        [x + 1, y + 1, z],
        [x + 1, y + 1, z + 1],
        [x, y + 1, z + 1]
      ],
      bottom: [
        [x, y, z + 1],
        [x + 1, y, z + 1],
        [x + 1, y, z],
        [x, y, z]
      ]
    };
  
    // Vertex positions for the face
    const facePosition = faceVertices[faceDirection];
    for (const position of facePosition) {
      positions.push(...position);
    }
  
    // Texture coordinates for the face based on the cube type
    const textureSize = 1 / 2; // Assuming two cube types in a 1x2 texture atlas
    const textureX = (cubeType - 1) * textureSize;
    const textureY = 0;
    const faceTexCoords = [
      [textureX, textureY],
      [textureX + textureSize, textureY],
      [textureX + textureSize, textureY + 1],
      [textureX, textureY + 1]
    ];
    for (const texCoord of faceTexCoords) {
      texCoords.push(...texCoord);
    }
  
    // Indices for the face
    const baseIndex = positions.length / 3 - 4;
    const faceIndices = [0, 1, 2, 2, 3, 0].map(index => baseIndex + index);
    indices.push(...faceIndices);
}
  
  
  
export function generateMesh(chunk) {
    const positions = [];
    const texCoords = [];
    const indices = [];
    for (let x = 0; x < CHUNK_WIDTH; x++) {
        for (let y = 0; y < CHUNK_HEIGHT; y++) {
            for (let z = 0; z < CHUNK_DEPTH; z++) {
                const cubeType = chunk[x][y][z];
                if (cubeType !== 0) { 
                    if (isNeighborTransparent(chunk, x, y - 1, z)) {
                        addFace(x, y, z, 'bottom', cubeType, positions, texCoords, indices);
                    }
                    if (isNeighborTransparent(chunk, x, y + 1, z)) {
                        addFace(x, y, z, 'top', cubeType, positions, texCoords, indices);
                    }
                    if (isNeighborTransparent(chunk, x - 1, y, z)) {
                        addFace(x, y, z, 'left', cubeType, positions, texCoords, indices);
                    }
                    if (isNeighborTransparent(chunk, x + 1, y, z)) {
                        addFace(x, y, z, 'right', cubeType, positions, texCoords, indices);
                    }
                    if (isNeighborTransparent(chunk, x, y, z - 1)) {
                        addFace(x, y, z, 'front', cubeType, positions, texCoords, indices);
                    }
                    if (isNeighborTransparent(chunk, x, y, z + 1)) {
                        addFace(x, y, z, 'back', cubeType, positions, texCoords, indices);
                    }
                }
            }
        }
    }
    return {
        positions,
        texCoords,
        indices,
    };
}