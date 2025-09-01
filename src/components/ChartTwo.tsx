import { ApexOptions } from 'apexcharts';
import React from 'react';
import ReactApexChart from 'react-apexcharts';

const options: ApexOptions = {
  colors: ['#3C50E0', '#80CAEE'],
  grid: {
    show: true, // Show the grid
    borderColor: '#ffffff3d',
    strokeDashArray: 8,
    position: 'back',
    xaxis: {
      lines: {
        show: false,
      },
    },
    yaxis: {
      lines: {
        show: false,
      },
    },
  },
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    type: 'bar',
    height: 335,
    stacked: true,
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },

  responsive: [
    {
      breakpoint: 1536,
      options: {
        plotOptions: {
          bar: {
            borderRadius: 0,
            columnWidth: '25%',
          },
        },
      },
    },
  ],
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 0,
      columnWidth: '25%',
      borderRadiusApplication: 'end',
      borderRadiusWhenStacked: 'last',
    },
  },
  dataLabels: {
    enabled: false,
  },

  xaxis: {
    categories: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
  },
  legend: {
    position: 'top',
    horizontalAlign: 'left',
    fontFamily: 'Satoshi',
    fontWeight: 500,
    fontSize: '14px',
  },
  fill: {
    opacity: 1,
  },
};

const ChartTwo: React.FC = () => {
  const state = {
    series: [
      {
        name: 'Trades',
        data: [44, 55, 41, 67, 22, 43, 65],
      },
      {
        name: 'Interests',
        data: [13, 23, 20, 8, 13, 27, 15],
      },
    ],
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-gray-950 xl:col-span-4">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <div className="relative z-20 inline-block">
            <select
              name="#"
              id="#"
              className="relative z-20 inline-flex appearance-none bg-transparent py-1 pl-3 pr-8 text-sm font-medium outline-none"
            >
              <option value="">This Week</option>
              <option value="">Last Week</option>
            </select>
          </div>
        </div>
      </div>

      <div id="chartTwo">
        <ReactApexChart
          options={options}
          series={state.series}
          type="bar"
          height={400}
        />
      </div>
    </div>
  );
};

export default ChartTwo;
