import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    cards: [],
    scores: [],
  },
  mutations: {
    populateCards(state, val) {
      state.cards.push(...val, ...val);
      this.commit("shuffleCards");
    },
    shuffleCards(state) {
      for (let i = state.cards.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [state.cards[i], state.cards[j]] = [state.cards[j], state.cards[i]];
      }
    },
    removeCards(state, val) {
      for (let i in val) {
        state.cards[val[i]].icon = "hidden";
      }
    },
    resetCards(state) {
      state.cards = [];
    },
    populateScores(state) {
      state.scores = JSON.parse(sessionStorage.getItem("scores"));
      this.commit("orderScores");
    },
    addRecord(state, val) {
      state.scores.push(val);
      this.commit("orderScores");
    },
    orderScores(state) {
      state.scores = state.scores.sort((a, b) => {
        if (a.time > b.time) {
          return 1;
        }
        if (a.time < b.time) {
          return -1;
        }
        if (a.time === b.time) {
          return 0;
        }
      });
      sessionStorage.setItem("scores", JSON.stringify(state.scores));
    },
  },
  actions: {
    getData({ commit }) {
      axios
        .get("data.json", { baseUrl: window.location.origin })
        .then((res) => {
          commit("resetCards");
          commit("populateCards", res.data);
        })
        .catch((err) => {
          console.log(err.data);
        });
    },
    getScores({ commit }) {
      if (!sessionStorage.getItem("scores")) {
        axios
          .get("records.json", { baseUrl: window.location.origin })
          .then((res) => {
            sessionStorage.setItem("scores", JSON.stringify(res.data));
            commit("populateScores");
          });
      } else commit("populateScores");
    },
  },
  modules: {},
});
