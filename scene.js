import { resizeCanvas } from "./util.js";
import { translate, rotateX, rotateY, perspective, multiplyMatrices } from './transforms.js';

// Set up the projection matrix
const fieldOfViewInDegrees = 45;
const zNear = 0.1;
const zFar = 100.0;

export function drawScene(gl, programInfo, vertexBuffer, indexBuffer, indicesLength, texture) {
  
    resizeCanvas(gl);
  
    // Clear the canvas
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  
    const fieldOfView = 45 * Math.PI / 180;
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 100.0;
    const projectionMatrix = perspective(fieldOfView, aspect, zNear, zFar);

    let modelViewMatrix = translate(-1,-1,-2.0);
    modelViewMatrix = multiplyMatrices(rotateY(-0.5), modelViewMatrix);
    modelViewMatrix = multiplyMatrices(rotateX(0.5), modelViewMatrix);
    const rotationMatrix = rotateX(0);
    const rotationMatrixY = rotateY(0);
    
    const modelViewMatrixWithRotationX = multiplyMatrices(rotationMatrix, modelViewMatrix);
    const modelViewMatrixWithRotation = multiplyMatrices(rotationMatrixY, modelViewMatrixWithRotationX);

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.vertexAttribPointer(programInfo.attribLocations.vertexPosition, 3, gl.FLOAT, false, 20, 0);
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
    
    gl.vertexAttribPointer(programInfo.attribLocations.textureCoord, 2, gl.FLOAT, false, 20, 12);
    gl.enableVertexAttribArray(programInfo.attribLocations.textureCoord);
    


    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

    gl.useProgram(programInfo.program);

    gl.uniformMatrix4fv(programInfo.uniformLocations.modelViewMatrix, false, modelViewMatrixWithRotation);
    gl.uniformMatrix4fv(programInfo.uniformLocations.projectionMatrix, false, projectionMatrix);
    gl.uniform4fv(programInfo.uniformLocations.color, [0.5, 0.5, 0.5, 1.0]);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.uniform1i(programInfo.uniformLocations.uSampler, 0);


    gl.drawElements(gl.TRIANGLES, indicesLength, gl.UNSIGNED_SHORT, 0);
}