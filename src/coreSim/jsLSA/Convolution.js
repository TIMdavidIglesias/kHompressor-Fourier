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

export const outputConvolutionRT = (u1, u0, output, Y, transferFunction, At, nIteration) => {
  const maxIterations = output.length;
  const deltaT = At;

  const Zeta = transferFunction.Zeta;
  const Wn = transferFunction.Wn;
  const K = 1 * transferFunction.K;
  const damping = transferFunction.damping;

  let yTemp = []
  let outputTemp = []

  let newOutputRow = []
  let newOutput = [...output]

  let u = 0// u1 - u0;

  if (nIteration > maxIterations) {
    newOutput.shift()
    newOutput.push(new Array(maxIterations).fill(0))
  }
  const fLimit = (nIteration > maxIterations) ? maxIterations : nIteration

  for (let r = 0; r < fLimit; r++) {
    if (nIteration === 1) {
      u = 0;
    } else {
      u = u1 - u0;
    }

    if (nIteration > maxIterations) {

      newOutput[r].shift()



      // if(r< fLimit-1){
      const t = (nIteration + r - maxIterations)//*deltaT
      newOutput[r][maxIterations - 1] = t// K * (u - u * ((Math.exp(-Zeta * Wn * t)) * (Math.cos(Wn * damping * t) + (Zeta / damping) * Math.sin(Wn * damping * t))))
      // }else{
      //   newOutput[r][maxIterations - 1] = 0
      // }

      // newOutput[r][maxIterations-2]=r
    } else {
      const t = r//*deltaT
      newOutput[r][fLimit-1] = t//K * (u - u * ((Math.exp(-Zeta * Wn * t)) * (Math.cos(Wn * damping * t) + (Zeta / damping) * Math.sin(Wn * damping * t))))
    }

  }

  // for (let r = 0; r < fLimit; r++) {
  //   if (nIteration === 1) {
  //     u = 0;
  //   } else {
  //     u = u1 - u0;
  //   }


  //   const t = (r) * deltaT
  //   if (nIteration > maxIterations - r) {
  //     output[r].shift()

  //     const tY = K * (u - u * ((Math.exp(-Zeta * Wn * t)) * (Math.cos(Wn * damping * t) + (Zeta / damping) * Math.sin(Wn * damping * t))))
  //     output[r].push(tY >= 0.01 ? tY : 0.01)

  //     // for c
  //   } else {
  //     const tY = K * (u - u * ((Math.exp(-Zeta * Wn * t)) * (Math.cos(Wn * damping * t) + (Zeta / damping) * Math.sin(Wn * damping * t))))

  //     output[r][fLimit] = tY
  //   }

  //   // }


  //   // if (r === nIterations) {
  //   // const t = (nIterations) * deltaT;
  //   // newOutput[r].push(K * (u - u * ((Math.exp(-Zeta * Wn * t)) * (Math.cos(Wn * damping * t) + (Zeta / damping) * Math.sin(Wn * damping * t)))));

  //   // const t = (c-r) * deltaT;
  //   // newOutput[r].push(K * (u - u * ((Math.exp(-Zeta * Wn * t)) * (Math.cos(Wn * damping * t) + (Zeta / damping) * Math.sin(Wn * damping * t)))));
  // }
  // // } else {
  // // const t = (nIterations-r) * deltaT;
  // // newOutput[r].push(K * (u - u * ((Math.exp(-Zeta * Wn * t)) * (Math.cos(Wn * damping * t) + (Zeta / damping) * Math.sin(Wn * damping * t)))));
  // // newOutput[nIterations].push(0)
  // // }


  // // Y.push(yTemp)
  // // yTemp = []
  let instantY = 0
  
  // for (let n = 0; n < maxIterations; n++) {
    instantY = _columnOutputReader(newOutput,maxIterations)
  // }


  return {
    Y: instantY,
    output: newOutput,
  }
  // return _columnOutputReader(Y, nIterations);
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

  return y
}
