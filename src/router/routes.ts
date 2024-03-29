import { RouteRecordRaw } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import StockPage from '../pages/StockPage.vue';

export const ROUTES: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/stock/:abbr', name: 'stock', component: StockPage },
];
