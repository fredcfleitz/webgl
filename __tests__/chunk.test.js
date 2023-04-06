import { createChunk, fillChunk, isNeighborTransparent, addFace, generateMesh } from '../chunk';

test('createChunk creates a 3D array with correct dimensions', () => {
    const chunk = createChunk();
    expect(chunk.length).toBe(10);
  
    for (let x = 0; x < 10; x++) {
      expect(chunk[x].length).toBe(100);
  
      for (let y = 0; y < 100; y++) {
        expect(chunk[x][y].length).toBe(10);
      }
    }
  });

test('fillChunk fills the chunk with correct block types', () => {
  const chunk = createChunk();
  fillChunk(chunk);

  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 100; y++) {
      for (let z = 0; z < 10; z++) {
        if (y < 30) {
          expect(chunk[x][y][z]).toBe(0); // Air
        } else if (y < 60) {
          expect(chunk[x][y][z]).toBe(1); // Type 1 block
        } else {
          expect(chunk[x][y][z]).toBe(2); // Type 2 block
        }
      }
    }
  }
});


test('isNeighborTransparent returns correct values', () => {
  const chunk = new Array(10);
  for (let x = 0; x < 10; x++) {
    chunk[x] = new Array(100);
    for (let y = 0; y < 100; y++) {
      chunk[x][y] = new Array(10).fill(0);
    }
  }

  chunk[1][1][1] = 1;
  chunk[2][2][2] = 2;

  expect(isNeighborTransparent(chunk, 0, 0, 0)).toBe(true); 
  expect(isNeighborTransparent(chunk, 1, 1, 1)).toBe(false); // inside, non-transparent
  expect(isNeighborTransparent(chunk, 2, 2, 2)).toBe(false); // inside, non-transparent
  expect(isNeighborTransparent(chunk, 1, 2, 1)).toBe(true); // inside, transparent
  expect(isNeighborTransparent(chunk, -1, 0, 0)).toBe(true); // outside
  expect(isNeighborTransparent(chunk, 1500, 10000, 10000)).toBe(true); // outside
  expect(isNeighborTransparent(chunk, -1500, -10000, -10000)).toBe(true); // outside
});

test('generateMesh returns correct mesh data', () => {
  const chunk = new Array(10);
  for (let x = 0; x < 10; x++) {
    chunk[x] = new Array(100);
    for (let y = 0; y < 100; y++) {
      chunk[x][y] = new Array(10).fill(0);
    }
  }

  chunk[1][1][1] = 1;
  chunk[2][2][2] = 2;

  const { positions, texCoords, indices } = generateMesh(chunk);


  expect(positions.length).toBeGreaterThan(0);
  expect(texCoords.length).toBeGreaterThan(0);
  expect(indices.length).toBeGreaterThan(0);
});

test('generateMesh returns correct mesh data2', () => {
  const chunk = createChunk();

  chunk[1][1][1] = 1;
  chunk[2][2][2] = 2;

  const { positions, texCoords, indices } = generateMesh(chunk);


  expect(positions.length).toBeGreaterThan(0);
  expect(texCoords.length).toBeGreaterThan(0);
  expect(indices.length).toBeGreaterThan(0);
});

test('addFace adds correct number of vertices, texCoords, and indices', () => {
  const positions = [];
  const texCoords = [];
  const indices = [];

  addFace(0, 0, 0, 'front', 1, positions, texCoords, indices);

  expect(positions.length).toBe(12); // 4 vertices * 3 components per vertex
  expect(texCoords.length).toBe(8); // 4 vertices * 2 components per vertex
  expect(indices.length).toBe(6); // 2 triangles * 3 indices per triangle
});
