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

const SimDataPlot = (props) => {
  const { dataPlot, plotLabel } = props

  const [options, setOptions] = useState({});
  const [series, setSeries] = useState({
    datasets: [{
      data: [0, 0]
    }]
  })

  useEffect(() => {
    setOptions({
      responsive: true,
      animation:false,
      plugins: {
        legend: {
          position: 'top',
        },
      },
    });

    let datasets = [
      {
        fill: true,
        label: plotLabel,
        data: (dataPlot || []).map((i) => i) || [0],
        pointRadius: 1,

        borderColor: 'rgb(0, 0, 200)',
        backgroundColor: 'rgba(0, 20, 200, 0.4)',
        pointStyle: 'circle', //  ('circle', 'triangle', 'rect', 'rectRot', etc.)
        borderWidth: 1
        // backgroundColor: 'rgba(75,192,192,1)',
      },
    ]

    setSeries({
      labels: (dataPlot || []).map((i, j) => j),
      datasets: datasets,
    })
  }, [dataPlot])

  return <Line options={options} data={series} height={100} />;
};

SimDataPlot.propTypes = {
  slot: PropTypes.string
};

export default SimDataPlot;
