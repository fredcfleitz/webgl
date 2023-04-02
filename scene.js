import { resizeCanvas } from "./util.js";
import { translate, rotateX, rotateY, perspective, multiplyMatrices } from './transforms.js';

// Set up the projection matrix
const fieldOfViewInDegrees = 45;
const zNear = 0.1;
const zFar = 100.0;

export function drawScene(gl, shaderProgram, numCubes, cubePositions, colorBuffer, vertexBuffer, indexBuffer, cubeColors, cubeIndices) {
  
    resizeCanvas(gl);
  
    // Clear the canvas
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  
    // Update the rotation based on elapsed time
    const rotationAngle = performance.now() / 1000; // Rotate based on elapsed time
  
    // Locate the uniform locations for the matrices
    const modelViewMatrixLocation = gl.getUniformLocation(shaderProgram, 'uModelViewMatrix');
    const projectionMatrixLocation = gl.getUniformLocation(shaderProgram, 'uProjectionMatrix');
    
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const fieldOfView = (fieldOfViewInDegrees * Math.PI) / 180; // in radians
    const projectionMatrix = perspective(fieldOfView, aspect, zNear, zFar);

    for (let i = 0; i < numCubes; i++) {
      // Set up the model-view matrix for each cube
      const modelViewMatrix = translate(...cubePositions[i]);
      const modelViewMatrixRotatedY = multiplyMatrices(modelViewMatrix, rotateY(rotationAngle - i));
      const finalModelViewMatrix = multiplyMatrices(modelViewMatrixRotatedY, rotateX(rotationAngle - i));
    
      // Pass the matrices to the shader program
      gl.uniformMatrix4fv(modelViewMatrixLocation, false, finalModelViewMatrix);
      gl.uniformMatrix4fv(projectionMatrixLocation, false, projectionMatrix);

      const colorOffset = i % cubeColors.length;
      gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
      gl.bufferSubData(gl.ARRAY_BUFFER, colorOffset * Float32Array.BYTES_PER_ELEMENT, new Float32Array(cubeColors.slice(colorOffset, colorOffset + 3)));
    
      // Draw the cube
      gl.drawElements(gl.TRIANGLES, cubeIndices.length, gl.UNSIGNED_SHORT, 0);
    }

}