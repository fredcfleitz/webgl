
import { initShaders } from './shaders.js';
import { createBuffers } from './buffers.js';
import { cubeColors, cubeIndices, cubeVertices, generateColors, generateCubes } from './objects.js';
import { initGl } from './util.js';
import { drawScene } from './scene.js';

const gl = initGl();

const shaderProgram = initShaders(gl);

const numCubes = 1000;
const cubePositions = generateCubes(numCubes);
  
const colors = generateColors(numCubes);

const { colorBuffer, vertexBuffer, indexBuffer } = createBuffers(gl, cubeVertices, cubeIndices, colors, shaderProgram);

function renderLoop() {
    drawScene(gl, shaderProgram, numCubes, cubePositions, colorBuffer, vertexBuffer, indexBuffer, cubeColors, cubeIndices);
    requestAnimationFrame(renderLoop);
  }
  
renderLoop();