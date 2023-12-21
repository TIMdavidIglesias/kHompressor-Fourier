import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

// ==============================|| INCOME AREA CHART ||============================== //

const OscillatorChart = (props) => {
  const { selectedOscillatorRef, oscillators, totalsInput, lSimOutput, autoSimulate } = props

  const [options, setOptions] = useState({});
  const [series, setSeries] = useState({
    datasets: [{
      data: [0, 0]
    }]
  })

  useEffect(() => {
    const selOsc = oscillators.find(e => e.ref === selectedOscillatorRef)

    setOptions({
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: `${selOsc.name} Vs. Total`,
        },
      },
    });

    let datasets = [
      {
        fill: true,
        label: selOsc.name,
        data: (selOsc.points || []).map((i) => i) || [0],
        borderColor: 'rgb(0, 0, 200)',
        backgroundColor: 'rgba(0, 20, 200, 0.4)',
        pointStyle: 'circle', //  ('circle', 'triangle', 'rect', 'rectRot', etc.)
        pointRadius: 1,
        // backgroundColor: 'rgba(75,192,192,1)',
      },
      {
        fill: true,
        label: 'Total',
        data: (totalsInput || []).map((i) => i) || [0],
        borderColor: 'rgb(0, 200, 0)',
        backgroundColor: 'rgba(20, 255, 0, 0.3)',
        pointStyle: 'circle', //  ('circle', 'triangle', 'rect', 'rectRot', etc.)
        pointRadius: 1,
        // backgroundColor: 'rgba(75,192,192,1)',
      },
    ]

    if (autoSimulate) datasets.push({
      fill: true,
      label: 'lSim',
      data: (lSimOutput || []).map((i) => i) || [0],
      borderColor: 'rgb(0, 0, 0)',
      backgroundColor: 'rgba(50, 50, 50, 0.3)',
      pointStyle: 'circle', //  ('circle', 'triangle', 'rect', 'rectRot', etc.)
      pointRadius: 2,
      // backgroundColor: 'rgba(75,192,192,1)',
    })

    setSeries({
      labels: (selOsc.points || []).map((i, j) => j),
      datasets: datasets,
    })
  }, [selectedOscillatorRef, oscillators, totalsInput, autoSimulate])

  return <Line options={options} data={series} />;
};

OscillatorChart.propTypes = {
  slot: PropTypes.string
};

export default OscillatorChart;
