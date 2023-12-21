import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import './style.css'
import { setConstantValue } from 'typescript';

// ==============================|| INCOME AREA CHART ||============================== //

const CranePhysics = (props) => {
    const { } = props

    const [v, setV] = useState(0);
    const [x, setX] = useState(0);
    const [movingR, setMovingR] = useState(false);
    const [movingL, setMovingL] = useState(false);
    const [remaining, setRemaining] = useState(false);
    const [R, setR] = useState(false);
    const [L, setL] = useState(false);

    let VMax = 2
    let acceleration = 0.1
    let scenarioTimeInterval = 10
    let deltaT = 0.2

    useEffect(() => {
        let interval;

        const handleKeyDown = (event) => {
            setRemaining(false)
            if (event.key === 'ArrowRight') {
                setMovingR(true);
                setMovingL(false)
            } else if (event.key === 'ArrowLeft') {
                setMovingL(true);
                setMovingR(false);
            }
        };

        const handleKeyUp = (event) => {
            setRemaining(true)
            if (event.key === 'ArrowRight') {
                // setMovingR(false);
            } else if (event.key === 'ArrowLeft') {
                // setMovingL(false);
            }
        };

        const updateCounterR = () => {
            if (movingR) {
                if (!remaining) {
                    setV((prevV) => {
                        if (prevV < VMax) {
                            const velocity = prevV + acceleration * deltaT;
                            const xDisplacement = prevV * deltaT + 0.5 * acceleration * deltaT * deltaT;
                            setX((prevX) => prevX + xDisplacement);
                            return velocity;
                        } else {
                            const velocity = VMax
                            const xDisplacement = VMax * (deltaT)
                            setX((prevX) => {
                                return prevX + xDisplacement
                            });
                            return velocity
                        }
                    });
                } else {
                    setV((prevV) => {
                        if (prevV > 0) {
                            const velocity = prevV - acceleration * deltaT;
                            const xDisplacement = prevV * deltaT + 0.5 * acceleration * deltaT * deltaT;
                            setX((prevX) => prevX + xDisplacement);
                            return velocity;
                        } else {
                            const velocity = 0
                            return velocity
                        }
                    });
                }
            }
        };

        const updateCounterL = () => {
            if (movingL) {
                if (!remaining) {
                    setV((prevV) => {
                        if (prevV < VMax) {
                            const velocity = prevV + acceleration * deltaT;
                            const xDisplacement = prevV * deltaT + 0.5 * acceleration * deltaT * deltaT;
                            setX((prevX) => prevX - xDisplacement);
                            return velocity;
                        } else {
                            const velocity = VMax
                            const xDisplacement = VMax * (deltaT)
                            setX((prevX) => {
                                return prevX - xDisplacement
                            });
                            return velocity
                        }
                    });
                } else {
                    setV((prevV) => {
                        if (prevV > 0) {
                            const velocity = prevV - acceleration * deltaT;
                            const xDisplacement = prevV * deltaT + 0.5 * acceleration * deltaT * deltaT;
                            setX((prevX) => prevX - xDisplacement);
                            return velocity;
                        } else {
                            const velocity = 0
                            return velocity
                        }

                    });
                }
            }
        }

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        const keyboardTracing = () => {
            updateCounterR()
            updateCounterL()
        }

        interval = setInterval(keyboardTracing, scenarioTimeInterval);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
            clearInterval(interval);
        };
    }, [movingR, movingL, remaining]);

    return (
        <>
            <div>
                <p>Contador: {v}</p>
                <p>X: {x}</p>
                <p>Estado: {movingR ? 'Acelerando' : 'Decelerando'}</p>
            </div>

            <div class="base">
                <motion.div
                    className='holder'
                    style={{
                        x: x,
                    }}
                >
                    <motion.div
                        className='thread'
                        style={{
                            height: 100,
                        }}>
                        <div class="knob"></div>
                        <div class="pendulum"></div>
                    </motion.div>

                    {/* <div class="thread">
                    </div> */}

                    <div class="shadow"></div>

                </motion.div>
                {/* <div class="base"> */}
                {/* </div> */}
            </div>
        </>
    );
};




export default CranePhysics;
