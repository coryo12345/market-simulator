import { RouteRecordRaw } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import StockPage from '../pages/StockPage.vue';
import MainMenu from '../pages/MainMenu.vue';
import NewGamePage from '../pages/load/NewGamePage.vue';
import ContinuePage from '../pages/load/ContinuePage.vue';
import FromFilePage from '../pages/load/FromFilePage.vue';

export const ROUTES: RouteRecordRaw[] = [
  { path: '/', name: 'menu', component: MainMenu },
  { path: '/load/new', component: NewGamePage },
  { path: '/load/continue', component: ContinuePage },
  { path: '/load/fromFile', component: FromFilePage },
  { path: '/dashboard', name: 'home', component: HomePage },
  { path: '/stock/:abbr', name: 'stock', component: StockPage },
];
