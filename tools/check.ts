/*
 * @Description:
 * @Date: 2022-07-01 11:46:30
 */
import { check } from 'xrk-tools';

export function isFunction<T = Function>(val: unknown): val is T {
  return check.isFunction(val) || check.isAsyncFunction(val);
}
