<template>
  <div id="app">
    <!--    <router-link tag="a" to="/index">首页</router-link>
        <router-link tag="a" to="/about">about</router-link>-->

    <!--<mt-header v-bind:title="selected">-->
      <!--<mt-button icon="more" slot="right"></mt-button>-->
    <!--</mt-header>-->
    <router-view></router-view>

    <!--<mt-tabbar v-model="selected">-->
      <!--<mt-tab-item id="首页" @click.native="goRouter(1)">-->
        <!--<i slot="icon" class="icon-home"></i>-->
        <!--首页-->
      <!--</mt-tab-item>-->
      <!--<mt-tab-item id="我要理财" @click.native="goRouter(2)">-->
        <!--<i slot="icon" class="icon-sponsor"></i>-->
        <!--我要理财-->
      <!--</mt-tab-item>-->
      <!--<mt-tab-item id="我的账户" @click.native="goRouter(3)">-->
        <!--<i slot="icon" class="icon-profile"></i>-->
        <!--我的账户-->
      <!--</mt-tab-item>-->
    <!--</mt-tabbar>-->
    <!--<mt-palette-button content="+" @expand="main_log('expand')" @expanded="main_log('expanded')" @collapse="main_log('collapse')"
                       direction="rt" class="mainbtn" :radius="80" ref="target_1" mainButtonStyle="color:#fff;background-color:#26a2ff;"
                       style="left:30px;">
      <div class="my-icon-button indexicon icon-likefill" @touchstart="sub_log(1)"></div>
      <div class="my-icon-button indexicon icon-favorfill" @touchstart="sub_log(2)"></div>
      <div class="my-icon-button indexicon icon-wangfill" @touchstart="sub_log(3)"></div>
    </mt-palette-button>-->
  </div>
</template>

<script>
//import {Header,Tabbar,TabItem} from 'mint-ui'

export default {
  name: 'app',
  data () {
    return {
      selected: '首页'

    }
  },
  created(){
      this.$router.afterEach((to,from,next)=>{//路由切换结束的钩子方法
      var $body = $('body');
        document.title = to.name;
        // hack在微信等webview中无法修改document.title的情况
        var $iframe = $('<iframe src="/favicon.ico"></iframe>');
        $iframe.on('load',function() {
            setTimeout(function() {
                $iframe.off('load').remove();
            }, 0);
        }).appendTo($body);
        var _this=this;
        $.ajax({
            url:'/api/admin/getAdmin.action',
            type:'post',
            success(data){
              if(data.message=='unlogin'){
                _this.$router.push({path:'login'})
              }
            },
            error(){
              Toast('网络连接失败')
            }
          })
      })
   },
  methods:{
    main_log(val) {
        console.log('main_log', val);
      },
      sub_log(val) {
        console.log('sub_log', val);
        this.$refs.target_1.collapse();
      },
    goRouter(index){
      switch(index){
        case 1:this.$router.push({path:'login'});break;
        case 2:this.$router.push({path:'about'});break;
        case 3:this.$router.push({path:'user'});break;
      }
    }
  }
}
</script>

<style >

</style>
