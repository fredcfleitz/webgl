
import { initShaders } from './shaders.js';
import { createBuffers } from './buffers.js';
import { cubeColors, cubeIndices, cubeVertices, generateColors, generateCubes } from './objects.js';
import { initGl } from './util.js';
import { drawScene } from './scene.js';
import { createChunk, fillChunk, generateMesh } from './chunk.js';
import { makeTexture } from './texture.js';

const gl = initGl();

const shaderProgram = initShaders(gl);

const chunk = createChunk();

const { positions, texCoords, indices } = generateMesh(chunk);

const { positionBuffer, texCoordBuffer, indexBuffer, positionAttributeLocation, texCoordAttributeLocation } = createBuffers(gl, positions, texCoords, indices, shaderProgram)

const textureImage = new Image();
textureImage.src = "tex.png";
textureImage.onload = () => {// Create a WebGL texture object
  makeTexture(gl, textureImage);
  renderLoop();
};

function renderLoop() {
    const textureUniformLocation = gl.getUniformLocation(shaderProgram, "uTexture");
    gl.uniform1i(textureUniformLocation, 0);
    drawScene(gl, shaderProgram, positionBuffer, texCoordBuffer, indexBuffer, indices, positionAttributeLocation, texCoordAttributeLocation);
    requestAnimationFrame(renderLoop);
  }