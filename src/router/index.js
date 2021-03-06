import VueRouter from "vue-router";
import Vue from 'vue'
import index from "@/pages/index";
import Login from "@/pages/index/Login";
import Register from "@/pages/index/Register";
import Organization from "@/pages/organization/Organization";
import OrganizationIndex from "@/pages/organization/index";
import CoursesIndex from "@/pages/courses/index";
import CoursesForm from "@/pages/courses/CoursesForm";
import Home from "@/pages/index/Home";
import store from '@/store'
import { checkUserLogin, getUserInfo, logout } from "../api/user";
import rootAdminRoutes from "./rootAdmin";
import normalRoutes from "./normal";
import NotFound from "../pages/common/NotFound";
import insitutionAdminRoutes from "./institutionAdmin";
import OrganizationRegister from "@/pages/organization/OrganizationRegister";
import OrganizationDetail from "@/pages/organization/OrganizationDetail";
import CoursesDetail from "../pages/courses/CoursesDetail";
import CoursesList from "../pages/courses/CoursesList";
import InformationsList from "../pages/infomations/List";
import InformationDetail from "../pages/infomations/Detail";
import http from "../utils/http"
import { MessageBox } from 'element-ui';
import GlimpseIndex from '@/pages/Glimpse/index';
import Glimpse from '@/pages/Glimpse/glimpse';
import Glimpse2 from '@/pages/Glimpse/glimpse2';
import GlimpseDialog from '@/pages/Glimpse/glimpseDialog'
Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: index,
        children: [
            { path: '', component: Home, name: 'Home' },
            { path: 'login', component: Login, name: 'Login' },
            { path: 'register', component: Register, name: 'Register' },
            {
                path: 'organization/', component: OrganizationIndex, children: [
                    { path: '', component: Organization, name: 'Organization' },
                    { path: 'register', component: OrganizationRegister, name: 'OrganizationRegister' },
                    { path: ':id', component: OrganizationDetail, name: 'OrganizationDetail' },
                ]
            },
            {
                path: 'courses/', component: CoursesIndex, children: [
                    { path: '', component: CoursesList, name: 'CoursesList' },
                    { path: 'form', component: CoursesForm, name: 'CoursesFormIndex' },
                    { path: ':id', component: CoursesDetail, name: 'CoursesDetail' },
                ]
            },
            {
                path: 'informations/', component: CoursesIndex, children: [
                    { path: '', component: InformationsList, name: 'InformationList' },
                    { path: ':id', component: InformationDetail, name: 'InformationDetail' }
                ]
            },
            {
                path : 'glimpse/', component : GlimpseIndex , children: [
                    {path : '', component : Glimpse , name: "Glimpse" },
                    {path : 'test' , component : Glimpse2},
                    {path: 'glimpse', component : GlimpseDialog}

                ]
            }
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
});

const permitAllRoutes = [
    '/login',
    '/register',
    '/',
    '/organization',
    '/courses',
    '/informations'
];

router.beforeEach((to, from, next) => {
    if (to.path.includes("/logout")) {
        logout();
        localStorage.removeItem("id");
        store.dispatch('setRole', "")
        next({ path: '/login' })
    }
    if (localStorage.getItem("id") !== null && localStorage.getItem("id").length !== 0) {
        checkUserLogin().then((res) => {
            if (!res.status) {
                logout();
                localStorage.removeItem("id")
            }
        })
    }
    if (permitAllRoutes.some((item) => to.path.indexOf(item) !== -1) || store.getters.role.length !== 0) {
        if (localStorage.getItem("id") !== null && localStorage.getItem("id").length !== 0) {
            http.get(`/api/accounts/${localStorage.getItem("id")}`).then(({ data: res }) => {
                store.dispatch('setUserInfoAndRole', res);
                store.dispatch('setAvator', res.avator);
                if (res.role === 99) {
                    router.addRoutes(rootAdminRoutes);
                } else if (res.role === 8) {
                    router.addRoutes(insitutionAdminRoutes)
                }
                else if (res.role === 0 || res.role === 1 || res.role === 2) {
                    router.addRoutes(normalRoutes);
                }
                router.addRoutes([{
                    path: "*",
                    component: NotFound
                }])
                next({ path: to.path })
            })
            // getUserInfo(localStorage.getItem("id")).then((res) => {
            //     store.dispatch('setUserInfoAndRole', res);
            //     if (res.role === 99) {
            //         router.addRoutes(rootAdminRoutes);
            //     } else if (res.role === 8) {
            //         router.addRoutes(insitutionAdminRoutes)
            //     }
            //     else if (res.role === 0 || res.role === 1 || res.role === 2) {
            //         router.addRoutes(normalRoutes);
            //     }
            //     next({ path: to.path })
            // })
        }
        next()
    }
    else {
        if (localStorage.getItem("id") === null || localStorage.getItem("id").length === 0) {
            //alert(localStorage.getItem("id"));
            //alert("请先登录！");
            next({ path: '/login' })
        } else {
            if (store.getters.role.length === 0) {
                checkUserLogin().then((res) => {
                    if (!res.status) {
                        next({ path: '/login' })
                        localStorage.setItem("id", "")
                    } else {
                        getUserInfo(localStorage.getItem("id")).then((res) => {
                            store.dispatch('setUserInfoAndRole', res);
                            store.dispatch('setAvator', res.avator);
                            if (res.role === 99) {
                                router.addRoutes(rootAdminRoutes);
                            } else if (res.role === 8) {
                                router.addRoutes(insitutionAdminRoutes)
                            }
                            else if (res.role === 0 || res.role === 1 || res.role === 2) {
                                router.addRoutes(normalRoutes);
                            }
                            router.addRoutes([{
                                path: "*",
                                component: NotFound
                            }])
                            next({ path: to.path })
                        })
                    }
                })
            }
        }
    }
    if (to.path.includes("/organization/register")) {
        http.get('/api/institutions/enroll/list').then(({ data: { enrolls } }) => {
            if (enrolls.length !== 0) {
                MessageBox({
                    title: '您已申请',
                    message: '请耐心等待审核通过',
                    confirmButtonText: '确定'
                })
                next('/')
            }
        }).then(() => {
            next()
        })
    }
});


export default router
