<template>
  <div class="warp">
    <div class="mainbox">
      <div class="textleft">
        <mt-cell title="状态" v-bind:value="feedbackState | setstate"></mt-cell>
        <mt-cell title="反馈时间" v-bind:value="new Date(con.feedbackTime).format('yyyy/MM/dd')"></mt-cell>
        <mt-cell title="反馈车辆编号" v-bind:value="bike.bikeCode"></mt-cell>
        <mt-cell title="类型" v-bind:value="con.fDataDetVal"></mt-cell>
        <img v-bind:src="con.feedbackPicaddress">
        <mt-cell title="信息内容" v-bind:value="con.feedbackContent"></mt-cell>
        <div class="surebtn">
          <mt-button type="danger" disabled size="large" v-show="feedbackState==2">已处理</mt-button>
          <mt-button type="danger" size="large" v-show="feedbackState==0" @click.native="setprocessed(con.feedbackId)">设为已处理</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .textleft{text-align:left;}
  .bikeinfomain{flex-wrap: wrap; margin:3%;}
  .bikeinfomain button{width: 46%; margin:  2%;}
</style>
<script>
import { Toast,Indicator } from 'mint-ui';
    export default{
        data(){
            return{
                con:'',
                bike:'',
                feedbackState:'',
            }
        },
        created(){



          Indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
          });
         var _this=this;
          $.ajax({
            url:'/api/feedback/detail.action',
            data:{feedbackId:_this.$route.params.id},
            type:'post',
            success(data){
              _this.con=data.data.feedback;
              _this.bike=data.data.feedback.bike;
              _this.feedbackState=data.data.feedback.feedbackState;
              console.log(_this.con)
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
          setprocessed(Id,index){
          var _this=this;
            $.ajax({
              url:'/api/feedback/update.action',
              data:{feedbackId:Id,feedbackState:2},
              type:'post',
              success(data){
                Toast('修改成功')
                _this.feedbackState=2;

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
