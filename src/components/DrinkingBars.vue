<template>
  <!-- <div style="display: flex;"> -->
  <bar-chart :chartData="barData" :options="options" style="height: 100%" />
  <!-- </div> -->
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Player, Timeslice } from "../types";
import { BarChart } from "vue-chart-3";

export default defineComponent({
  name: "DrinkingBars",

  data() {
    return {
      options: {
        scales: {
          y: {
            stacked: true,
            ticks: {
              font: {
                size: 22,
              },
            },
          },
          x: {
            stacked: true,
            ticks: {
              font: {
                size: 18,
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
    BarChart,
  },

  props: {
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
      const taken: number[] = [];
      const labels: string[] = [];
      const colors: string[] = [];
      const remain: number[] = [];

      if (this.players) {
        this.players.forEach((player) => {
          let takenSips = 0;
          let remainSips = 0;

          takenSips += this.compressTimeslices(player).taken.sips;
          takenSips += this.compressTimeslices(player).taken.shots * 20;

          remainSips += this.compressTimeslices(player).remaining.sips;
          remainSips += this.compressTimeslices(player).remaining.shots * 20;

          taken.push(takenSips);
          remain.push(remainSips);

          colors.push(player.color);
          labels.push(player.username);
        });
      }

      return {
        labels,
        datasets: [
          {
            label: "Taken",
            data: taken,
            backgroundColor: colors,
          },
          {
            label: "Remaining",
            data: remain,
            borderColor: colors,
            borderWidth: 2,
          },
        ],
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
