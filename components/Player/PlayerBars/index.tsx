import { SlurpPlayer, SlurpBar } from "@/types";
import { useEffect, useState } from "react";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LabelList,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type PlayerBarsProps = {
  bars: SlurpBar[];
};

export default function PlayerBars({ bars }: PlayerBarsProps) {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    function handleResize() {
      setHeight(window.innerHeight - 155);
    }
    window.addEventListener("resize", handleResize);
    window.addEventListener("load", handleResize);

    // Call handler right away so state gets updated with initial window height
    handleResize();

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", handleResize);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return (
    <ResponsiveContainer width="100%" height={height / 2}>
      <BarChart data={bars}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="player_username" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="units_consumed"
          name="Units Consumed"
          stackId="a"
          fill="#8884d8"
        >
          <LabelList dataKey="units_consumed" position="insideTop" />
        </Bar>
        <Bar
          dataKey="units_consume"
          name="Units to Consume"
          stackId="a"
          fill="#82ca9d"
        >
          <LabelList dataKey="units_consume" position="insideTop" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
