export const outputConvolution = (inputs, transferFunction, At) => {
  const nIterations = inputs.length;
  const deltaT = At;

  const Zeta = transferFunction.Zeta;
  const Wn = transferFunction.Wn;
  const K = transferFunction.K;
  const damping = transferFunction.damping;

  let Y = []
  let yTemp = []

  let u = 0
  let u0 = 0
  let u1 = 0

  for (let r = 0; r < nIterations; r++) {
    u1 = inputs[r];
    u = u1;

    if (r > 0) {
      u0 = inputs[r - 1];
      if (u1 !== u0) {
        u = u1 - u0;
      } else {
        u = 0;
      }
    }

    for (let c = 0; c < nIterations; c++) {
      if (c > r) {
        const t = (c - r) * deltaT;
        yTemp.push(K * (u - u * ((Math.exp(-Zeta * Wn * t)) * (Math.cos(Wn * damping * t) + (Zeta / damping) * Math.sin(Wn * damping * t)))));
      } else {
        yTemp.push(0);
      }
    }

    Y.push(yTemp)
    yTemp = []
  }

  return _columnOutputReader(Y, nIterations);
}

export const outputConvolutionRT = (input, output, Y, transferFunction, At) => {
  
}

const _columnOutputReader = (y0, nIterations) => {
  const y = [];
  let col_sum = 0;

  for (let i = 0; i < nIterations; i++) {
    for (let j = 0; j < nIterations; j++) {
      col_sum += y0[j][i];
      // console.log(`cs:${col_sum}`)
      // console.log(`x:${col_sum}`)
    }
    Number.isNaN(col_sum) && console.log(y0[i])
    // console.log(y0[i].length)
    y.push(col_sum);
    col_sum = 0;
  }

  return parseFloat(y)
}
