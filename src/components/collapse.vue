<template>
  <ul class="collapse">
    <li>
      <div class="tit" @click="open1=!open1">资料填写<span>{{ open1 ? '-' : '+' }}</span></div>
      <div class="con" v-show="open1" @keyup.enter="goto1">
        意外保险申请：

          <mt-field label="用户账号" placeholder="请输入账号" v-model.trim="account"></mt-field>
          <mt-field label="用户姓名" placeholder="请输入姓名" v-model.trim="username"></mt-field>
          <mt-field label="身份证号" placeholder="请输入身份证号" v-model.trim="usercard"></mt-field>
          <mt-field label="申请理由" placeholder="申请理由" v-model.trim="reason"></mt-field>
          <div class="surebtn">
            <mt-button type="primary" v-if="!edit1" size="large" @click.native="goto1">确定</mt-button>
            <mt-button type="danger" v-if="edit1" size="large" @click.native="goto1">修改</mt-button>
          </div>
      </div>
    </li>
    <li>
      <div class="tit" @click="open2=!open2">事故照片上传<span>{{ open2 ? '-' : '+' }}</span></div>
      <div class="con" v-show="open2">
        事故全景照片上传：
        <div class="weui_cells margin0">
          <div class="weui_cell">
            <div class="uploadpic">
              <div class="imgb flex-box">
                <img v-bind:src="img1" alt="">
                <input class="fileact none" @change="uploadfile" id="img1" type="file">
              </div>
              <p class="label">
                事故全景照片上传</p>

            </div>
            <div class="uploadpic">
              <div class="imgb flex-box">
                <img v-bind:src="img2" alt="">
                <input class="fileact none" @change="uploadfile" id="img2" type="file">
              </div>
              <p class="label">事故损伤局部照片上传</p>

            </div>

          </div>
        </div>

        <div class="surebtn">
          <mt-button type="primary" size="large" @click.native="goto2">确定</mt-button>
        </div>
      </div>
    </li>
    <li>
      <div class="tit" @click="open3=!open3">处理照片上传<span>{{ open3 ? '-' : '+' }}</span></div>
      <div class="con" v-show="open3">
        赔偿协议书照片上传：
        <div class="weui_cells margin0">
          <div class="weui_cell">
            <div class="uploadpic">
              <div class="imgb flex-box">
                <img v-bind:src="img3" alt="">
                <input class="fileact none" @change="uploadfile" id="img3" type="file">
              </div>
              <p class="label">
                赔偿协议书照片上传</p>

            </div>
            <div class="uploadpic">
              <div class="imgb flex-box">
                <img v-bind:src="img4" alt="">
                <input class="fileact none" @change="uploadfile" id="img4" type="file">
              </div>
              <p class="label">
                身份证照片上传</p>

            </div>
            <div class="uploadpic">
              <div class="imgb flex-box">
                <img v-bind:src="img5" alt="">
                <input class="fileact none" @change="uploadfile" id="img5" type="file">
              </div>
              <p class="label">赔偿处理结果证明照片上传</p>

            </div>

          </div>
        </div>
        <div class="surebtn">
          <mt-button type="primary" size="large" @click.native="goto3">确定</mt-button>
        </div>
      </div>
    </li>
  </ul>
</template>
<style scoped>
.collapse{margin:0 10px;}
.collapse li{border:1px solid #eee;}
.collapse li .tit{height:40px; line-height:40px; background:#ddd;    cursor: pointer; position: relative;padding:0 10px;}
.collapse li .tit span{    position: absolute;right:10px; top:1px;}
.collapse li .con{padding:10px;}
.addrate{position: absolute;color: #faa054 !important;font-size: 12px !important; padding-left: 2px;}
.uploadpic,.removepic,.addpic{ width: 40%; margin: 10px 5%;　position: relative;}
.uploadpic img,.removepic img,.addpic img{width: 100%;}
.uploadpic .label{color: #8b8b8b; margin-top: 5px; text-align: center;}
.uploadpic .imgb,.removepic .imgb,.addpic .imgb{position: relative; height: 100px; overflow: hidden; background: #eee; border-radius: 10px;}
.uploadpic .imgb:after,.removepic .imgb:after,.addpic .imgb:after{content: '上传'; width: 80px; height: 30px; border-radius: 20px; background: rgba(0,0,0,.5); color: #fff; font-size: 16px; position: absolute;top: 50%; left: 50%; margin-top: -15px; margin-left: -40px;text-align: center; line-height: 30px;}
.none{position:absolute; left:0;top:0; width:100%; height:100%;opacity: 0;z-index:99999;}
.weui_cell{padding: 8px 10px;position: relative;display: -webkit-box;display: -webkit-flex;display: flex;-webkit-box-align: center;-webkit-align-items: center;align-items: center; border-top: 1px solid #e0e0e0;min-height: 35px;}
</style>
<script>
import { Toast,Indicator } from 'mint-ui';
  import MegaPixImage from '../assets/js/megapix-image.js';


    export default{
        data() {
            return {
                open1: true,
                open2: false,
                open3: false,
                account:'',
                username:'',
                usercard:'',
                reason:'',
                img1:'',
                img2:'',
                img3:'',
                img4:'',
                img5:'',
                edit1:false,
                insuranceId:null,


            }
        },
        methods:{
            goto1(){

            if(this.account==''){
              Toast('用户账号不能为空')
              return
            }
            if(this.username==''){
              Toast('用户姓名不能为空')
              return
            }
            if(this.usercard==''){
              Toast('身份证号不能为空')
              return
            }
            if(this.reason==''){
              Toast('申请理由不能为空')
              return
            }
            var _this=this;
            var url='';
            if(this.edit1){
              url='/api/insurance/editInsurance.action';
            }else{
              url='/api/insurance/subInsurance.action';
            }

               $.ajax({
                url:url,
                data:{phone:_this.account,name:_this.username,idCard:_this.usercard,reason:_this.reason,insuranceId:_this.insuranceId},
                type:'post',
                success(data){
                  var mess='';
                  switch(data.message){
                    case 'nouser': mess='用户账号不存在';break;
                    case 'name': mess='用户姓名有误';break;
                    case 'idCard': mess='身份证号有误';break;
                  }
                  if(mess==''){
                    Toast('数据提交成功');
                    _this.open1=false;
                    _this.open2=true;
                    if(!_this.edit1){
                      _this.insuranceId=data.data.insuranceId;
                    }
                    _this.edit1=true;
                    console.log(data.data.insuranceId)
                  }else{
                    Toast(mess);
                  }

                },
                error(){
                  Toast('网络连接失败')
                }
              })
            },
            goto2(){
              console.log(this.insuranceId)
            if(this.insuranceId==null){
              Toast('请先填写完个人资料');
              return
            }
            var _this=this;
               $.ajax({
                url:'/api/insurance/subAccidentPhoto.action',
                data:{panoramaFiles:_this.img1,partFiles:_this.img2,insuranceId:_this.insuranceId},
                type:'post',
                success(data){
                   Toast('数据提交成功');
                   _this.open2=false;
                   _this.open3=true;
                },
                error(){
                  Toast('网络连接失败')
                }
              })
            },
            goto3(){
            if(this.insuranceId==null){
              Toast('请先填写完个人资料');
              return
            }
            var _this=this;
               $.ajax({
                url:'/api/insurance/subDealWithPhoto.action',
                data:{identityFiles:_this.img3,compensateFile:_this.img4,resultProveFile:_this.img5,insuranceId:_this.insuranceId},
                type:'post',
                success(data){
                   Toast('数据提交成功');
                   _this.open3=false;
                },
                error(){
                  Toast('网络连接失败')
                }
              })
            },
            uploadfile(e) {
            var id=e.target.id;
            if (e.target.files.length == 0) {
                return
            }

            var file = e.target.files[0];
            if (!/image\/\w+/.test(file.type)) {
                $.alert("请确保文件为图像类型");
                return false;
            }

             var _this=this;
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function(e) {

                var image = new Image();
                image.src = this.result;
                image.onload = function() {
                    var resized = resizeMe(image);
                    if(!resized){
                        return;
                    }

                 _this[id]=resized;



                }

            }
             //判断访问终端
            var browser={
                versions:function(){
                    var u = navigator.userAgent;
                    return {
                        trident: u.indexOf('Trident') > -1, //IE内核
                        presto: u.indexOf('Presto') > -1, //opera内核
                        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
                        mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                        iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
                        iPad: u.indexOf('iPad') > -1, //是否iPad
                        webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
                        weixin: u.toLowerCase().match(/MicroMessenger/i) == 'micromessenger', //是否微信
                        qq: u.match(/\sQQ/i) == " qq" //是否QQ
                    };
                }()
            };
            //通过canvas截取固定大小（宽度为max_width，高自适应）的图片
            function resizeMe(img,maxW,maxH,nocheck) {
                var canvas = document.createElement('canvas');
                var width = img.width;
                var height = img.height;
                var max_width = maxW || 640;
                var max_height = maxH || 640;
                var max_size = 300;//k
                if (width > max_width) {
                    height *= max_width / width;
                    height = Math.round(height);
                    width = max_width;
                }
                if(height > max_height){
                    width *= max_height / height;
                    width = Math.round(width);
                    height = max_height;
                }
                //将图片放入canvas，并重置canvas大小
                if(browser.versions.ios || browser.versions.webApp){
                    var mpImg = new MegaPixImage(img);
                    mpImg.render(canvas, { width: width, height: height });
                }else{
                    canvas.width = width;
                    canvas.height = height;
                    var ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0, width, height);
                }
                var res, quality = .7,resSize,ratio = 1;
                res = canvas.toDataURL("image/jpeg",quality); // 截取canvas对应的jpg图片，并且画质为70%（默认就是70%，可以改变）

                // Android 2.x、Android 4.1.2、4.3 的 toDataURL 不支持jpeg格式；
                if(res.substr(0,"data:image/png".length) == "data:image/png" || res.substr(0,6) == "data:,"){
                    var encoder = new JPEGEncoder();
                    res = encoder.encode(canvas.getContext("2d").getImageData(0,0,width,height), quality * 100, true);
                }
                resSize = Math.ceil(res.length/1024); //k
                if(resSize > max_size && !nocheck){
                    ratio = Math.ceil(Math.sqrt(max_size/resSize)*100)/100;
                    if(ratio >= .9){
                        ratio -= .1;
                    }
                    res = resizeMe(img,max_width*ratio,max_height*ratio,true);
                }
                return res;
            }




        }

        }
    }
</script>
