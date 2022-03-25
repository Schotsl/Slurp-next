<template>
  <section>
    <BarChart :chartData="data" :options="options" style="width: 100%" />
  </section>
</template>

<script>
import { BarChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default {
  name: "DrinkBars",

  props: {
    remaining: Array,
    taken: Array,
  },

  components: {
    BarChart,
  },

  computed: {
    data() {
      const players = this.remaining.map((row) => {
        const { color, username, remaining_sips, remaining_shots } = row;
        return {
          color,
          username,
          taken_sips: 0,
          taken_shots: 0,
          remaining_sips,
          remaining_shots,
        };
      });

      this.taken.forEach((row) => {
        const player = players.find(
          (player) => player.username === row.username
        );

        if (typeof player !== "undefined") {
          player.taken_sips = row.taken_sips;
          player.taken_shots = row.taken_shots;
        } else {
          players.push({
            color: row.color,
            username: row.username,
            taken_sips: row.taken_sips,
            taken_shots: row.taken_shots,
            remaining_sips: 0,
            remaining_shots: 0,
          });
        }
      });

      const taken = [];
      const colors = [];
      const labels = [];
      const remaining = [];

      players.forEach((player) => {
        let first = 0;
        let second = 0;

        first += player.taken_sips;
        first += player.taken_shots * 20;

        second += player.remaining_sips;
        second += player.remaining_shots * 20;

        taken.push(first);
        colors.push(player.color);
        labels.push(player.username);
        remaining.push(second);
      });

      return {
        labels,
        datasets: [
          {
            data: taken,
            label: "Taken",
            backgroundColor: colors,
          },
          {
            data: remaining,
            label: "Remaining",
            borderWidth: 2,
            borderColor: colors,
          },
        ],
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

  padding: 3rem;
  background: #212529;
  box-sizing: border-box;
}
</style>
