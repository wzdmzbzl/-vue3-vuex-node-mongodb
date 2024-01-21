import { defineStore } from "pinia";

export const useUserStore = defineStore("UserStore", {
  state: () => ({}),

  actions: {},
  // 设置为true，缓存state
  persist: true,
});
