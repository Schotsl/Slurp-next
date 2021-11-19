<template>
  <div>
    <!-- <drinking-graph :players="players" type="sips" />
    <drinking-graph :players="players" type="shots" />
    <drinking-bars :players="players" /> -->
    <drinking-table :players="players" />
  </div>
</template>

<script lang="ts">
import { Chart, registerables } from "chart.js";
import { defineComponent } from "vue";
import { Player } from "./types";

// import DrinkingGraph from "./components/DrinkingGraph.vue";
// import DrinkingBars from "./components/DrinkingBars.vue";
import DrinkingTable from "./components/DrinkingTable.vue";

Chart.register(...registerables);

export default defineComponent({
  name: "App",

  data() {
    return {
      players: [] as Player[],
    };
  },

  components: {
    DrinkingTable,
    // DrinkingGraph,
    // DrinkingBars,
  },

  methods: {
    async loadGraph() {
      const response = await fetch(
        "http://localhost:8080/v1/graph?server=7b939bcd-14ac-4d73-b8b7-6aa311ffbfb5"
      );
      const parsed = await response.json();
      const players = parsed.players;

      this.players = players;
    },
  },

  mounted() {
    // setInterval(() => {
    this.loadGraph();
    // }, 1000);
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
  // font-size: 42px;
  margin-top: 60px;
}
</style>
