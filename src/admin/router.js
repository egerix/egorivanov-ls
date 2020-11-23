import Vue from "vue"
import VueRouter from "vue-router"
import store from "./store";
import $axios from "./requests";

Vue.use(VueRouter)

import about from "./pages/about"
import login from "./pages/login"
import works from "./pages/works"
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
        path: "/works",
        components: {
            default: works,
            header: pagesHeader
        },
    },
    {
        path: "/login",
        component: login,
        meta: {
            public: true
        }
    },
]

const router = new VueRouter({routes});

router.beforeEach(async (to, from, next) => {
    const isPublicRoute = to.matched.some(route => route.meta.public);
    const isUserLoggedIn = store.getters["user/userIsLogged"];

    if (isPublicRoute === false && isUserLoggedIn === false) {
        const token = localStorage.getItem("token");

        $axios.defaults.headers["Authorization"] = `Bearer ${token}`;

        try {
            const response = await $axios.get("/user");
            await store.dispatch("user/loginUser", await response.data.user)
            next();
        } catch (error) {
            await router.replace("/login");
            localStorage.removeItem("token");
        }
    } else {
        next();
    }
});

export default router;