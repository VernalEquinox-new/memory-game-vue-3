<template>
  <div id="nav">
    <router-link to="/">Играть</router-link> |
    <router-link to="/scores">Рекорды</router-link>
    <span v-if="this.$route.path === '/'"> | </span>
    <span id="timer-teleport"></span>
  </div>
  <router-view v-slot="{ Component }">
    <transition name="slide-left" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 10px 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
