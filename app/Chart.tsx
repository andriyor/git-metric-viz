"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Brush,
  ResponsiveContainer,
} from "recharts";
import { Info } from "@/generate-report-based-on-file";

const Payload = ({ payload }: { payload: Record<string, string> }) => {
  return (
    <div>
      {Object.keys(payload).map((key, index) => (
        <p key={index}>
          {key}: {payload[key]}
        </p>
      ))}
    </div>
  );
};

const CustomTooltip = (data: any) => {
  if (data.active && data.payload && data.payload.length) {
    return (
      <div className="custom-tooltip">
        <p>date: {data.payload[0].payload.commitDate}</p>
        <Payload payload={data.payload[0].payload.author} />
        <p></p>
        <Payload payload={data.payload[0].payload.metrics[data.metricName]} />
      </div>
    );
  }

  return null;
};

export const Chart = ({
  metadata,
  metricName,
}: {
  metadata: Info[];
  metricName: string;
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={metadata}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="commitDate" />
        <YAxis />
        <Tooltip content={<CustomTooltip metricName={metricName} />} />
        <Legend />
        <Line
          type="monotone"
          dataKey={`metrics.${metricName}.value`}
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Brush />
      </LineChart>
    </ResponsiveContainer>
  );
};
