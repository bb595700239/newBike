<template>
  <div class="warp">
    <div class="mainbox">
      <div class="subTit">车辆信息</div>
      <div class="textleft">
      <mt-cell title="车辆编号" value="89757"></mt-cell>
      <mt-cell title="车辆状态" value="空闲"></mt-cell>
      <mt-cell title="最后租赁时间" value=" 2016/11/14 17:20"></mt-cell>
      <mt-cell title="最后租赁用户" value="15167194108"></mt-cell>
      <mt-cell title="最后维护时间" value="2016/10/14 17:30"></mt-cell>
      </div>
      <div class="bikeinfomain flex-box">
        <mt-button type="primary" size="large">车辆信息</mt-button>
        <mt-button type="primary" size="large">反馈信息</mt-button>
        <mt-button type="primary" size="large">车辆维护</mt-button>
        <mt-button type="primary" size="large">保险申请</mt-button>
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
    export default{
        data(){
            return{
                msg:'hello vue'
            }
        },
        components:{

        }
    }
</script>
