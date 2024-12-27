import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ReferenceLine,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';

const CustomPosAndNegBarChart = ({
    data,
    responsiveContainerWidth = "100%",
    responsiveContainerHeight = 400,
    barChartWidth = 500,
    barChartHeight = 300,
    barChartMargin = { top: 5, right: 30, left: 20, bottom: 5 },
    cartGridStrokeDasharray = "3 3",
    xAxisDataKey = "name",
    showLegend = true,
    showTooltip = true,
    referenceLineY = 0,
    referenceLineStroke = "#000",
    barData = []
} : {
    data:{
        [key: string]: any
    }[],
    responsiveContainerWidth?: string,
    responsiveContainerHeight?: number,
    barChartWidth?: number,
    barChartHeight?: number,
    barChartMargin?: {
        top: number,
        right: number,
        left: number,
        bottom: number
    },
    cartGridStrokeDasharray?: string,
    xAxisDataKey?: string,
    showLegend?: boolean,
    showTooltip?: boolean,
    referenceLineY?: number,
    referenceLineStroke?: string,
    barData: {
        dataKey: string,
        fill: string
    }[],  
}) => {

    return (
        <ResponsiveContainer width={responsiveContainerWidth} height={responsiveContainerHeight}>
            <BarChart
                width={barChartWidth}
                height={barChartHeight}
                data={data}
                margin={barChartMargin}
            >
                <CartesianGrid strokeDasharray={cartGridStrokeDasharray} />
                <XAxis dataKey={xAxisDataKey} />
                <YAxis />
                {showTooltip &&  <Tooltip />}
                {showLegend && <Legend />}
                <ReferenceLine y={referenceLineY} stroke={referenceLineStroke} />

                {(barData || []).map((bar, index) => (
                    <Bar key={index} dataKey={bar.dataKey} fill={bar.fill} />
                ))}
                {/* <Bar dataKey="pv" fill="#8884d8" />
                <Bar dataKey="uv" fill="#82ca9d" /> */}
            </BarChart>
        </ResponsiveContainer>
    )
}

export default CustomPosAndNegBarChart;