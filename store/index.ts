import { defineStore } from "pinia"

export const useStore = defineStore("user-info", {
  state: () => {
    return {
      token: "hello pinia",
    }
  },
  persist: {
    storage: persistedState.localStorage,
  },
})
