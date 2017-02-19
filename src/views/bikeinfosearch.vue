<template>
  <div class="warp">
    <mt-search v-model="value" :result.sync="result"></mt-search>
    <div class="mainbox">

      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
        <ul class="lists" v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="10">
          <li v-for="item in list">
            <div class="tit flex-box"><h2>车辆编号：{{item.bikeCode}}</h2></div>
            <div class="con">
              <div class="list flex-box"><span class="label">车辆状态:</span><span class="info green ">{{item.bikeState | setstate}}</span>
              </div>
              <div class="list flex-box"><span class="label">最后租赁时间:</span><span class="info">{{item.bikeLastRentTime | datetime('无租赁记录')}}</span>
              </div>
              <div class="btns">
                <mt-button @click.native="tobike(item.bikeId)" type="primary" size="small">定位</mt-button>
                <router-link v-bind:to="item.bikeId | link('bikeinfosearch')">
                  <mt-button type="primary" size="small">详情</mt-button>
                </router-link>

                <router-link v-bind:to="item.bikeId | link('bikeStateEdit')">
                  <mt-button type="danger" size="small">状态修改</mt-button>
                </router-link>
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
                result:[],
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
          init(search){
            Indicator.open({
                text: '加载中...',
                spinnerType: 'fading-circle'
              });
             var _this=this;
             if(search){_this.pageIndex=1}
              $.ajax({
                url:'/api/bikeMessage/bikeRentDetailSearch.action',
                data:{pageIndex:_this.pageIndex,bikeCode:_this.value},
                type:'post',
                success(data){
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
              }, 300);
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
