<template lang="html">
  <div class="container">
    <button class="button is-info is-light mb-3" @click="getData()">
      Новая игра
    </button>
    <div class="columns is-multiline is-mobile">
      <div
        class="column is-2"
        v-for="(card, i) in $store.state.cards"
        :key="i"
        ref="card-ref"
      >
        <div
          class="card is-clickable py-2"
          @click="handleCardCheck(i)"
          v-if="card.icon !== 'hidden'"
        >
          <span class="material-icons is-invisible">
            {{ card.icon }}
          </span>
        </div>
        <div class="py-4" v-else>&nbsp;</div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
const pair = reactive([]);
export default {
  data() {
    return {
      pair,
      timer: null,
    };
  },
  methods: {
    getData() {
      this.$store.dispatch("getData");
      this.$parent.$refs["timer"].resetTimer();
    },
    toggleCard(val) {
      for (let i of val) {
        this.$refs["card-ref"][i].firstChild.firstChild.classList.toggle(
          "is-invisible"
        );
      }
    },
    onTimeout(indexes) {
      this.toggleCard(indexes);
      this.pair = [];
    },
    setIndexesArray() {
      let indexes = [];
      for (let i of this.pair) {
        indexes.push(i.index);
      }
      return indexes;
    },
    handleTimeout() {
      let indexes = this.setIndexesArray();
      if (this.pair.length === 1) {
        this.timer = setTimeout(this.onTimeout.bind(null, indexes), 5000);
      }
      if (this.pair.length === 2) {
        clearTimeout(this.timer);
        this.timer = null;
        if (this.pair[0].icon === this.pair[1].icon) {
          this.$store.commit("removeCards", indexes);
          this.pair = [];
        } else {
          this.timer = setTimeout(this.onTimeout.bind(null, indexes), 1000);
        }
      }
    },
    handleCardCheck(val) {
      let obj = {
        index: val,
        icon: this.$store.state.cards[val].icon,
      };
      let item = this.pair.find((item) => item.index === obj.index);
      if (this.pair.length < 2 && !item) {
        this.toggleCard([val]);
        this.pair.push(obj);
        this.handleTimeout();
      }
    },
  },
  unmounted() {
    clearTimeout(this.timer);
  },
  mounted() {
    this.pair = [];
  },
};
</script>

<style lang="css" scoped>
div span.material-icons {
  font-size: 2rem;
}
div.container {
  max-width: 700px;
  height: 90vh;
  padding: 0 1rem;
}
div.card {
  background-color: #dbbea1;
}
</style>
