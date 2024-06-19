import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useOptionsStore = defineStore('options', () => {
  const defaultOptions = {
    showHints: true
  };

  const options = ref<any>(
    JSON.parse(
      localStorage.getItem('options') || JSON.stringify(defaultOptions)
    )
  );

  watch(
    options,
    (value) => {
      localStorage.setItem('options', JSON.stringify(value));
    },
    { deep: true }
  );

  return {
    options
  };
});
