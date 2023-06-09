export function initShaders(gl) {
    //vertex shader
    const vertexShaderSource = `
    attribute vec4 aVertexPosition;
  
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    attribute vec2 aTextureCoord;
    varying highp vec2 vTextureCoord;
  
    void main() {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      vTextureCoord = aTextureCoord;
    }
    `;

    //fragment shader
    const fragmentShaderSource = `
    precision mediump float;

    varying vec2 vTextureCoord;
    uniform sampler2D uSampler;
  
    void main() {
      gl_FragColor = texture2D(uSampler, vTextureCoord);
    }
    `;

    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(vertexShader));
        gl.deleteShader(vertexShader);
    }

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(fragmentShader));
        gl.deleteShader(fragmentShader);
    }

    //link shaders
    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    return shaderProgram;
}