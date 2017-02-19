/**
 * Created by joubn on 2016/12/6.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
import login from '../views/login'
import about from '../views/about'
import user from '../views/user'
import bike from '../views/bike'
import bikeinfo from '../views/bikeinfo'
import bikeinfosearch from '../views/bikeinfosearch'
import bikeDetails from '../views/bikeDetails'
import bikeLeaseDetails from '../views/bikeLeaseDetails'
import bikeMaintainDetails from '../views/bikeMaintainDetails'
import bikemaintaininfo from '../views/bikemaintaininfo'
import bikefeedbackinfo from '../views/bikefeedbackinfo'
import bikeFeedbackDetails from '../views/bikeFeedbackDetails'
import bikeStateEdit from '../views/bikeStateEdit'
import insurance from '../views/insurance'
import bikeLocation from '../views/bikeLocation'
import bikeInformation from '../views/bikeInformation'

export default new VueRouter({
  routes:[{
    path:'/about',
    name:'我要理财',
    component:about
  },{
    path:'/login',
    name:'登录',
    component:login
  },{
    path:'/user',
    name:'我的账户',
    component:user
  },{
    path:'/bike',
    name:'主页',
    component:bike
  },{
    path:'/bikeinfo',
    name:'车辆信息',
    component:bikeinfo
  },{
    path:'/bikeinfosearch',
    name:'车辆信息查询',
    component:bikeinfosearch
  },{
    path:'/bikeinfosearch/:id',
    name:'车辆详细信息',
    component:bikeDetails
  },{
    path:'/bikeLeaseDetails/:id',
    name:'车辆租赁信息',
    component:bikeLeaseDetails
  },{
    path:'/bikemaintaininfo',
    name:'车辆维护信息',
    component:bikemaintaininfo
  },{
    path:'/bikeMaintainDetails/:id',
    name:'车辆维护详情',
    component:bikeMaintainDetails
  },{
    path:'/bikefeedbackinfo',
    name:'车辆反馈信息',
    component:bikefeedbackinfo
  },{
    path:'/bikefeedbackinfo/:id',
    name:'车辆反馈详情',
    component:bikeFeedbackDetails
  },{
    path:'/bikeStateEdit/:id',
    name:'车辆状态修改',
    component:bikeStateEdit
  },{
    path:'/insurance',
    name:'保险申请',
    component:insurance
  },{
    path:'/bikeLocation',
    name:'车辆定位',
    component:bikeLocation
  },{
    path:'/bikeInformation/:id',
    name:'车辆扫一扫信息',
    component:bikeInformation
  },{
    path:'*',
    component:login
  }]
})
