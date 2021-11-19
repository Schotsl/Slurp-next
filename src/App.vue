<template>
  <div class="container">
    <div style="display: flex">
      <drinking-table :players="players" />
      <!-- <div class="divider"></div> -->
      <drinking-bars :players="players" />
    </div>

    <!-- <div class="divider"></div> -->

    <div style="display: flex">
      <drinking-graph :players="players" type="sips" />
      <!-- <div class="divider"></div> -->
      <drinking-graph :players="players" type="shots" />
    </div>
  </div>
</template>

<script lang="ts">
import { Chart, registerables } from "chart.js";
import { defineComponent } from "vue";
import { Player } from "./types";

import DrinkingGraph from "./components/DrinkingGraph.vue";
import DrinkingBars from "./components/DrinkingBars.vue";
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
    DrinkingGraph,
    DrinkingBars,
  },

  methods: {
    async loadGraph() {
      const response = await fetch(
        "https://slurp.deno.dev/v1/graph?server=7b939bcd-14ac-4d73-b8b7-6aa311ffbfb5"
      );
      const parsed = await response.json();
      const players = parsed.players;

      this.players = players;
    },
  },

  mounted() {
    // setInterval(() => {
    console.log("adsf");
    this.loadGraph();
    // }, 1000);
  },
});
</script>

<style lang="scss">
html,
body {
  width: 100vw;
  font-size: 70px;
  height: 100vh;
  margin: 0;
}
#app {
  height: 100%;
  width: 100%;
  // display: flex;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  box-sizing: border-box;
  color: #2c3e50;
  // height: 100vh;
  // width: 100vw;
  padding: 5vw;
  // font-size: 42px;
  // margin-top: 60px;

  // div {
  //   // width: 100%;
  //   // height: 100%;
  // }

  .container {
    width: 100%;
    display: flex;
    height: 100%;
    flex-direction: column;

    div {
      flex: 1;
    }
  }
}

.divider {
  width: 5vw;
  height: 5vw;
}
</style>
