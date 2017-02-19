<template>
  <div class="warp">
    <div class="mainbox">
        <ul class="lists">
          <li>
            <div class="con">
              <div class="list flex-box"><span class="label">车辆编号:</span>{{con.bikeCode}}<span class="info green "></span>
              </div>
              <div class="list flex-box"><span class="label">车辆状态:</span>{{con.bikeState | setstate}}<span class="info"></span>
              </div>
              <div class="list flex-box"><span class="label">最后租赁时间:</span>{{con.bikeLastRentTime | datetime('无租赁记录')}}<span class="info"></span>
              </div>
              <div class="list flex-box" v-if="user"><span class="label">最后租赁用户:</span>{{user.userTel}}<span class="info"></span>
              </div>
              <div class="list flex-box"><span class="label">最后维护时间:</span>{{con.fixLasttime | datetime('无租赁记录')}}<span class="info"></span>
              </div>
              <div class="btns">
                <div class="btnsli flex-box">
                  <router-link v-bind:to="con.bikeId | link('bikeinfosearch')"><mt-button type="primary" size="small">信息查看</mt-button></router-link>
                  <router-link v-bind:to="con.bikeId | link('bikeMaintainDetails')"><mt-button type="primary" size="small">维护操作</mt-button></router-link>
                </div>
                <div class="btnsli flex-box">
                  <router-link v-bind:to="con.bikeId | link('bikeStateEdit')"><mt-button type="danger" size="small" @click.native="">状态修改</mt-button></router-link>
                  <router-link to="/bike"><mt-button type="danger" size="small" @click.native="">返回主页</mt-button></router-link>
                </div>
              </div>
            </div>
          </li>
        </ul>
    </div>
  </div>
</template>
<style scoped>
.mint-search{height:auto;z-index:5}
.btns .btnsli a{-webkit-box-flex: 1;-webkit-flex: 1;flex: 1; width:100%;text-align:center;    display: -webkit-flex;
    display: flex;}
.btns .btnsli button{margin:5px;-webkit-box-flex: 1;-webkit-flex: 1;flex: 1;}
</style>
<script>
import { Toast,Indicator } from 'mint-ui';
    export default{
        data(){
            return{
                con:'',
                user:'',
            }
        },
        created(){

          this.init()

        },
        components:{

        },
        methods:{
          init(){
          Indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
          });
         var _this=this;
          $.ajax({
            url:'/api/bikeMessage/bikeMessage.action',
            data:{bikeCode:_this.$route.params.id},
            type:'post',
            success(data){
                _this.con=data.data.bike;
                _this.user=data.data.user;
              Indicator.close();
            },
            error(){
              Toast('网络连接失败')
            }
          })
          }

        },
        filters:{
        }
    }

</script>
