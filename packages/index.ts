/*
 * @Description:
 * @Date: 2022-06-30 22:57:28
 */

import { App } from 'vue';
import { version } from '../package.json';
import '../styles/element/index.scss';

import * as AllComponents from './components';

// 所有组件列表
const components = Object.values(AllComponents).map(i => i);

const install = (app: App): void => {
  components.map(component => {
    app.component(component.name, component);
  });
};

export * from './components';
export * from './functions';
export * from './types';

export default {
  version: version,
  install
};
