<template>
  <div id="app">
    <transition name="myfade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html,body{
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
.myfade-enter-active {
  transition: all .25s;
  opacity: 1;
  transform: scale(1)
}
.myfade-leave-active {
  transition: all .25s;
  opacity: 0;
  transform: scale(.98)
}

</style>
