import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/login'
import register from '../components/register'
import student from '../components/student/student'
import allBook from '../components/student/allBook'
import myBorrow from '../components/student/myBorrow'
import root from '../components/root/root'
import rootAllBook from '../components/root/rootAllBook'
import addBook from '../components/root/addBook'
import allBorrow from '../components/root/allBorrow'
import setting from '../components/root/setting'





Vue.use(VueRouter)
const router = new VueRouter({
    mode: 'history',
    routes:[
        
        {
            path:"/",
            name:"login",
            component:login
        },
        {
            path:"/register",
            name:"register",
            component:register
        },
        {
            path:"/student",
            name:"student",
            component:student,
            children:[
                {
                    path:"books",
                    name:"books",
                    component:allBook
                },
                {
                    path:"myBorrow",
                    name:"myBorrow",
                    component:myBorrow
                }
            ]
        },
        {
            path:"/root",
            name:"root",
            component:root,
            children:[
                {
                    path:"books",
                    component:rootAllBook
                },
                {
                    path:"addBook",
                    component:addBook
                },
                {
                    path:"allBorrow",
                    component:allBorrow
                },
                {
                    path:"setting",
                    component:setting
                },
            ]
        }
    ]
})
router.beforeEach((to, from, next) => {
    let token = localStorage.getItem('Authorization');
    let isRoot = localStorage.getItem('isRoot');
    if(to.path == '/'){
        if(token){
            if(isRoot){
                next('/root');
            }else{
                next('/student');
            }
        }else{
            next();
        }
    }else if(to.path == '/register'){
        next();
    }else{
        if(!token){
            next('/');
        }else{
            next();
        }
    }
})
export default router
