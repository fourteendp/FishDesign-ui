/*
 * @Description:
 * @Date: 2022-07-04 16:46:02
 */
import { ref } from 'vue';
import { isFunction } from '../../../../tools/check';

export const useTable = (config: any) => {
  const pageIsLoading = ref<boolean>(false);
  const pageAllData = ref<Array<any>>([]);
  const paginationTotal = ref<number>(0);

  const getList = async (query: any) => {
    if (pageIsLoading.value) return;
    pageIsLoading.value = true;
    try {
      if (isFunction(config.getListAjax)) {
        const res = await config.getListAjax(query);
        pageAllData.value = res.data.data;
        paginationTotal.value = res.data.totalPages;
      }
    } catch (error) {
      console.warn(error);
    }
    pageIsLoading.value = false;
  };

  return {
    pageIsLoading,
    pageAllData,
    paginationTotal,
    getList
  };
};
