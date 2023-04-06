export function makeTexture(gl, textureImage) {
  const texture = gl.createTexture();
  
  // Bind the texture object to the gl.TEXTURE_2D target
  gl.bindTexture(gl.TEXTURE_2D, texture);
  
  // Configure texture parameters
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  
  // Upload the image data to the texture object
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureImage);  

  // Activate a texture unit (e.g., gl.TEXTURE0)
  gl.activeTexture(gl.TEXTURE0);

  // Bind the texture object to the activated texture unit
  gl.bindTexture(gl.TEXTURE_2D, texture);
}