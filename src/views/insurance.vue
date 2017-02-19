

<template>
  <div class="warp">
    <div class="mainbox">
      <div class="textleft">
        <collapse message="ss"></collapse>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .textleft{text-align:left;}
  .mainbox{padding:20px 0;}
  .bikeinfomain{flex-wrap: wrap; margin:3%;}
  .bikeinfomain button{width: 46%; margin:  2%;}
</style>
<script>

  import collapse from '../components/collapse.vue';
    export default{
        data(){
            return{
                msg:'hello vue'
            }
        },
        components: {
        props: ['message'],
            collapse
        }

    }
</script>
