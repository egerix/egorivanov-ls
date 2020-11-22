import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

import about from "./pages/about"
import login from "./pages/login"
import pagesHeader from "./components/pagesHeader";

const routes = [
    {
        path: "/",
        components: {
            default: about,
            header: pagesHeader
        }
    },
    {
        path: "/login",
        component: login
    },
]

export default new VueRouter({routes})