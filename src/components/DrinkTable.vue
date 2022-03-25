<template>
  <table>
    <tr>
      <th></th>
      <th>Username</th>
      <th>Sips</th>
      <th>Shots</th>
    </tr>

    <tr v-for="remain in remaining" :key="remain.uuid">
      <td style="width: 2rem">
        <img :src="skinImage(remain.uuid)" :alt="skinAlt(remain.username)" />
      </td>
      <td>{{ remain.username }}</td>
      <td>{{ remain.remaining_sips }}</td>
      <td>{{ remain.remaining_shots }}</td>
    </tr>
  </table>
</template>

<script>
export default {
  name: "DrinkTable",

  props: {
    remaining: Array,
  },

  methods: {
    skinImage(uuid) {
      return `https://mc-heads.net/avatar/${uuid}`;
    },
    skinAlt(username) {
      const character = username.charAt(username.length);
      const appendage = character === `s` ? `'` : `'s`;

      return `Image of ${username}${appendage} Minecraft skin.`;
    },
  },
};
</script>

<style scoped lang="scss">
table {
  width: 50vw;
  height: 50vh;

  color: #fff;
  padding: 2rem 4rem;
  background: #212529;

  text-align: left;
  font-size: 1.5rem;
  border-spacing: 0;

  img {
    width: 100%;
    display: block;
  }

  th,
  td {
    padding: 0.5rem;
  }

  th {
    border-bottom: 2px solid #32383e;
  }
  td {
    border-bottom: 1px solid #32383e;
  }
}
</style>
