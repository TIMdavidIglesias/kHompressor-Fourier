import React from 'react';

// ==============================|| INCOME AREA CHART ||============================== //

const RealTimeSimulator = (props) => {
    const redirectToBlankPage = () => {
        // Abrir una nueva ventana o pestaña en blanco
        window.open('https://khompressor.timdevelopers.com/xsimulator/', '_blank');
      };
    return (
        <>
      <button onClick={redirectToBlankPage}>Open RealTime Simulator</button>

        </>
    );
};

export default RealTimeSimulator;
