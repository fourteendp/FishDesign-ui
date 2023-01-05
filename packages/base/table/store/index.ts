/*
 * @Description:
 * @Date: 2022-03-14 19:18:12
 */

import { reactive } from 'vue';

export const useTableSetup = () => {
  const info = reactive<{ selectionRows: Map<number | string, any> }>({
    selectionRows: new Map()
  });

  return {
    selectionRows: info.selectionRows,
    hasSelectionRow: (rowId: number | string) => {
      return info.selectionRows.has(rowId);
    },
    addSelectionRow: (rowId: number | string, row: any) => {
      info.selectionRows.set(rowId, row);
    },
    removeSelectionRow: (rowId: number | string) => {
      info.selectionRows.delete(rowId);
    },
    getSelectionRows: () => {
      const arr: Array<any> = [];
      info.selectionRows.forEach(value => {
        arr.push(value);
      });
      return arr;
    },
    clearSelectionRows: () => {
      info.selectionRows.clear();
    }
  };
};
