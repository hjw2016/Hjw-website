<template>
  <div id="app">
    <div class="top-bar">{{title}}</div>
    <Hello></Hello>
    <router-view></router-view>
  </div>
</template>

<script>
import Hello from '@/components/Hello'

export default {
  name: 'app',
  data () {
    return {
        title: 'Node and Vue StudyProject'
    }
  },
  mounted (){
    this.$http.get('/wlsw/getRainPanel!panel').then((data) => {
      console.log(data);
    })
  },
  components:{
    'Hello':Hello
  }
}
</script>

<style>
  @import './css/app.css';
</style>
