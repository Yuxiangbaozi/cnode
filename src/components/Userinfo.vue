<template>
  <div class="userinfo">
    <router-link :to="{name: 'root'}">
      <div class="header">
        <span>主页</span>
        <span>/</span>
      </div>
    </router-link>
    <div class="users">
      <img :src="user.avatar_url">
      <span>{{user.loginname}}</span>
      <p style="color: #778087;">{{user.score}} 积分</p>
      <p style="color: #ababab;">注册时间 {{user.create_at | timefil}}</p>
    </div>
    <div class="header">最近创建的话题</div>
    <div class="tie" >
      <ul>
        <li v-for="topics in user.recent_topics">
          <router-link :to="{
            name: 'userinfo',
            params: {
              logoname: topics.author.loginname
            }
          }">
            <img :src="topics.author.avatar_url" >
          </router-link>
          <router-link :to="{
            name:'posttext',
            params: {
              id: topics.id,
              logoname: topics.author.loginname,
            }
          }">
            <span class="title">{{topics.title}}</span>
          </router-link>
          <span class="lasttime">{{topics.last_reply_at | timefil}}</span>
        </li>
      </ul>
    </div>
    <div class="header">最近参与的话题</div>
    <div class="tie">
      <ul>
        <li v-for="replies in user.recent_replies">
          <router-link :to="{
            name: 'userinfo',
            params: {
              logoname: replies.author.loginname,
            }
          }">
            <img :src="replies.author.avatar_url" >
          </router-link>
          <router-link :to="{
            name:'posttext',
            params: {
              id: replies.id,
              logoname: replies.author.loginname,
            }
          }">
            <span class="title">{{replies.title}}</span>
          </router-link>
          <span class="lasttime">{{replies.last_reply_at | timefil}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Userinfo',
  data:function(){
    return {
      user: []
    }
  },
  methods: {
    getUser: function(){
      this.$axios.get(`https://cnodejs.org/api/v1/user/${this.$route.params.logoname}`)
      .then(res=>{
        if(res.data.success === true){
          this.user = res.data.data
        }
      })
    }
  },
  beforeMount(){
    this.getUser()
  },
  beforeRouteUpdate: function(to, from, next){
    console.log(to)
    if(to.params.logoname !== from.params.logoname || to.params.id !== from.params.id){
      window.location.reload(true)
    }
    next()
  }
}
</script>

<style scoped>
.userinfo{
  width: 70%;
  margin-top: 15px;
  margin-left: 5%;
}
.header{
  color: #80bd01;
  background-color: #f6f6f6;
  border-radius: 3px 3px 0 0;
  padding: 10px;
  font-size: 14px;
}
.header:not(:nth-child(1)){
  color: #444;
}
.header>span:nth-child(2){
  padding: 0 5px;
  color: #ccc;
}
.users{
  background: white;
  margin-bottom: 13px;
  padding: 10px;
}
.users>img{
  width: 40px;
  height: 40px;
  vertical-align: top;
  margin-right: 10px;
  margin-bottom: 10px;
}
.users>p{
  line-height: 2em;
}
.tie{
  margin-bottom: 13px;
  background: white;
}
.tie>ul>li{
  border-top: 1px solid #ddd;
  padding: 10px;
  display: flex;
  flex-direction: row;
}
.tie>ul>li img{
  width: 30px;
  height: 30px;
  vertical-align: middle;
  
}
.tie>ul>li .title{
  display: inline-block;
  color: #08c;
  align-items: center;
  width: 90%;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.tie>ul>li>a:nth-child(1){
  width: 30px;
  height: 30px;
  margin-right: 10px;
}
.tie>ul>li>a:nth-child(2){
  height: 21px;
  width: 90%;
  margin-top: auto;
  margin-bottom: auto;
}
.tie>ul>li .title:hover{
  color: #005580;
  text-decoration: underline
}
.tie>ul>li .lasttime{
  margin-left: auto;
  margin-top: auto;
  margin-bottom: auto;
}
</style>
