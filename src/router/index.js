import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';
import ErrorLayout from '@/layouts/ErrorLayout.vue';
import MainView from '@/views/MainView.vue';
import UiLibraryView from '@/views/UiLibraryView.vue';
import ArticlesView from '@/views/ArticlesView.vue';
import ArticleView from '@/views/ArticleView.vue';
import NotFoundView from '@/views/NotFoundView.vue';

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: MainView,
      },
      {
        path: 'uilib',
        name: 'uiLibrary',
        component: UiLibraryView,
      },
      {
        path: 'articles',
        name: 'articles',
        component: ArticlesView,
      },
      {
        path: 'article/:id',
        name: 'article',
        component: ArticleView,
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    component: ErrorLayout,
    children: [
      {
        path: '',
        name: 'notfound',
        component: NotFoundView,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
