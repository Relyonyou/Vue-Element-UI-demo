import Vue from 'vue'
import VueRouter from 'vue-router'
import StuManage from '../views/StuManage.vue'
import AddStu from '../views/AddStu.vue'
import UpdStu from '../views/UpdStu.vue'
import PageFour from '../views/PageFour.vue'
import index from '../index.vue'
Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    name:'学生',
    component:index,
    redirect:'/StuManage',
    children:[
      {
        path: '/StuManage',
        name: '学生信息',
        component: StuManage,
        children:[
          
        ]
      },
      {
        path: '/AddStu',
        name: '添加学生',
        component: AddStu
      }
    ]
  },
  
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
