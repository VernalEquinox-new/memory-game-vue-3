<template lang="html">
  <div class="container">
    <table class="table is-bordered">
      <thead>
        <tr>
          <th>№</th>
          <th>Имя</th>
          <th>Время</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(score, i) in $store.state.scores" :key="i">
          <td>{{ i + 1 }}</td>
          <td>{{ score.name }}</td>
          <td>{{ score.time }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {};
</script>

<style lang="css" scoped>
table.table {
  margin: 0 auto;
}
</style>
