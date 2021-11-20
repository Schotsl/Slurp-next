<template>
  <table>
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Sips</th>
        <th>Shots</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="player in sortedPlayers" :key="player.uuid">
        <td class="image"><div :style="generateStyle(player)"></div></td>
        <td style="font-weight: 600" :style="generateColor(player)">
          {{ player.username }}
        </td>
        <td :style="generateColor(player)">
          {{ compressTimeslices(player).sips }}
        </td>
        <td :style="generateColor(player)">
          {{ compressTimeslices(player).shots }}
        </td>
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

    generateStyle(player: Player) {
      return `background-image: url('https://crafatar.com/avatars/${player.uuid}')`;
    },

    generateColor(player: Player) {
      return `color: ${player.color};`;
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
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 5rem;
  // margin:
  // flex: 1;
  width: 100%;
  height: 100%;
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
      // color: #009879;
      font-weight: bold;
    }

    .image {
      width: 1px;
      padding: 0.5rem 1rem;

      white-space: nowrap;

      div {
        width: 1.5rem;
        height: 1.5rem;

        background-size: contain;
      }
    }
  }
}
</style>
