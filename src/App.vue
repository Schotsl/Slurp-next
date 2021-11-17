<template>
  <drinking-bars :players="players" />
</template>

<script lang="ts">
import { Chart, registerables } from "chart.js";
import { defineComponent } from "vue";
import { Player } from "./types";

import DrinkingBars from "./components/DrinkingBars.vue";

Chart.register(...registerables);

export default defineComponent({
  name: "App",

  data() {
    return {
      players: [] as Player[],
    };
  },

  components: {
    DrinkingBars,
  },

  methods: {
    async loadGraph() {
      const response = await fetch("https://slurp.deno.dev/v1/graph");
      const parsed = await response.json();
      const players = parsed.players;

      this.players = await Promise.all(
        players.map(async (player: Player) => {
          const response = await fetch(
            `https://api.ashcon.app/mojang/v2/user/${player.uuid}`
          );
          const parsed = await response.json();
          const username = response.status === 200 ? parsed.username : "Oops";

          return { ...player, username };
        })
      );
    },
  },

  mounted() {
    this.loadGraph();
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
