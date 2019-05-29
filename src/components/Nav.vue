<template>
  <div class="nav">
    <span class="act" id="all" @click="change">全部</span>
    <span id="good" @click="change">精华</span>
    <span id="share" @click="change">分享</span>
    <span id="ask" @click="change">问答</span> 
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'Nav',
  data: function(){
    return {
      tab: ['all','good','share','ask']
    }
  },
  methods: {
    change: function(cl){
      $(`.nav .act`).removeClass('act')
      $(cl.target).addClass('act')
      this.$emit('upnav',cl.target.id)
    }
  },
}
</script>

<style scoped>
.nav{
  margin: 15px 0 0;
  height: 20px;
  padding: 10px;
  background-color: #f6f6f6;
  border-radius: 3px 3px 0 0;
}
.nav span.act{
  background-color: #80bd01;
  color: #fff;
  padding: 3px 4px;
  border-radius: 3px;
}
.nav span.act:hover{
  color: #fff;
}
.nav span{
  margin: 0 10px;
  color: #80bd01;
  font-size: 14px;
  cursor: pointer;
}
.nav span:hover{
  color: #08c;
}
</style>
