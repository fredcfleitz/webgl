import { resizeCanvas } from "./util.js";
import { translate, rotateX, rotateY, perspective, multiplyMatrices } from './transforms.js';
import { fillChunk, generateMesh } from "./chunk.js";

// Set up the projection matrix
const fieldOfViewInDegrees = 45;
const zNear = 0.1;
const zFar = 100.0;

export function drawScene(gl, shaderProgram, positionBuffer, texCoordBuffer, indexBuffer, indices, positionAttributeLocation, texCoordAttributeLocation) {
  resizeCanvas(gl);

  // Clear the canvas
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  // Enable depth testing
  gl.enable(gl.DEPTH_TEST);

  const aspectRatio = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const projectionMatrix = perspective(fieldOfViewInDegrees, aspectRatio, zNear, zFar);

  const modelViewMatrix = translate(0, 0, -5);
  const modelViewMatrixRotated = multiplyMatrices(rotateX(-30), rotateY(-45), modelViewMatrix);

  const uProjectionMatrixLocation = gl.getUniformLocation(shaderProgram, 'uProjectionMatrix');
  gl.uniformMatrix4fv(uProjectionMatrixLocation, false, projectionMatrix);

  const uModelViewMatrixLocation = gl.getUniformLocation(shaderProgram, 'uModelViewMatrix');
  gl.uniformMatrix4fv(uModelViewMatrixLocation, false, modelViewMatrixRotated);

  // Bind the position buffer, set up the vertex attribute pointer, and enable the attribute
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(positionAttributeLocation);

  // Bind the texture coordinates buffer, set up the vertex attribute pointer, and enable the attribute
  gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
  gl.vertexAttribPointer(texCoordAttributeLocation, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(texCoordAttributeLocation);

  // Bind the index buffer
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

  // Draw the elements
  gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
}

