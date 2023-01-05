/*
 * @Description:
 * @Date: 2022-07-09 22:47:03
 */
import { provideGlobalConfig } from 'element-plus';
import locale from 'element-plus/lib/locale/lang/zh-cn';

export const setGlobalNamespace = (namespace = 'fd') => {
  provideGlobalConfig({ namespace, locale });
};
