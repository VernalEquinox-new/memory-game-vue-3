<template>
  <div class="container">
    <teleport to="#timer-teleport">
      <Timer ref="timer" />
    </teleport>
    <Game ref="game" />
    <Modal ref="modal-component" v-if="cardsCounter" />
    <div class="is-hidden">{{ cardsCounter }}</div>
  </div>
</template>

<script>
// @ is an alias to /src
import Game from "@/components/Game/Game.vue";
import Timer from "@/components/Game/Timer.vue";
import Modal from "@/components/Game/Modal.vue";

export default {
  name: "Home",
  components: {
    Game,
    Timer,
    Modal,
  },
  computed: {
    cardsCounter() {
      let arr = this.$store.state.cards.filter(
        (card) => card.icon !== "hidden"
      );
      if (arr.length === 0 && this.$store.state.cards.length) {
        this.$store.commit("resetCards");
        return true;
      } else {
        return false;
      }
    },
  },
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
