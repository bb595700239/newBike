<template>
  <div class="warp">
    <div class="mainbox">
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
      <ul class="lists" v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10">
        <li >
          <div class="tit flex-box"><h2>车辆编号：{{$route.params.id}}</h2></div>
          <div class="con">
            <table class="g-table">
              <thead><tr><td>租赁时间</td><td>完成时间</td><td>租赁账号</td></tr></thead>
              <tbody>
                <tr v-for="item in list"><td>{{item.rentStarttime | datetime}}</td><td>{{item.rentEndtime | datetime('空')}}</td><td>{{item.user.userTel}}</td></tr>
              </tbody>
            </table>
          </div>
        </li>
      </ul>
      </mt-loadmore>
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
                msg:'hello vue',
                value:'',
                result:['jou','chou','joubn'],
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
          init(){
            Indicator.open({
                text: '加载中...',
                spinnerType: 'fading-circle'
              });
             var _this=this;
              $.ajax({
                url:'/api/bikeMessage/rentInfoList.action',
                data:{pageIndex:_this.pageIndex,bikeId:_this.$route.params.id},
                type:'post',
                success(data){
                 _this.code=data.code
                _this.totalPage=data.data.totalPage;
                if(_this.pageIndex>_this.totalPage){
                  Toast('数据加载完毕');
                  Indicator.close();
                  return;
                }
                  _this.pageIndex++;
                  _this.list=_this.list.concat(data.data.bikeRentInfoList)
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
              }, 1000);
            }

        },
        filters:{
        }
    }
</script>
