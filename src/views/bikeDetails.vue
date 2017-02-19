<template>
  <div class="warp">
    <div class="mainbox">
      <ul class="lists">
        <li>
          <div class="tit flex-box"><h2>车辆编号：{{$route.params.id}}</h2></div>
          <div class="con">
            <div class="list flex-box"><span class="label">租赁信息：</span></div>
            <table class="g-table">
              <thead>
              <tr>
                <td>租赁时间</td>
                <td>完成时间</td>
                <td>租赁账号</td>
              </tr>
              </thead>
              <tbody>
              <tr v-for="item in rentInfo">
                <td>{{item.rentStarttime | datetime}}</td>
                <td>{{item.rentEndtime | datetime('租赁中')}}</td>
                <td>{{item.user.userTel}}</td>
              </tr>
              </tbody>
            </table>
            <div class="btns">
              <router-link v-bind:to="$route.params.id | link('bikeLeaseDetails')">
                <mt-button type="primary" size="large">查看更多</mt-button>
              </router-link>
            </div>

            <div class="list flex-box"><span class="label">维护信息：</span></div>
            <table class="g-table">
              <thead>
              <tr>
                <td>维护批次</td>
                <td>维护开始</td>
                <td>完成时间</td>
              </tr>
              </thead>
              <tbody>
              <tr v-for="item in fixInfoList">
                <td>{{item.fixBatchNumber}}</td>
                <td>{{item.fixStarttime | datetime}}</td>
                <td>{{item.fixEndtime | datetime('维护中')}}</td>
              </tr>
              </tbody>
            </table>
            <div class="btns">
              <router-link v-bind:to="$route.params.id | link('bikeMaintainDetails')">
                <mt-button type="primary" size="large">查看更多</mt-button>
              </router-link>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
  .textleft{text-align:left;}
  .bikeinfomain{flex-wrap: wrap; margin:3%;}
  .bikeinfomain button{width: 46%; margin:  2%;}
  .lists .btns button{margin:0px;}

</style>
<script>
import { Toast,Indicator } from 'mint-ui';
    export default{
        data(){
            return{
                value:'',
                fixInfoList:[],
                rentInfo:[],
            }
        },
        created(){



          Indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
          });
         var _this=this;
          $.ajax({
            url:'/api/bikeMessage/checkMessage.action',
            data:{bikeId:_this.$route.params.id},
            type:'post',
            success(data){
              _this.fixInfoList=data.data.bikeFixInfoList
              _this.rentInfo=data.data.bikeRentInfo
              Indicator.close();
            },
            error(){
              Toast('网络连接失败')
            }
          })
        },
        components:{

        },
        methods:{


        },
        filters:{

        }
    }

</script>
