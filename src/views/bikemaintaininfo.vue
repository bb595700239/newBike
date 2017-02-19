<template>
  <div class="warp">
    <mt-search v-model="value" :result.sync="result"></mt-search>
    <div class="flex-box btnbox"><mt-button type="primary" size="large" @click.native="allfixstart">一键维护开始</mt-button><mt-button type="danger" size="large" @click.native="allfixend">一键维护结束</mt-button></div>

    <div class="mainbox">

      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
      <ul class="lists"  v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10">
        <li v-for="(item,index) in list">
          <div class="tit flex-box"><h2>车辆编号：{{item.bikeCode}}</h2></div>
          <div class="con">
            <div class="list flex-box"><span class="label">车辆状态:</span><span class="info green ">{{item.bikeState | setstate}}</span></div>
            <div class="list flex-box"><span class="label">最后维护时间:</span><span class="info">{{item.fixLasttime | datetime('无维护记录')}}</span></div>
            <div class="btns">
              <mt-button @click.native="tobike(item.bikeId)" type="primary" size="small">定位</mt-button>
              <router-link v-bind:to="item.bikeCode | link('bikeMaintainDetails')"><mt-button type="primary" size="small">维护记录</mt-button></router-link>

            <mt-button type="danger" size="small" v-show="item.bikeState==3" @click.native="endfix(item.bikeId,index)">维护结束</mt-button>
            <mt-button type="primary" size="small" v-show="item.bikeState==0||item.bikeState==4" @click.native="startfix(item.bikeId,index)">维护开始</mt-button>
          </div>
        </li>
      </ul>
      </mt-loadmore>
    </div>
  </div>
</template>
<style scoped>
.mint-search{height:auto;z-index:5}
.btnbox{margin: 5px;}
.btnbox button{margin:5px;}

</style>
<script>
import { Toast,Indicator } from 'mint-ui';
    export default{
        data(){
            return{
                msg:'hello vue',
                value:'',
                result:[],
                list:[],
                allLoaded:false,
                pageIndex:1,
                totalPage:1,
                code:'',
            }
        },
        created(){


        },
        components:{

        },
        methods:{
          init(search){
            Indicator.open({
                text: '加载中...',
                spinnerType: 'fading-circle'
              });
             var _this=this;
             if(search){_this.pageIndex=1}
              $.ajax({
                url:'/api/bikeMessage/bikeDetailSearch.action',
                data:{pageIndex:_this.pageIndex,bikeCode:_this.value},
                type:'post',
                success(data){
                _this.code=data.code
                _this.totalPage=data.data.totalPage;
                Indicator.close();
                if(_this.pageIndex>_this.totalPage){
                  Toast('数据加载完毕');
                  return;
                }
                if(search){_this.list=data.data.bikeList;return}
                  _this.pageIndex++;
                  _this.list=_this.list.concat(data.data.bikeList)

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
              }, 1000);
            },
            startfix(id,index){
                 var _this=this;
                $.ajax({
                  url:'/api/bikeMessage/fixBike.action',
                  data:{bikeId:id,bikeState:3},
                  type:'post',
                  success(data){
                    Toast('维护中')
                    var listsub=_this.list[index];
                    listsub.bikeState=3;
                    _this.$set(_this.list, index, listsub)
                  },
                  error(){
                    Toast('网络连接失败')
                  }
                })
            },
            endfix(id,index){
                 var _this=this;
                $.ajax({
                  url:'/api/bikeMessage/finishFixBike.action',
                  data:{bikeId:id,bikeState:0},
                  type:'post',
                  success(data){
                    Toast('维护结束')
                    var listsub=_this.list[index];
                    listsub.bikeState=0;
                    _this.$set(_this.list, index, listsub)
                  },
                  error(){
                    Toast('网络连接失败')
                  }
                })
            },
            allfixstart(){
              Indicator.open({
                text: '提交中...',
                spinnerType: 'fading-circle'
              });
              var bikeIds='';
               var _this=this;
               $.each(_this.list,function(i){
                  bikeIds+=_this.list[i].bikeId+','
               })
                console.log(bikeIds)
                $.ajax({
                  url:'/api/bikeMessage/fixAllBike.action',
                  data:{bikeIds:bikeIds},
                  type:'post',
                  success(data){
                    Toast('维护开始')
                    $.each(_this.list,function(i){
                        var listsub=_this.list[i];
                        listsub.bikeState=3;
                        _this.$set(_this.list, i, listsub)
                     })
                     Indicator.close()
                  },
                  error(){
                    Toast('网络连接失败')
                  }
                })
            },
            allfixend(){
            Indicator.open({
                text: '提交中...',
                spinnerType: 'fading-circle'
              });
              var bikeIds='';
               var _this=this;
               $.each(_this.list,function(i){
                  bikeIds+=_this.list[i].bikeId+','
               })
                console.log(bikeIds)
                $.ajax({
                  url:'/api/bikeMessage/fixAllBike.action',
                  data:{bikeIds:bikeIds},
                  type:'post',
                  success(data){
                    Toast('维护结束')
                    $.each(_this.list,function(i){
                        var listsub=_this.list[i];
                        listsub.bikeState=0;
                        _this.$set(_this.list, i, listsub)
                     })
                     Indicator.close()
                  },
                  error(){
                    Toast('网络连接失败')
                  }
                })
            },
          tobike(id){
            location.href='/html/map.html?bikeid='+id
          }

        },
        watch:{
          value:{
              deep: true,
              handler: function(val, oldVal) {
                this.init(true)
              }
          }
        },
        filters:{
        }
    }
</script>
