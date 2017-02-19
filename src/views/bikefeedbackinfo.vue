<template>
  <div class="warp">
    <div class="mainbox">
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
        <ul class="lists" v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="10">
          <li v-for="(item,index) in list">
            <div class="tit flex-box"><h2>反馈时间：{{new Date(item.feedbackTime).format('yyyy-MM-dd hh:mm:ss')}}</h2>　<span
              class="state">{{item.feedbackState | setstate}}</span></div>
            <div class="con">
              <div class="list flex-box"><span class="label">反馈车辆编号:</span><span class="info green ">{{item.bike.bikeCode}}</span>
              </div>
              <div class="list flex-box"><span class="label">类型:</span><span class="info">{{item.fDataDetVal}}</span>
              </div>
              <div class="btns">
                <mt-button type="primary" @click.native="tobike(item.bike.bikeId)" size="small">定位</mt-button>
                <router-link v-bind:to="item.feedbackId | link('bikefeedbackinfo')"><mt-button type="primary" size="small">详情</mt-button></router-link>
                <mt-button type="danger" size="small" v-show="item.feedbackState==0" @click.native="setprocessed(item.feedbackId,index)">设为已处理</mt-button>
              </div>
            </div>
          </li>
        </ul>
      </mt-loadmore>
    </div>
  </div>
</template>
<style scoped>
.mint-search{height:auto;z-index:5}


</style>
<script>
import { Toast,Indicator } from 'mint-ui';
    export default{
        data(){
            return{
                msg:'hello vue',
                value:'',
                list:[],
                allLoaded:false,
                pageIndex:1,
                totalPage:100,
            }
        },
        created(){



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
                url:'/api/feedback/list.action',
                data:{pageIndex:_this.pageIndex},
                type:'post',
                success(data){
                Indicator.close();
                _this.totalPage=data.data.totalPage;
                if(_this.pageIndex>_this.totalPage){
                  Toast('数据加载完毕');
                  return;
                }
                  _this.pageIndex++;
                  _this.list=_this.list.concat(data.data.feedbackList)
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
          setprocessed(Id,index){
          var _this=this;
            $.ajax({
              url:'/api/feedback/update.action',
              data:{feedbackId:Id,feedbackState:2},
              type:'post',
              success(data){
                Toast('修改成功')
                var listsub=_this.list[index];
                listsub.feedbackState=2;
                _this.$set(_this.list, index, listsub)
                console.log(_this.active)
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
        filters:{

        }
    }

</script>
