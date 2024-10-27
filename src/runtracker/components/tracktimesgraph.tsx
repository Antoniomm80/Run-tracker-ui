import React from 'react';


import {CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip,} from 'chart.js';
import {Line} from 'react-chartjs-2';
import {TimeProps} from "../domain/time";

type TrackTimesGraphProps = {
    times: TimeProps[];
}

const buildDate = (date: any): Date => {
    return new Date(date);
}


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const TrackTimesGraph: React.FC<TrackTimesGraphProps> = ({times}) => {
    let graphData: any[] = times.map((time) => {
        return {id: 'graph', x: buildDate(time.trainingDate), y: time.duration / 60}
    });
    graphData = graphData.sort((a, b) => {
        if (a.x < b.x) return -1
        return a.x > b.x ? 1 : 0
    }) || [];
    graphData = graphData.slice(-10);
    const options = {
        responsive: true,
    };

    const labels = graphData.map(d => d.x.getDate() + '/' + (d.x.getMonth() + 1) + '/' + d.x.getFullYear());
    const data = {
        labels,
        datasets: [
            {
                label: 'Tiempos',
                data: graphData.map(d => d.y),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ]
    };
    return <Line options={options} data={data}/>;
}
export default TrackTimesGraph;