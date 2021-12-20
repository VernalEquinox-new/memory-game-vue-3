<template lang="html">
  <div class="container">
    <Table />
  </div>
</template>

<script>
import Table from "@/components/Scores/Table.vue";
export default {
  components: { Table },
  methods: {
    getScores() {
      this.$store.dispatch("getScores");
    },
  },
  created() {
    this.getScores();
  },
};
</script>

<style lang="css" scoped></style>
