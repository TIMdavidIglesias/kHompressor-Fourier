export default class Physics {

    constructor(transferFunction, input, output, GRAVITY) {
        this.GRAVITY = GRAVITY
        this.Zeta = transferFunction.Zeta;
        this.Wn = transferFunction.Wn;
        this.K = transferFunction.K;
        this.damping = transferFunction.damping;
        this.input = input;
        this.output = output;

        this.L = GRAVITY / (this.Wn ** 2);

        // angles
        this.angles = []
    }

    calculateFullAngles(){
        for (let i=0; i < this.output.length; i++){
            this.angles.push(Math.atan(this.output[i]/this.L))
        }
    }
}