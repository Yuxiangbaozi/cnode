<template>
  <div id="app">
    <Header></Header>
    <div class="main clearfix">
      <router-view name="slide"></router-view>
      <router-view name="main"></router-view>
    </div>
  </div>
</template>

<script>
import Header from './components/Header'
export default {
  name: 'App',
  components: {
    Header,
  },
}
</script>

<style>
.main{
  height: 100%;
}
#app{
  background: #E1E1E1;
}
.clearfix::after{
  content: '';
  display: block;
  clear: both;
}
</style>
