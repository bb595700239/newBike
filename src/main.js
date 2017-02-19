"use strict"

import Vue from 'vue'
import router from './router'
import mint from 'mint-ui'
import zepto from 'webpack-zepto'
//import fastclick from 'fastclick'
import filters from 'assets/js/filters'

import 'mint-ui/lib/style.css'
import 'assets/font/iconfont.css'
import 'assets/css/base.css'

window.$ = zepto
Vue.use(mint)
// fastclick.attach(document.body)

// 实例化Vue的filter
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));


router.afterEach((to,from,next)=>{//路由切换结束的钩子方法
  var $body = $('body');
  $('.loading').hide();
  // hack在微信等webview中无法修改document.title的情况
  document.title = to.name||'登录';
  var $iframe = $('<iframe src="/favicon.ico"></iframe>');
  $iframe.on('load',function() {
    setTimeout(function() {
      $iframe.off('load').remove();
    }, 0);
  }).appendTo($body);

  //判断登陆状态
  $.ajax({
    url:'/api/admin/getAdmin.action',
    type:'post',
    success(data){
      if(data.message=='unlogin'){
        router.push({path:'/login'})
      }
    },
    error(){
      Toast('网络连接失败')
    }
  })

})

new Vue({
  router,
  //store,
  //render: h => h(App)
}).$mount('#app')
