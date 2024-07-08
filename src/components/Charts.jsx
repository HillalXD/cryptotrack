import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import Error from '../pages/error/Error'
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
import moment from 'moment/moment';
import Loading from './Loading';

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


function Charts(props) {

    const { isPending, error, data } = useQuery({
        queryKey: ['charts'],
        queryFn: async () => {
          const response = await axios.get(`https://api.coincap.io/v2/assets/${props.coin}/history?interval=d1`)
          return response.data.data
        }
    })

    if (isPending) return <Loading />

    if (error) return <Error />

    const chartData = data.map(value => ({
        x: value.time,
        y: value.priceUsd
    }))

    console.log(chartData)

    const options = { 
        responsive: true
    }

    const dataForChart = {
        labels: chartData.map( value => moment(value.x).format("DD-MM-YYYY")),
        datasets: [
            {
                fill: true,
                label: props.coin,
                data: chartData.map( value => value.y)
            }
        ]
    }

    return (
      <div>
        <Line options={options} data={dataForChart} />
      </div>
  )
}

export default Charts