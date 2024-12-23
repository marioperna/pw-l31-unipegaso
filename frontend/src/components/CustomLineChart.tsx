import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Page A', uv: 400, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 300, pv: 4567, amt: 2400 },
    { name: 'Page C', uv: 300, pv: 1398, amt: 2400 },
    { name: 'Page D', uv: 200, pv: 9800, amt: 2400 },
    { name: 'Page E', uv: 278, pv: 3908, amt: 2400 },
    { name: 'Page F', uv: 189, pv: 4800, amt: 2400 },
    { name: 'Page G', uv: 239, pv: 3800, amt: 2400 },
    { name: 'Page H', uv: 349, pv: 4300, amt: 2400 },
    { name: 'Page I', uv: 349, pv: 4300, amt: 2400 },
    { name: 'Page J', uv: 349, pv: 4300, amt: 2400 },
    { name: 'Page K', uv: 349, pv: 4300, amt: 2400 },
    { name: 'Page L', uv: 349, pv: 4300, amt: 2400 },
    { name: 'Page M', uv: 349, pv: 4300, amt: 2400 },
    { name: 'Page N', uv: 349, pv: 4300, amt: 2400 },
    { name: 'Page O', uv: 349, pv: 4300, amt: 2400 },
    { name: 'Page P', uv: 349, pv: 4300, amt: 2400 },
    { name: 'Page Q', uv: 349, pv: 4300, amt: 2400 },
    { name: 'Page R', uv: 349, pv: 4300, amt: 2400 },
    { name: 'Page S', uv: 349, pv: 4300, amt: 2400 },
    { name: 'Page T', uv: 349, pv: 4300, amt: 2400 },
    { name: 'Page U', uv: 349, pv: 4300, amt: 2400 },
    { name: 'Page V', uv: 349, pv: 4300, amt: 2400 },
    { name: 'Page W', uv: 349, pv: 4300, amt: 2400 },
    { name: 'Page X', uv: 349, pv: 4300, amt: 2400 },
    { name: 'Page Y', uv: 349, pv: 4300, amt: 2400 },
    { name: 'Page Z', uv: 349, pv: 4300, amt: 2400 }
    // Aggiungi altri dati qui se necessario
];

// ({ style }: {
//     style: {
//     responsiveContainerWidth: string,
//     responsiveContainerHeight: number,
//     lineChartData: any,
//     lineChartMargin: {
//         top: number,
//         right: number,
//         bottom: number,
//         left: number
//     },
//     lineType: string,
//     lineDataKey: string,
//     lineStroke: string,
//     cartesianGridStroke: string,
//     cartesianGridStrokeDasharray: string,
//     xAxisDataKey: string,
//     xAxisAngle: number,
//     xAxisTextAnchor: string,
//     yAxisDataKey: string
// }})
const CustomLineChart = () => {
    return (
        // now i see x label dropped to bottom
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data} margin={{top: 5, right: 20, bottom: 50, left: 0 }}>
                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="name" angle={-35} textAnchor="end" />
                <YAxis />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default CustomLineChart;
