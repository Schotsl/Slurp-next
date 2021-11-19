<template>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Sips</th>
        <th>Shots</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="player in sortedPlayers" :key="player.uuid">
        <td>{{ player.username }}</td>
        <td>{{ compressTimeslices(player).sips }}</td>
        <td>{{ compressTimeslices(player).shots }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Player, Consumable } from "../types";

export default defineComponent({
  name: "DrinkingTable",

  props: {
    players: Array as PropType<Player[]>,
  },

  methods: {
    compressTimeslices(player: Player): Consumable {
      let remaining = {
        sips: 0,
        shots: 0,
      };

      player.timeline.forEach((timeslice) => {
        remaining.sips += timeslice.remaining.sips;
        remaining.shots += timeslice.remaining.shots;
      });

      return remaining;
    },
  },

  computed: {
    sortedPlayers(): Player[] {
      return [...this.players!].sort((first, second) => {
        const firstCompressed = this.compressTimeslices(first);
        const secondCompressed = this.compressTimeslices(second);

        const firstSum = firstCompressed.shots * 20 + firstCompressed.sips;
        const secondSum = secondCompressed.shots * 20 + secondCompressed.sips;

        return firstSum > secondSum ? 1 : -1;
      });
    },
  },
});
</script>

<style scoped lang="scss">
table {
  flex: 1;
  // min-width: 400px;
  text-align: left;
  border-collapse: collapse;

  thead tr {
    color: #ffffff;
    background: #009879;
  }

  th,
  td {
    padding: 12px 15px;
  }

  tbody tr {
    border-bottom: 1px solid #dddddd;

    &:nth-of-type(even) {
      background: #f3f3f3;
    }

    &:last-of-type {
      border-bottom: 2px solid #009879;
    }

    &:first-of-type {
      color: #009879;
      font-weight: bold;
    }
  }
}
</style>
