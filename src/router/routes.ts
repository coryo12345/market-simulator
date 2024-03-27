import { RouteRecordRaw } from 'vue-router';
import Home from '../pages/Home.vue';

export const ROUTES: RouteRecordRaw[] = [
  { path: '/', name: 'MarketSim', component: Home },
];
