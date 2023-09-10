import type { WifiPassword } from '@/types/wifi'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useWifiStore = defineStore('wifi', () => {
  const wifiPasswordList = ref<WifiPassword[]>([])
  const getWifiPasswordList = async () => {
    try {
      const newVal = await window.electronAPI.getWifiPasswordList()
      console.log('🚀 ~ file: wifi.ts:10 ~ getWifiPasswordList ~ newVal:', newVal)
      if (newVal) wifiPasswordList.value = newVal
    } catch (error) {
      console.log(error)
    }
  }

  const nameSearchKeyWord = ref<string>()
  const filteredWifiDetailList = computed(() => {
    if (!nameSearchKeyWord.value) {
      return wifiPasswordList.value
    } else {
      return wifiPasswordList.value.filter((wifi) =>
        wifi.name.toLowerCase().includes(nameSearchKeyWord.value?.toLocaleLowerCase() || '')
      )
    }
  })

  return {
    wifiPasswordList,
    getWifiPasswordList,
    nameSearchKeyWord,
    filteredWifiDetailList
  }
})
