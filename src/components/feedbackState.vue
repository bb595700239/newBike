<template>
  <mt-button type="default" disabled size="small" v-show="item.feedbackState==2">已处理</mt-button>
  <mt-button type="danger" size="small" v-show="item.feedbackState==0" @click.native="setprocessed(item.feedbackId,index)">设为已处理</mt-button>
</template>



