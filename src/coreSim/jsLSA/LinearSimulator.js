import { outputConvolution, outputConvolutionRT } from './Convolution';
import SecondOrder from './SecondOrder'

export default class LinearSimulator {
  constructor(Wn, Zeta, K, maxTime, sampleRate, GRAVITY) {
    // transfer function
    this.Wn = Wn;
    this.Zeta = Zeta;
    this.K = K;
    this.transferFunction = new SecondOrder(Wn, Zeta, K)
    this.damping = this.transferFunction.damping;

    // consts
    this.GRAVITY = GRAVITY;
    this.At = maxTime / sampleRate;

    this.step_input = [];
    this.sim_time = maxTime * sampleRate;

    this.input = []
    this.output = []
    this.Y = []

    this.realTime = false;
    this.nIteration = 0
    this.realTimeMaxSamples = 100
  }

  getTransferFunctionCoefs() {
    return {
      Wn: this.Wn,
      Zeta: this.Zeta,
      K: this.K,
    }
  }

  setTransferFunctionData(propName, value) {
    this[propName] = value;
  }

  linearSimulation(inputData) {
    this.input = inputData;
    this.output = outputConvolution(inputData, this.transferFunction, this.At);
  }

  startRealTime = () => {
    for (let i = 0; i <this.realTimeMaxSamples; i++) {
      this.output[i] = new Array(this.realTimeMaxSamples).fill(0);
      // this.Y.push(0);
    }
  }

  linearSimulationRealTime(input) {
    this.nIteration+=1

    if (!this.realTime) {
      this.startRealTime();
      this.realTime= true;
    }

    if(this.nIteration > this.realTimeMaxSamples){
      this.input.shift();
    }
    this.input.push(input);

    const outputRTData = outputConvolutionRT(input, this.input[this.input.length - 2] || 0, this.output, this.Y, this.transferFunction, this.At, this.nIteration)
    this.Y = outputRTData.Y
    this.output = outputRTData.output

    // console.log(outputRTData)

    return this.Y
    // for (let i = 0; i < inputN; i++) {
    //   u1 = this.input[i];
    //   u = u1;

    //   if (i > 0) {
    //     u0 = this.input[i - 1];
    //     if (u1 !== u0) {
    //       u = u1 - u0;
    //       // const delta_t_sbs = (inputN - i) * this.At;
    //       // stepOutput += this.SecondOrder.SecondOrderStepResponse(u, delta_t_sbs);
    //       stepOutput += (outputConvolution(newArrayData, this.transferFunction, this.At));
    //     } else {
    //       // stepOutput += 0;
    //     }
    //   } else {
    //     // const delta_t_sbs = (inputN - i) * this.At;
    //     // stepOutput += this.SecondOrder.SecondOrderStepResponse(u, delta_t_sbs);
    //     // stepOutput += (this.K * (u - u * ((Math.exp(-this.Zeta * this.Wn * delta_t_sbs)) * (Math.cos(this.Wn * this.damping * delta_t_sbs) + (this.Zeta / this.damping) * Math.sin(this.Wn * this.damping * delta_t_sbs)))));
    //     stepOutput += (outputConvolution(newArrayData, this.transferFunction, this.At));
    //   }
    // }

    // this.input = newArrayData

    // return stepOutput;

  }
}