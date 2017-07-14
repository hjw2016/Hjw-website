<template>
  <div id="app">
    <div class="top-bar">这里放title</div>
    <div class="nav">zheli shi menu </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.top-bar{
  width:100%;
  height:30px;
  background:#456;
  color:white;
}
.nav{
  width:260px;
  height:100%;
  background:#efc;
  float:left;
}
</style>
