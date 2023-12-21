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

  linearSimulationRealTime(input) {
    let u1 = 0;
    let u0 = 0;
    let u = 0;

    const newArrayData = [...this.input, input]

    // if (this.input.length === 100) {
    //   this.input.shift();
    // }

    this.input.push(input);

    const inputN = this.input.length;
    let stepOutput = 0;

    const outputRT = outputConvolutionRT(newArrayData, this.output, this.Y, this.transferFunction, this.At)
    console.log(outputRT)
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

    this.input = newArrayData

    return stepOutput;
  }
}