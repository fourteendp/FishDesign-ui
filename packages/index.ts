/*
 * @Description:
 * @Date: 2022-06-30 22:57:28
 */

import { App } from 'vue';
const version = require('../package.json').version;
import '../styles/element/index.scss';
import {
  DefaultProps,
  useSetGlobalDefaultProps
} from './hooks/use-default-props';
import * as AllComponents from './components';

// 所有组件列表
const components = Object.values(AllComponents).map(i => i);

const install = (app: App, defaultProps: DefaultProps): void => {
  useSetGlobalDefaultProps(defaultProps);
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
