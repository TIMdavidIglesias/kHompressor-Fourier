
class SecondOrder {
    constructor(Wn, Zeta, K) {
        this.Wn = Wn;
        this.Zeta = Zeta;
        this.K = K;
        this.damping = Math.sqrt(1 - (this.Zeta ** 2));
        this.At = 1 / 1000;
    }

    secondOrderStepResponse = (u, t) => {
        const so_step_response = u - u * this.K * (
            (Math.exp(-this.Zeta * this.Wn * t)) *
            (Math.cos(this.Wn * this.damping * t) + (this.Zeta / this.damping) * Math.sin(this.Wn * this.damping * t))
        );
        return so_step_response;
    }
}