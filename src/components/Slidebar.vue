<template>
  <div class="slide">
    <div class="view">
      <div class="user">
        <div>个人信息</div>
        <div>
          <router-link :to="{
            name: 'userinfo',
            params: {
              logoname: user.loginname
            }
          }">
            <img :src="user.avatar_url">
          </router-link>
          <router-link :to="{
            name: 'userinfo',
            params: {
              logoname: user.loginname
            }
          }">
            <span>{{user.loginname}}</span>
          </router-link>
          <p>积分 {{user.score}}</p>
          <p></p>
        </div>
      </div>
      <div class="tie">
        <div>最近主题</div>
        <div v-for="topics in topicslimit">
          <ul>
            <router-link :to="{
              name:'posttext',
              params: {
                id: topics.id,
                logoname: topics.author.loginname,
              }
            }">
              <li>{{topics.title}}</li>
            </router-link>
          </ul>
        </div>
      </div>
      <div class="tie">
        <div>最近回复</div>
        <div v-for="replies in replieslimit">
          <ul>
            <router-link :to="{
              name:'posttext',
              params: {
                id: replies.id,
                logoname: replies.author.loginname,
              }
            }">
              <li>{{replies.title}}</li>
            </router-link>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Slidebar',
  data: function(){
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
  computed:{
    topicslimit: function(){
      if(this.user.recent_topics){
        return this.user.recent_topics.slice(0,5)
      }
    },
    replieslimit: function(){
      if(this.user.recent_replies){
        return this.user.recent_replies.slice(0,5)
      }
    },
  },
  beforeMount(){
    this.getUser()
  },
  beforeRouteUpdate: function(to, from, next){
    if(to.params.logoname !== from.params.logoname || to.params.id !== from.params.id){
      window.location.reload(true)
    }
    next()
  }
}
</script>

<style scoped>
.slide{
  width: 19%;
  float:right;
  margin-right: 5%
}
.slide>.view>.user>div:nth-child(1){
  height: 20px;
  padding: 10px;
  line-height: 20px;
  color: #51585c;
  border-radius: 3px 3px 0 0;
  background-color: #f6f6f6;
  font-size: 12px;
}
.slide>.view>.user>div:nth-child(2){
  padding: 10px;
  font-size: 13px;
  background-color: white;
}
.slide>.view>.user>div:nth-child(2) span{
  margin-left:5px;
  
}
.slide>.view>.user>div:nth-child(2) img{
  width: 48px;
  height: 48px;
  vertical-align: middle;
}
.slide>.view>.user>div:nth-child(2)>p{
  margin-top: 10px;
}
.slide>.view>.tie{
  margin-top: 15px;
}
.slide>.view>.tie>div:nth-child(1){
  height: 20px;
  padding: 10px;
  line-height: 20px;
  color: #51585c;
  border-radius: 3px 3px 0 0;
  background-color: #f6f6f6;
  font-size: 12px;
}
.slide>.view>.tie>div:not(:nth-child(1)){
  padding: 10px;
  font-size: 13px;
  background-color: white;
  border-top: 1px solid #f0f0f0;
}
.slide>.view>.tie>div:nth-child(2){
  border-top: none;
}
.slide>.view>.tie>div:not(:nth-child(1))>ul li{
  height: 17px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
a{
  color: #000;
}
</style>
