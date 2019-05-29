<template>
  <div class="list">
    <Nav @upnav='tabchange'></Nav>
    <ul>
      <li v-for="post in posts" :class="[post.tab,{good: (post.good === true)}]">
        <router-link :to="{
          name: 'userinfo',
          params: {
            logoname: post.author.loginname
          }
        }">
          <img :src="post.author.avatar_url" >
        </router-link>
        <div class="num">
          <div class="st">
            <span class="replycount">{{post.reply_count}}</span>
            <span class="xiegang">/</span>
            <span class="visitcount">{{post.visit_count}}</span>
          </div>
        </div>
        <span :class="[{good: (post.good === true)},{top: (post.top === true)},{tab: (post.top === false && post.good === false)}]">
          <span>{{post | tabfil}}</span>
        </span>
        <router-link class="tatlelink" :to="{
          name:'posttext',
          params: {
            id: post.id,
            logoname: post.author.loginname,
          }
        }">
          <span class="title">{{post.title}}</span>
        </router-link>
        <span class="lasttime">{{post.last_reply_at | timefil}}</span>
      </li>
        <Pagination @updata="pagechange"></Pagination>
    </ul>
  </div>
</template>

<script>
import Pagination from './Pagination'
import Nav from './Nav'
import $ from 'jquery'
export default {
  name: 'Postlist',
  data: function(){
    return {
      posts: [],
      p: 1,
      tab: 'all'
    }
  },
  components:{
    Pagination,
    Nav,
  },
  methods: {
    getData: function(){
      this.$axios.get('https://cnodejs.org/api/v1/topics',{
        params: {
          page: this.p,
          limit: 20,
          tab: this.tab
        }
      })
        .then(res=>{
          this.posts = res.data.data
        })
    },
    pagechange: function(value){
      this.p = value
      this.getData()
    },
    tabchange: function(value){
      this.tab = value
      this.getData()
    }
  },
  beforeMount(){
    this.getData();
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
.clearfix::after{
  contain: '';
  display: block;
  clear: both;
}
.list{
  margin: 0 10% 15px 10%;
  background: white;
  border-radius: 3px;
}

.num{
  display: inline-block;
  width: 70px;
  margin-left: 3px
}
.st{
  text-align: center;
  white-space:nowrap;
}
.replycount{
  color: #9e78c0;
}
.visitcount{
  color: #b4b4b4;
}
.xiegang{
  margin: 0 -2px;
}
.lasttime{
  margin-left: auto;
}
.title{
  display: inline-block;
  color: #333;
  font-size: 16px;
  width: 82%;
  text-align: left;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.tatlelink{
  width: 82%;
  height: 30px;
}
.title:visited{
  color: #888;
}
.list>ul>li>.top,.list>ul>li>.good{
  background: #80bd01;
  padding: 2px 4px;
  color: #fff;
  font-size: 12px;
  border-radius: 3px;
  height: 16px;
  display: flex;
  margin: auto 3px;
}
.list>ul>li>.top>span,.list>ul>li>.good>span,.list>ul>li>.tab>span{
  margin-top: auto;
  margin-bottom: auto;
  line-height: 16px;
}
.list>ul>li>.tab{
  background: #e5e5e5;
  color: #999;
  padding: 2px 4px;
  font-size: 12px;
  border-radius: 3px;
  height: 16px;
  display: flex;
  margin: auto 3px;
}
span{
  text-align: center;
}
img{
  width: 30px;
  height: 30px;
  vertical-align: middle;
}
li{
  padding: 10px;
  font-size: 12px;
  line-height: 30px;
  border-top: 1px solid #F0F0F0;
  display: flex;
}
li:hover{
  background-color: #F0F0F0
}
li:nth-child(1){
  border-top: none;
}
</style>
