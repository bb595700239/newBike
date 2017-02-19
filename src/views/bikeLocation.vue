<template>
  <div class="warp">
    <div class="mainbox">
      <div class="subTit">车辆状态修改</div>
      <div class="textleft">
      <mt-cell title="车辆编号" value="89757"></mt-cell>
      </div>
      <mt-radio
        title="状态列表"
        v-model="value"
        :options="options">
      </mt-radio >
      <div class="surebtn">
        <mt-button type="primary" size="large" @click.native="eidtState">确定</mt-button>
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
import { Radio,Indicator,Toast  } from 'mint-ui';
    export default{
        data(){
            return{
                value:'',
                options:[
                  {
                    label: '空闲中',
                    value: '0'
                  },
                  {
                    label: '临时还车',
                    value: '1'
                  },
                  {
                    label: '租借中',
                    value: '2'
                  },
                  {
                    label: '维护中',
                    value: '3'
                  },
                  {
                    label: '锁定中',
                    value: '4'
                  }
                ]
            }
        },created(){
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
                url:'/api/bikeMessage/bikePosition.action',
                data:{bikeId:_this.$route.params.id},
                type:'post',
                success(data){
                  _this.value=data.data.bike.bikeState.toString();

                  Indicator.close();
                },
                error(){
                  Toast('网络连接失败')
                }
              })
          },
          loadTop(id){
              this.$refs.loadmore.onTopLoaded(id)
              console.log(this.$refs.loadmore)
            },
            loadBottom(id){
            this.allLoaded=true;
              this.$refs.loadmore.onBottomLoaded(id)
            },
            loadMore() {
              this.loading = true;
              setTimeout(() => {
                this.init()
                this.loading = false;
              }, 300);
            },
            eidtState(){
            var _this=this;
              $.ajax({
                url:'/api/bikeMessage/updateBikeState.action',
                data:{bikeId:_this.$route.params.id,bikeState:_this.value},
                type:'post',
                success(data){

                  Toast('修改成功')
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
