import { defineStore } from "pinia"
import type { UserInfo } from "@/types"

export const useStore = defineStore("user-info", {
  state: () => {
    return {
      token: "",
      msgId: null as ReturnType<typeof setTimeout> | null,
      userInfo: null as UserInfo | null,
    }
  },
  persist: {
    storage: persistedState.localStorage,
  },
})
