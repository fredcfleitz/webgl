// Utility function to multiply two 4x4 matrices
export function multiplyMatrices(a, b) {
    const result = new Float32Array(16);
  
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        result[j * 4 + i] = 0.0;
        for (let k = 0; k < 4; k++) {
          result[j * 4 + i] += a[k * 4 + i] * b[j * 4 + k];
        }
      }
    }
  
    return result;
  }
  
  export function perspective(fieldOfView, aspect, near, far) {
    const f = 1.0 / Math.tan(fieldOfView / 2);
    const nf = 1 / (near - far);
    const result = new Float32Array(16);

    result[0] = f / aspect;
    result[5] = f;
    result[10] = -(far + near) / (far - near); // Updated
    result[11] = -1;
    result[14] = -(2 * far * near) / (far - near); // Updated
    result[15] = 0;

    return result;
}

  
  // Utility function to create a translation matrix
  export function translate(x, y, z) {
    return new Float32Array([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      x, y, z, 1,
    ]);
  }
  
  // Utility function to create a rotation matrix around the X axis
  export function rotateX(angle) {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
  
    return new Float32Array([
      1, 0, 0, 0,
      0, c, s, 0,
      0, -s, c, 0,
      0, 0, 0, 1,
    ]);
  }
  
  // Utility function to create a rotation matrix around the Y axis
  export function rotateY(angle) {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
  
    return new Float32Array([
      c, 0, -s, 0,
      0, 1, 0, 0,
      s, 0, c, 0,
      0, 0, 0, 1,
    ]);
  }