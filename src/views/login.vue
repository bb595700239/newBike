<template>
  <div class="warp">
    <div class="mainbox" @keyup.enter="goto">
      <div class="subTit">单车管理员登录</div>
      <div class="itembox">
        <mt-field label="用户名" placeholder="请输入用户名" v-model.trim="username"></mt-field>
        <mt-field label="密码" placeholder="请输入密码" type="password" v-model.trim="password"></mt-field>
      </div>
      <div class="remember flex-box">
        <mt-switch v-model="value"></mt-switch>
        记住账号
      </div>
      <div class="surebtn">
        <mt-button type="primary" size="large" @click.native="goto">确定</mt-button>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .remember{margin:10px;}
  .remember label{margin-right:10px;}
</style>
<script>
import { Toast } from 'mint-ui';
    export default{
        data(){
            return{
              value:false,
              username:'',
              password:''
            }
        },
        created(){
          if(localStorage['rememberAccount']){
            this.value=true;
            this.username=localStorage['rememberAccount'];
          };
        },
        components:{

        },
        methods:{
          goto(){
          if(this.value){
            localStorage['rememberAccount']=this.username;
          }else{
            localStorage['rememberAccount']='';
          }

            if(this.username==''){
              Toast('用户名不能为空')
              return
            }
            if(this.password==''){
              Toast('密码不能为空')
              return
            }
            var _this=this;
            $.ajax({
              url:'/api/admin/login.action',
              data:{username:_this.username,password:_this.password},
              type:'post',
              success(data){
                   if(data.message=='success'){
                      _this.$router.push({path:'bike'});
                   }else{
                      Toast(data.message)
                   }


              },
              error(data){
                Toast(data.messaage)
              }
            })

          }
        }
    }
</script>

