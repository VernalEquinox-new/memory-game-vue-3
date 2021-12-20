<template lang="html">
  <span>{{ timeCounter }}</span>
</template>

<script>
import { ref } from "vue";
const counterUp = ref(0);
const counterInterval = ref(null);

export default {
  data() {
    return {
      counterUp,
      counterInterval,
    };
  },
  methods: {
    resetTimer() {
      this.stopTimer();
      this.startTimer();
    },
    startTimer() {
      this.counterUp = 0;
      this.counterInterval = setInterval(this.incrementTime, 1000);
    },
    stopTimer() {
      clearInterval(this.counterInterval);
    },
    incrementTime() {
      if (this.$store.state.cards.length === 36) {
        this.counterUp++;
      }
    },
  },
  computed: {
    timeCounter() {
      let counter = new Date();
      counter.setHours(0);
      counter.setMinutes(0);
      counter.setSeconds(this.counterUp);
      return counter.toLocaleTimeString();
    },
  },
};
</script>
<style lang="css" scoped></style>
