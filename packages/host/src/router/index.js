import {createRouter, createWebHistory} from 'vue-router';
import routeManifest from '../routeManifest';

const getRoutes = () => {
  return routeManifest.map((mfe) => ({
    path: mfe.route.path,
    name: mfe.route.name,
    meta: {
      ...mfe.route.meta,
    },
    component: () => import('@/components/Loader.vue'),
  }));
};

const routes = [...getRoutes(),
  {
    path: '/',
    name: 'Home',
    component: () => import('@/components/Home.vue'),
  },
  {
    'path': '/login',
    'name': 'Login',
    'component': () => import('@/components/Login.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
