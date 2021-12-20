<template lang="html">
  <div
    :class="$parent.cardsCounter ? ['is-active', 'modal'] : ['modal']"
    ref="modal"
  >
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="card">
        <div class="card-header">
          <p class="card-header-title">Ура!</p>
        </div>
        <div class="card-content">
          <p>Ваше время: {{ score.time }}</p>
          <div v-if="scoreFlag" class="field has-addons">
            <div class="control">
              <input
                class="input is-normal"
                type="text"
                placeholder="Ваше имя"
                v-model.trim="score.name"
                ref="name-input"
              />
            </div>
            <div class="control">
              <button
                class="button is-info"
                @click="scoreRecord()"
                :disabled="!score.name"
              >
                <span class="material-icons">done</span>
              </button>
            </div>
          </div>
        </div>
        <div class="card-footer">
          <button
            class="button card-footer-item is-info is-light"
            @click="openScoreInput()"
          >
            Сохранить результат
          </button>
          <button
            class="button card-footer-item is-danger is-light"
            @click="closeModal()"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
    <button
      class="modal-close is-large"
      aria-label="close"
      @click="closeModal()"
    ></button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      score: {
        time: this.$parent.$refs["timer"].timeCounter,
      },
      scoreFlag: false,
    };
  },
  methods: {
    openScoreInput() {
      this.scoreFlag = true;
    },
    scoreRecord() {
      this.$store.commit("addRecord", this.score);
      this.closeModal();
      this.scoreFlag = false;
    },
    closeModal() {
      this.$refs["modal"].classList.remove("is-active");
    },
  },
};
</script>

<style lang="css" scoped>
div.modal div.modal-content {
  max-width: 350px;
  position: center;
}
</style>
