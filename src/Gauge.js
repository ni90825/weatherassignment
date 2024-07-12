/* eslint-disable no-unused-vars */
import React,{useEffect,useRef} from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);


const Gauge = ({value=0}) => {

    const textCenterPluginn = {
        id: 'textCenterPluginn',
        beforeDraw: function (chart) {
          const { width } = chart;
          const { height } = chart;
          const ctx = chart.ctx;
          ctx.restore();
          const fontSize = (height / 114).toFixed(2);
          ctx.font = `${12}px poppins`;
          ctx.textBaseline = 'middle';
      
          let text = "UV index";
          const textX = width/3.2;
          const textY = height / 1.5;
      
          ctx.fillText(text,textX,textY);
          ctx.save();
        },
      };

  const data = {
    datasets: [
      {
        data: [value, 10 - value],
        backgroundColor: ['#5c9ce5', '#dedddd'],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    rotation: 270,
    circumference: 180,
    cutout: '75%',
    plugins: {
        // textCenterPlugin : {
        //     fontColor: 'green', 
        //   },
        textCenterPlugin:textCenterPluginn,
      tooltip: {
        enabled: false,
      },
    },
  };

  return <Doughnut data={data} options={options} plugins={[textCenterPluginn]} />;
};

export default Gauge;
