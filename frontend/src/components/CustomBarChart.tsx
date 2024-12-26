import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

const CustomBarChart = ({ 
    data,
    responsiveContainerWidth = "100%",
    responsiveContainerHeight = 400,
    barChartMargin = { top: 5, right: 30, left: 20, bottom: 5 },
    strokeDasharray = "3 3",
    xAxixDataKey = "name",
    barData = [],
    showLegend = true,
    showTooltip = true
}: {
    data:{
        [key: string]: any
    }[],
    responsiveContainerWidth?: string,
    responsiveContainerHeight?: number,
    barChartMargin?: {
        top: number,
        right: number,
        left: number,
        bottom: number
    },
    strokeDasharray?: string,
    xAxixDataKey?: string,
    barData: {
        dataKey: string,
        fill: string
    }[],
    showLegend?: boolean
    showTooltip?: boolean
}) => {

    return (
      <ResponsiveContainer width={responsiveContainerWidth} height={responsiveContainerHeight}>
        <BarChart
          data={data}
          margin={barChartMargin}
        >
          <CartesianGrid strokeDasharray={strokeDasharray} />
          <XAxis dataKey={xAxixDataKey} />
          <YAxis />
          {showLegend && <Legend />}
          {showTooltip && <Tooltip />}

          {(barData || []).map((bar, index) => (
            <Bar key={index} dataKey={bar.dataKey} fill={bar.fill} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    );
};

export default CustomBarChart;
