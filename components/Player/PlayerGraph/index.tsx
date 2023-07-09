import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import moment from "moment";
import { SlurpGraph } from "@/types";

interface ChartData {
  player_uuid: string;
  data: {
    time: string;
    units_consumed: number;
  }[];
}

type PlayerGraphProps = {
  graphs: SlurpGraph[];
};

function createChartData(graphs: SlurpGraph[]): ChartData[] {
  let players = Array.from(new Set(graphs.map((item) => item.player_uuid)));

  let chartData: ChartData[] = [];

  players.forEach((player) => {
    let playerData: { time: number; units_consumed: number }[] = [];

    let timestamp = moment().subtract(24, "hours").utc();
    let endTimestamp = moment().utc();

    while (timestamp <= endTimestamp) {
      playerData.push({
        time: timestamp.valueOf(),
        units_consumed: 0,
      });

      timestamp.add(15, "minutes");
    }

    let sortedPlayerGraphs = graphs
      .filter((graph) => graph.player_uuid === player)
      .sort(
        (a, b) =>
          moment(a.timestamp_utc).valueOf() - moment(b.timestamp_utc).valueOf(),
      );

    sortedPlayerGraphs.forEach((playerGraph) => {
      let graphTimestamp = moment.utc(playerGraph.timestamp_utc).valueOf();

      let slot = playerData.find((item) => item.time === graphTimestamp);

      if (slot) {
        slot.units_consumed += parseInt(playerGraph.units_consumed);
      } else {
        let previousSlot = playerData
          .slice(0)
          .reverse()
          .find((item) => item.time < graphTimestamp);

        if (previousSlot) {
          previousSlot.units_consumed += parseInt(playerGraph.units_consumed);
        }
      }
    });

    for (let i = 1; i < playerData.length; i++) {
      if (playerData[i].units_consumed === 0) {
        playerData[i].units_consumed = playerData[i - 1].units_consumed;
      }
    }

    chartData.push({
      player_uuid: player,
      data: playerData,
    });
  });

  return chartData;
}

export default function PlayerGraph({ graphs }: PlayerGraphProps) {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [playerNames, setPlayerNames] = useState<{ [key: string]: string }>({});
  const [height, setHeight] = useState(window.innerHeight - 155);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setHeight(window.innerHeight - 155);
    });

    window.addEventListener("load", () => {
      setHeight(window.innerHeight - 155);
    });

    // Create a mapping of player_uuid to player_username
    const playerNames: { [key: string]: string } = {};
    graphs.forEach((graph) => {
      playerNames[graph.player_uuid] = graph.player_username;
    });
    setPlayerNames(playerNames);

    setChartData(createChartData(graphs));
  }, [graphs]);

  return (
    <ResponsiveContainer width="100%" height={height / 2}>
      <LineChart>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="time"
          scale="time"
          type="number"
          domain={["auto", "auto"]}
          tickFormatter={(unixTime) =>
            moment(unixTime).format("YYYY-MM-DD HH:mm")
          }
        />

        <YAxis />
        <Tooltip />
        <Legend />
        {chartData.map((playerData, index) => (
          <Line
            key={playerData.player_uuid}
            type="monotone"
            data={playerData.data}
            dataKey="units_consumed"
            stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
            name={playerNames[playerData.player_uuid]} // add name here
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
