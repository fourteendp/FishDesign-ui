/*
 * @Description:
 * @Date: 2022-07-08 16:44:33
 */

import App from './app.vue';
import { createApp } from 'vue';

import El from '../../packages/index';

createApp(App).use(El).mount('#example');
