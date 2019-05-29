<template>
  <div class="header">
    <router-link :to="{name: 'root'}">
      <img src="../assets/cnodejslight.svg">
    </router-link>
    <ul>
      <li><a href="#">首页</a></li>
      <li><a href="#">新手入门</a></li>
      <li><a href="#">API</a></li>
      <li><a href="#">关于</a></li>
      <li><a href="#">注册</a></li>
      <li><a href="#">登录</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped>
.header{
  background-color: #444444;
  display: flex;
}

img{
  margin-left: 70px;
  padding: 8px 0 13px 0;
  height: 29px;
  width: 120px;
  vertical-align: initial
}
ul{
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 56%;
  font-size: 13px;
}
li{
  padding: 0 15px;
}
a:hover{
  color: white;
}
</style>
