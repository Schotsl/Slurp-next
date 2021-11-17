<template>
  <bar-chart :chartData="barData" :options="options" />
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
          },
          x: {
            stacked: true,
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
      const remaining: number[] = [];

      if (this.players) {
        this.players.forEach((player) => {
          let takenSips = 0;
          let remainingSips = 0;

          takenSips += this.compressTimeslices(player).taken.sips;
          takenSips += this.compressTimeslices(player).taken.shots * 20;

          remainingSips += this.compressTimeslices(player).remaining.sips;
          remainingSips += this.compressTimeslices(player).remaining.shots * 20;

          remaining.push(remainingSips);
          labels.push(player.username);
          taken.push(takenSips);
        });
      }

      return {
        labels,
        datasets: [
          {
            label: "Remaining",
            data: remaining,
            backgroundColor: "#3E92CC",
          },
          {
            label: "Taken",
            data: taken,
            backgroundColor: "#0A2463",
          },
        ],
      };
    },
  },
});
</script>

<style scoped lang="scss"></style>
