<template>
  <line-chart :chartData="barData" :options="options" style="height: 100%" />
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Player, Timeslice } from "../types";
import { LineChart } from "vue-chart-3";

export default defineComponent({
  name: "DrinkingGraph",

  data() {
    return {
      options: {
        scales: {
          x: {
            ticks: {
              font: {
                size: 22,
              },
            },
          },
          y: {
            ticks: {
              font: {
                size: 22,
              },
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

  components: {
    LineChart,
  },

  props: {
    type: String as PropType<string>,
    players: Array as PropType<Player[]>,
  },

  methods: {
    compressTimeslices(player: Player): Timeslice {
      let taken = {
        sips: 0,
        shots: 0,
      };

      let remaining = {
        sips: 0,
        shots: 0,
      };

      player.timeline.forEach((timeslice) => {
          taken.sips += timeslice.taken.sips;
          taken.shots += timeslice.taken.shots;

          remaining.sips += timeslice.remaining.sips;
          remaining.shots += timeslice.remaining.shots;
      });

      return {
        taken,
        remaining,
      };
    },
  },

  computed: {
    barData() {
      const date = new Date();
      const current = date.getHours() - 1;

      const labels: string[] = [];

      for (let i = 6; i > 0; i--) {
        const hourInteger = current - i < 0 ? current - i + 24 : current - i;
        const hourFormatted = `${hourInteger.toString().padStart(2, "0")}`;

        for (let j = 0; j < 4; j++) {
          const minuteInteger = j * 15;
          const minuteFormatted = `${minuteInteger.toString().padStart(2, "0")}`;
          
          labels.push(`${hourFormatted}:${minuteFormatted}`);
        }
      }

      const datasets = this.players!.map((player) => {
        const label = player.username;
        const borderColor = player.color;

        const data: number[] = [];

        labels.forEach((label, index) => {
          const previous = index === 0 ? 0 : data[index - 1];
          const timeslice = player.timeline.find(
            (timeslice) => timeslice.time === label
          );

          const value = timeslice
            ? this.type === "shots"
              ? timeslice.taken.shots
              : timeslice.taken.sips
            : 0;

          data.push(previous + value);
        });

        return {
          borderColor,
          label,
          data,
        };
      });

      return {
        datasets,
        labels,
      };
    },
  },
});
</script>

<style scoped lang="scss">
div {
  flex: 1;
}
</style>
