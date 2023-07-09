"use client";

import { Player, SlurpBar } from "@/types";
import { useEffect, useState } from "react";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
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

  window.addEventListener("resize", () => {
    setHeight(window.innerHeight - 155);
  });

  window.addEventListener("load", () => {
    setHeight(window.innerHeight - 155);
  });

  return (
    <ResponsiveContainer width="100%" height={height / 2}>
      <BarChart data={bars}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="player_username" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="units_consumed" stackId="a" fill="#8884d8" />
        <Bar dataKey="units_consume" stackId="a" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
}
