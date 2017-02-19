<template>
  <div class="warp">
    <div class="mainbox">
    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
    <ul
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10">
      <li class="listitem" v-for="item in list">{{ item }}</li>
    </ul>
    </mt-loadmore>
     </div>
    </div>
</template>

<script>
export default {
  name: 'about',
  data () {
    return {
      msg: 'about us',
      list:[1,2,3],
      allLoaded:false,
    }
  },
  methods:{
    loadTop(id){
      this.$refs.loadmore.onTopLoaded(id)
    },
    loadBottom(id){
    this.allLoaded=true;
      this.$refs.loadmore.onBottomLoaded(id)
    },
    loadMore() {
  this.loading = true;
  setTimeout(() => {
    let last = this.list[this.list.length - 1];
    for (let i = 1; i <= 10; i++) {
      this.list.push(last + i);
    }
    this.loading = false;
  }, 1000);
}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
