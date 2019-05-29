<template>
  <div class="article">
    <div class="main">
      <div class="topbar">
        <span :class="[{good: (post.good === true)},{top: (post.top === true)},{tab: (post.top === false && post.good === false)}]">
          <span>{{post | tabfil}}</span>
        </span>
        <span class="title">{{post.title}}</span>
        <ul>
          <li><b>·</b> 发布于{{post.create_at | timefil}}&nbsp&nbsp&nbsp</li>
          <li><b>·</b> 作者 {{post.author.loginname}}&nbsp&nbsp&nbsp</li>
          <li><b>·</b> {{post.visit_count}} 次浏览&nbsp&nbsp&nbsp</li>
          <li><b>·</b> 来自{{post | tabfil}}&nbsp&nbsp&nbsp</li>
        </ul>
      </div>
      <div class="fengexian"></div>
      <div id="content" v-html="post.content"></div>
    </div>
    <div class="res" v-if="post.reply_count !== 0">
      <div>{{post.reply_count}}回复</div>
      <ul>
        <li v-for="(text,index) in post.replies">
          <div>
            <router-link :to="{
              name: 'userinfo',
              params: {
                logoname: text.author.loginname
              }
            }">
              <img :src="text.author.avatar_url">
            </router-link>
            <div>
              <div class="restitle clearfix">
                <div class="rul">
                  <router-link :to="{
                    name: 'userinfo',
                    params: {
                      logoname: text.author.loginname
                    }
                  }">
                    <span>{{text.author.loginname}}</span>
                  </router-link>
                  <span>{{index+1}}楼</span>
                  <span>{{text.create_at | timefil}}</span>
                </div>
                <div class="zan">
                  <span v-if="text.ups.length === 0"></span>
                  <span class="fa" v-else>{{text.ups.length}}</span>
                  <img @click="good" src="../assets/good.png">
                </div>
                <div class="restext">
                  <span v-html="text.content"></span>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Article',
  data: function(){
    return {
      post: {},
    }
  },
  methods:{
    getArt: function(){
      this.$axios.get(`https://cnodejs.org/api/v1/topic/${this.$route.params.id}`)
      .then(res=>{
        if(res.data.success === true){
          this.post = res.data.data
        }
      })
    },
    good(){
      console.log(点赞)
    }
  },
  beforeMount(){
    this.getArt()
  },
  watch:{
    '$route': function(to,from){
      this.getArt()
    }
  }
}
</script>

<style>
@import url('../assets/markdown-github.css');
.clearfix::before{
  content: '';
  display: block;
  clear: both;
}
.article{
  padding-bottom: 15px;
  width: 75%;
}
.article a{
  color: #08c;
}
.article>.main{
  display: flex;
  margin-top: 15px;
  width: 95%;
  margin-left: 5%;
  background: white;
  border-radius: 3px;
  flex-direction: column;
}
.article>.main>.topbar{
  margin-left: 10px;
  margin-bottom: 10px;
}
.article>.main>.fengexian{
  border-bottom: 1px solid #ddd;
}
.article>.main>#content h1,.article>.main>#content h2,.article>.main>#content h3,.article>.main>#content h4,.article>.main>#content h5,.article>.main>#content h6{
  margin-top: 10px;
}
.article>.main>#content{
  margin: 0 10px;
  padding: 10px;
  word-break: break-word;
  font-size: 14px;
}
.article>.main>.topbar>.tab{
  display: none;
}
.article>.main>.topbar>.good,.article>.main>.topbar>.top{
  background: #80bd01;
  padding: 2px 4px;
  color: #fff;
  font-size: 12px;
  border-radius: 3px;
  display: inline-block;
  vertical-align: top;
  margin: 29px 3px 0 0;
}
.article>.main>.topbar>.title{
  font-size: 22px;
  font-weight: 700;
  margin: 25px 0 8px 0;
  display: inline-block;
  vertical-align: bottom;
  width: 75%;
  line-height: 130%;
}
.article>.main>.topbar>ul{
  display: flex;
}
.article>.res{
  display: flex;
  margin-top: 15px;
  width: 95%;
  margin-left: 5%;
  background: white;
  border-radius: 3px;
  flex-direction: column;
}
.article>.res>div{
  padding: 10px;
  background-color: #f6f6f6;
  border-radius: 3px 3px 0 0
}
.article>.res>ul>li>div{
  display: flex;
  padding: 10px;
}
.article>.res>ul>li>div img{
  width: 30px;
  height: 30px;
  vertical-align: top;
}
.article>.res>ul>li>div>a{
  height: 30px;
}
.article>.res>ul>li>div>div{
  margin-left: 10px;
  width: 100%
}
.article>.res .restext{
  margin-left: 1em;
  margin-top:5px;
  font-size: 14px;
  margin-right: 10%;
  word-break: break-all;
}
.article>.res>ul>li{
  border-top: 1px solid #ddd;
}
.article>.res>ul>li:nth-child(1){
  border-top: none;
}
.article>.res>ul>li>div>div>.restitle{
  font-size: 12px;
}
.article>.res>ul>li>div>div>.restitle>.rul{
  display: inline-block;
}
.article>.res>ul>li>div>div>.restitle>.zan{
  float: right;
}
.article>.res>ul>li>div>div>.restitle>.zan>img{
  height: 15px;
  cursor: pointer;
  position: absolute;
  right: 28%;
  width: 15px;
}
.article>.res>ul>li>div>div>.restitle>.zan>.fa{
  line-height: 15px;
  font-size: 12px;
  position: absolute;
  right: 27%;
}
</style>
