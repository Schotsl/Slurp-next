<template>
  <div class="container">
    <div style="display: flex; height: 50%;">
      <div style="padding: 2rem; width: 50%;">
      <drinking-table :players="players" />
      </div>
      
      <div style="padding: 2rem; width: 50%;">
      <drinking-bars :players="players" />
      </div>
    </div>

    <!-- <div class="divider"></div> -->

    <div style="display: flex; height: 50%;">
      <div style="padding: 2rem; width: 50%;">
      <drinking-graph :players="players" type="sips" />
      </div>
      <!-- <div class="divider"></div> -->
      <div style="padding: 2rem; width: 50%;">
      <drinking-graph :players="players" type="shots" />
      </div>
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
        "https://slurp.deno.dev/v1/graph?server=3b011caf-1f0d-4406-826f-f07ba26164c8"
      );
      const parsed = await response.json();
      const players = parsed.players;

      this.players = players;
    },
  },

  mounted() {
    setInterval(() => {
    this.loadGraph();
    }, 10000);
  },
});
</script>

<style lang="scss">
html,
body {
  width: 100vw;
  height: 100vh;
  margin: 0;
  font-size: 1rem;
}

* {
  box-sizing: border-box;
}

#app {
  height: 100%;
  width: 100%;
  // display: flex;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  // box-sizing: border-box;
  // color: #2c3e50;
  // height: 100vh;
  // width: 100vw;
  // padding: 5vw;
  // font-size: 42px;
  // margin-top: 60px;

  // div {
  //   // width: 100%;
  //   // height: 100%;
  // }

  .container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    // div {
    //   flex: 1;
    // }
  }
}
</style>
