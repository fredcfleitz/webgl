
import { initShaders } from './shaders.js';
import { createBuffer } from './buffers.js';
import { drawScene } from './scene.js';


import { cubeIndices, cubeVertices } from './objects.js';
import { initGl } from './util.js';

const gl = initGl();

const shaderProgram = initShaders(gl);

const vertexBuffer = createBuffer(gl, new Float32Array(cubeVertices));
const indexBuffer = createBuffer(gl, new Uint16Array(cubeIndices), gl.ELEMENT_ARRAY_BUFFER);

const programInfo = {
  program: shaderProgram,
  attribLocations: {
    vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
  },
  uniformLocations: {
    modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
    projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
    color: gl.getUniformLocation(shaderProgram, 'uColor'),
  },
};

function renderLoop() {
    drawScene(gl, programInfo, vertexBuffer, indexBuffer, cubeIndices.length);
    requestAnimationFrame(renderLoop);
  }
  
renderLoop();