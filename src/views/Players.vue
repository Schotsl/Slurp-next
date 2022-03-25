<template>
  <div style="display: flex">
    <drink-table :remaining="remaining" />
    <drink-bars :taken="taken" :remaining="remaining" />
  </div>

  <div style="display: flex">
    <drink-graph :graphs="graphs" target="shots" />
    <drink-graph :graphs="graphs" target="sips" />
  </div>
</template>

<script>
// @ is an alias to /src
import DrinkBars from "@/components/DrinkBars.vue";
import DrinkGraph from "@/components/DrinkGraph.vue";
import DrinkTable from "@/components/DrinkTable.vue";

export default {
  name: "Player",

  data() {
    return {
      taken: [],
      graphs: [],
      remaining: [],
    };
  },

  components: {
    DrinkBars,
    DrinkGraph,
    DrinkTable,
  },

  mounted() {
    // Create WebSocket connection.
    const socket = new WebSocket("ws://localhost:8080/v1/socket");

    console.log("Connecting to Slurp");

    // Listen for messages
    socket.addEventListener("message", (event) => {
      if (event.data === "Please provide your Authentication header.") {
        socket.send(
          "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiNzZmNWRjMDQtM2I3YS00YzVkLThkZWEtM2NlODhmYTg1ZTNhIn0.-pc2Pd3l1Xa469Vx7MIn7iQWj_PtweYunuI5u194aMy9SfJ8jk_42_M-c0km67YM69BWOSj_kjxQfH_WN54fOQ"
        );
        return;
      }

      if (
        event.data === "Authorized successfully!" ||
        event.data === "Your token is invalid." ||
        event.data === "Your Authentication header is improperly formatted."
      ) {
        return;
      }

      const parsed = JSON.parse(event.data);

      if (parsed.taken) {
        this.taken = parsed.taken;
      }

      if (parsed.remaining) {
        this.remaining = parsed.remaining;
      }

      if (parsed.graphs) {
        this.graphs = parsed.graphs;
      }
    });
  },
};
</script>

<style scoped lang="scss">
section {
  display: flex;
}
</style>
