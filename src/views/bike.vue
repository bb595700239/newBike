<template>
  <div class="warp">
    <div class="mainbox dtbg">
      <div class="messtop flex-box"><i class="icon-notificationfill"></i>您有新的反馈信息及时处理</div>
      <i class="icon icon-location local" @click="tomain"></i>
      <div class="bikemain flex-box">
        <router-link to="bikeinfosearch"><mt-button type="primary" size="large">车辆信息</mt-button></router-link>
        <router-link to="bikefeedbackinfo"><mt-button type="primary" size="large">反馈信息</mt-button></router-link>
        <router-link to="bikemaintaininfo"><mt-button type="primary" size="large">车辆维护</mt-button></router-link>
        <router-link to="insurance"><mt-button type="primary" size="large">保险申请</mt-button></router-link>
      </div>
      <mt-button type="danger" class="sys" @click.native="scancode">扫一扫</mt-button>
    </div>


  </div>
</template>

<style scoped>
.sys{position:absolute;width:100px; left:50%;bottom:20px; margin-left:-50px;    border-radius: 23px;}
</style>
<script>
  const wx=require('weixin-js-sdk');
  import { Radio,Indicator,Toast  } from 'mint-ui';
    export default{
        data(){
            return{
                msg:'hello vue'
            }
        },
        methods:{
          tomain(){
            location.href="/watchbike.html";
          },
          scancode(){
            var hidstr = "url="+encodeURIComponent(window.location.href.split('#')[0]);
		    			   $.ajax({
		    			       url : "/api/bikeMessage/scanCode.action",
		    			       data:hidstr,
		    			       async : true,
		    			       type : "post",
		    			       dataType:"json",
		    			       success : function(data) {

		    			    	   wx.config({
		    			    		      debug: false,
		    			    		      appId: data.appId,
		    			    		      timestamp: data.timestamp,
		    			    		      nonceStr: data.nonceStr,
		    			    		      signature: data.signature,
		    			    		      jsApiList: [
		    			    		        'scanQRCode'
		    			    		      ]
		    			    		  });
		    			    	   wx.ready(function () {
		    				    	   wx.scanQRCode({
		    				    		    needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
		    				    		    scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
		    				    		    success: function (res) {
		    				    		    var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
		    				    		    var results=[];
		    				    		    results=result.split("?bike=",2);
		    				    		    if(results[1]!=undefined){
		    				    		      location.href="/#/bikeInformation/"+results[1];
		    				    		    }else{
		    				    		    	Toast("您扫码的二维码有误，请您选择正确的二维码");

		    				    		    }
		    				    		}
		    				    		});
		    			    	   })

		    			       },
		    			       error : function() {
		    			       }
		    			   });
          }
        },
        components:{

        }
    }
</script>
