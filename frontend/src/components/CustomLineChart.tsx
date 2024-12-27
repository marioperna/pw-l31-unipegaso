import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const CustomLineChart = ({ data, lineDataKey, xAxisDataKey, yAxisDataKey, showLegend, formatter }: { 
    data: {
        [key: string]: string | number;
    }[];
    lineDataKey: string;
    xAxisDataKey: string;
    yAxisDataKey: string;
    showLegend?: boolean;
    formatter?: (value: number) => string;
 }) => {
    return (
        // now i see x label dropped to bottom
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data} margin={{top: 5, right: 20, bottom: 50, left: 0 }}>
                <Line type="monotone" dataKey={lineDataKey} stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Tooltip formatter={formatter} />
                {showLegend && <Legend />}
                <XAxis dataKey={xAxisDataKey} angle={-35} textAnchor="end" />
                <YAxis dataKey={yAxisDataKey}/>
            </LineChart>
        </ResponsiveContainer>
    );
};

export default CustomLineChart;
