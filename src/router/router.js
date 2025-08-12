import { createRouter, createWebHistory} from "vue-router";
import HomeView from "@/views/HomeView.vue";
import DetailView from "@/views/DetailView.vue";
const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeView,
    },
    {
        path: '/detail',
        name: 'Detail',
        component: DetailView,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;