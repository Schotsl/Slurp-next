<template>
  <section>
    <h1>{{ title }}</h1>
    <LineChart :chartData="data" :options="options" style="width: 100%; height: 100%" />
  </section>
</template>

<script>
import { LineChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default {
  name: "DrinkGraph",

  props: {
    target: String,
    graphs: Array,
  },

  components: {
    LineChart,
  },

  computed: {
    title() {
      return this.target === "shots" ? "Shots" : "Sips"
    },
    data() {
      const dates = [];
      const labels = [];
      const datasets = [];

      const HOUR_TOTAL = 6;
      const MINUTE_VALUE = 60000;
      const MINUTE_INTERVAL = 10;

      for (let i = HOUR_TOTAL * (60 / MINUTE_INTERVAL); i > 0; i--) {
        const rounded =
          Math.ceil(Date.now() / (MINUTE_VALUE * MINUTE_INTERVAL)) *
          (MINUTE_VALUE * MINUTE_INTERVAL);
        const value = rounded - (i - 1) * MINUTE_VALUE * MINUTE_INTERVAL;
        const date = new Date(value);

        const hour = date.getHours().toString().padStart(2, "0");
        const minute = date.getMinutes().toString().padStart(2, "0");
        const formatted = `${hour}:${minute}`;

        dates.push(date);
        labels.push(formatted);
      }

      this.graphs.forEach((graph) => {
        const timestamp = new Date(graph.timestamp);

        // Very jank timezone fix
        const hours = timestamp.getHours();
        const offset = 1;

        timestamp.setHours(hours + offset);

        const dataset = datasets.find((dataset) => dataset.uuid === graph.uuid);

        const { username, uuid, sips, shots, color } = graph;

        const entry = { sips, shots, timestamp };

        if (typeof dataset === "undefined") {
          datasets.push({
            uuid,
            data: [0],
            label: username,
            summary: [entry],
            timestamp,
            borderColor: color,
          });

          return;
        }

        dataset.summary.push(entry);
      });

      for (let i = 0; i < datasets.length; i++) {
        const dataset = datasets[i];
        const data = dataset.data;

        for (let j = 0; j < dates.length; j++) {
          const date = dates[j];

          const summary = dataset.summary.find((summary) => {
            return summary.timestamp.getTime() == date.getTime();
          });

          if (typeof summary !== "undefined") {
            const count =
              this.target === "shots" ? summary.shots : summary.sips;
            data.push(data[j] + count);
          } else {
            data.push(data[j]);
          }
          // const count = this.target === "shots" ? summary.shots : summary.sips;
          // const value = typeof summary === "undefined" ? data[j] : data[j] + count;
          // data.push(value);
        }
      }

      return {
        labels: labels,
        datasets,
      };
    },
  },

  data() {
    return {
      options: {
        scales: {
          y: {
            stacked: true,
            ticks: {
              color: "#fff",
              font: {
                size: 22,
              },
            },
            grid: {
              color: "#32383e",
            },
          },
          x: {
            stacked: true,
            ticks: {
              color: "white",
              font: {
                size: 18,
              },
            },
            grid: {
              color: "#32383e",
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    };
  },
};
</script>

<style scoped lang="scss">
section {
  width: 50vw;
  height: 50vh;
  display: flex;
  flex-direction: column;
  color: white;

  padding: 3rem;
  background: #212529;
  box-sizing: border-box;

  h1 {
    text-align: left;
    margin-bottom: 2rem;
  }
}
</style>
