import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import './style.css'
import { setConstantValue } from 'typescript';

// ==============================|| INCOME AREA CHART ||============================== //

const CranePhysics = (props) => {
    const { setVPlot, setXPlot } = props

    const [v, setV] = useState(0);
    const [x, setX] = useState(0);
    const [Y, setY] = useState(300);
    const [movingR, setMovingR] = useState(false);
    const [movingL, setMovingL] = useState(false);
    const [remaining, setRemaining] = useState(false);


    
    let VMax = 5
    let acceleration = 0.8
    let scenarioTimeInterval = 5
    let deltaT = 0.1

    useEffect(() => {
        let interval;

        const handleKeyDown = (event) => {
            if (event.key === 'ArrowRight') {
                setRemaining(false)
                setMovingR(true);
                setMovingL(false)
            } else if (event.key === 'ArrowLeft') {
                setRemaining(false)
                setMovingL(true);
                setMovingR(false);
            } else if (event.key === 'ArrowUp') {
                setY((prevY) => prevY <= 100 ? 100 : prevY - 10)
            } else if (event.key === 'ArrowDown') {
                setY((prevY) => {
                    return prevY >= 1000 ? 1000 : prevY + 10
                })
            }
        };

        const handleKeyUp = () => {
            setRemaining(true)
        };

        const updateCounterR = () => {
            if (movingR) {
                if (!remaining) {
                    setV((prevV) => {
                        if (prevV < VMax) {
                            const velocity = prevV + acceleration * deltaT;
                            const xDisplacement = prevV * deltaT + 0.5 * acceleration * deltaT * deltaT;
                            setX((prevX) => {
                                setXPlot((prevXPlot) => [...prevXPlot, prevX + xDisplacement])
                                return prevX + xDisplacement
                            });
                            setVPlot((prevVPlot) => [...prevVPlot, velocity])
                            return velocity;
                        } else {
                            const velocity = VMax
                            const xDisplacement = VMax * (deltaT)
                            setX((prevX) => {
                                setXPlot((prevXPlot) => [...prevXPlot, prevX + xDisplacement])
                                return prevX + xDisplacement
                            });
                            setVPlot((prevVPlot) => [...prevVPlot, velocity])
                            return velocity
                        }
                    });
                } else {
                    setV((prevV) => {
                        if (prevV > 0) {
                            const velocity = prevV - acceleration * deltaT;
                            const xDisplacement = prevV * deltaT + 0.5 * acceleration * deltaT * deltaT;
                            setX((prevX) => {
                                setXPlot((prevXPlot) => [...prevXPlot, prevX + xDisplacement])
                                return prevX + xDisplacement
                            });
                            setVPlot((prevVPlot) => [...prevVPlot, velocity])
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
                        if (prevV > -VMax) {
                            const velocity = prevV - acceleration * deltaT;
                            const xDisplacement = prevV * deltaT + 0.5 * acceleration * deltaT * deltaT;
                            setX((prevX) => {
                                setXPlot((prevXPlot) => [...prevXPlot, prevX + xDisplacement])
                                return prevX + xDisplacement
                            });
                            setVPlot((prevVPlot) => [...prevVPlot, velocity])
                            return velocity;
                        } else {
                            const velocity = -VMax
                            const xDisplacement = VMax * (deltaT)
                            setX((prevX) => {
                                setXPlot((prevXPlot) => [...prevXPlot, prevX + xDisplacement])
                                return prevX - xDisplacement
                            });
                            setVPlot((prevVPlot) => [...prevVPlot, velocity])
                            return velocity
                        }
                    });
                } else {
                    setV((prevV) => {
                        if (prevV < 0) {
                            const velocity = prevV + acceleration * deltaT;
                            const xDisplacement = prevV * deltaT + 0.5 * acceleration * deltaT * deltaT;
                            setX((prevX) => {
                                setXPlot((prevXPlot) => [...prevXPlot, prevX + xDisplacement])
                                return prevX + xDisplacement
                            });
                            setVPlot((prevVPlot) => [...prevVPlot, velocity])
                            return velocity;
                        } else {
                            const velocity = 0
                            // setVPlot((prevVPlot)=> [...prevVPlot, velocity])
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
            {/* <div>
                <p>Contador: {v}</p>
                <p>X: {x}</p>
                <p>Estado: {movingR ? 'Acelerando' : 'Decelerando'}</p>
            </div> */}

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
                            height: Y,
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
