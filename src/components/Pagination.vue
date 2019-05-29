<template>
  <div class="paginatio">
    <div class="view">
      <button @click="changepage">首页</button>
      <button @click="changepage">上一页</button>
      <button v-if="xxx">.....</button>
      <button v-for="btn in pages" @click="changepage(btn)" :class="[{active: targetpage === btn} , 'page']">
        {{btn}}
      </button>
      <button @click="changepage">下一页</button>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'Pagination',
  data: function(){
    return {
      pages: [1,2,3,4,5,'.....'],
      targetpage: 1,
      xxx: false
    }
  },
  methods: {
    changepage: function(n){
      if(typeof n != 'number'){
        switch(n.target.innerText){
          case '上一页' : $(`.view>.active`).prev().click()
            break
          case '下一页' : $(`.view>.active`).next().click()
            break
          case '首页' : 
            this.pages = [1,2,3,4,5,'.....']
            this.changepage(1)
            break
          default :
            break
        }
        return
      }
      this.targetpage = n
      if(n === this.pages[4]){
        this.pages.shift()
        this.pages.splice(4,0,this.pages[3]+1)
        this.pages.splice(0,1,'.....')
      }else if(n === this.pages[1] && n !== 2){
        this.pages.splice(1,0,this.pages[1]-1)
        this.pages.splice(4,2,this.pages[3]+1)
      }else if(n <= 4){
        this.pages = [1,2,3,4,5,'.....']
      }
      this.$emit('updata' , this.targetpage)
    }
  },
}
</script>

<style scoped>
.paginatio{
  background: #f6f6f6;
  border: 1px solid #ccc;
}
.paginatio .view{
  margin: 10px;
}
.paginatio .view button{
  margin: 3px;
  padding: 5px;
  cursor: pointer;
}
.paginatio .view button.active{
  background: #ccc;
  cursor:default;
  border-color: buttonface;
  border-image: initial;
  color: buttontext;
  border-style: inset;
  outline: none;
}
.page{
  width: 30px;
}
</style>
