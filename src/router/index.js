import Vue from 'vue'
import Router from 'vue-router'
import Postlist from '../components/Postlist'
import Article from '../components/Article'
import Userinfo from '../components/Userinfo'
import Slidebar from '../components/Slidebar'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'root',
      path: '/',
      components: {
        main: Postlist
      }
    },
    {
      name: 'posttext',
      path: '/topic/:id&:logoname',
      components: {
        main: Article,
        slide: Slidebar,
      }
    },
    {
      name: 'userinfo',
      path: '/user/:logoname',
      components: {
        main: Userinfo,
        slide: Slidebar,
      }
    }
  ],
  
})
