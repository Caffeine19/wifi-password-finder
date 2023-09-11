import type { WifiPassword } from '@/types/wifi'
import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

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

  const sort = ref<'a-to-z' | 'z-to-a'>('a-to-z')
  const toggleSort = () => {
    sort.value = sort.value === 'a-to-z' ? 'z-to-a' : 'a-to-z'
  }
  watch(
    sort,
    (newVal) => {
      if (newVal === 'a-to-z') {
        wifiPasswordList.value.sort((a, b) => {
          return a.name.localeCompare(b.name, 'zh-Hans-CN', { sensitivity: 'accent' })
        })
      } else {
        wifiPasswordList.value.sort((a, b) => {
          return -a.name.localeCompare(b.name, 'zh-Hans-CN', { sensitivity: 'accent' })
        })
      }
    },
    { immediate: true }
  )

  return {
    wifiPasswordList,
    getWifiPasswordList,
    nameSearchKeyWord,
    filteredWifiDetailList,
    sort,
    toggleSort
  }
})
