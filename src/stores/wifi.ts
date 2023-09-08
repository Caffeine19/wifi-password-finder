import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

export interface WifiDetailValue {
  profile?: {
    [key: string]: string
  }
  connectivity?: { [key: string]: string }
  security?: { [key: string]: string }
  cost?: { [key: string]: string }
}

export interface WifiDetail {
  name: string
  value: WifiDetailValue
}

export const useWifiStore = defineStore('wifi', () => {
  const wifiNameList = ref<string[]>([])
  const getWifiNameList = async () => {
    try {
      const res = await window.electronAPI.getWifiNameList()
      console.log('🚀 ~ file: App.tsx:6 ~ onMounted ~ res:', res)

      const newVal = res
        .split('\n') // 将字符串按行分割为数组
        .map((line) => line.trim()) // 去除每行的首尾空格
        .filter((line) => line.startsWith('All User Profile')) // 仅保留以 "All User Profile" 开头的行
        .map((line) => line.split(':')[1].trim()) // 提取冒号后面的部分，并去除首尾空格

      //按照a-z排序
      newVal.sort((a, b) => {
        return a.localeCompare(b, 'zh-Hans-CN', { sensitivity: 'accent' })
      })
      wifiNameList.value = newVal
    } catch (error) {
      console.error(error)
    }
  }

  const wifiDetailList = ref<WifiDetail[]>([])
  const parseWifiDetail = (detail: string) => {
    const wifiDetail: WifiDetailValue = {}

    const lines = detail.trim().split('\n')

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()

      if (line === 'Profile information') {
        wifiDetail.profile = {}
      } else if (line === 'Connectivity settings') {
        wifiDetail.connectivity = {}
      } else if (line === 'Security settings') {
        wifiDetail.security = {}
      } else if (line === 'Cost settings') {
        wifiDetail.cost = {}
      } else {
        const [key, value] = line.split(':').map((item) => item.trim())

        if (wifiDetail.cost) {
          wifiDetail.cost[key] = value
        } else if (wifiDetail.security) {
          wifiDetail.security[key] = value
        } else if (wifiDetail.connectivity) {
          wifiDetail.connectivity[key] = value
        } else if (wifiDetail.profile) {
          wifiDetail.profile[key] = value
        }
      }
    }

    return wifiDetail
  }
  const getWifiDetailList = async () => {
    try {
      const taskList = wifiNameList.value.map((name) => window.electronAPI.getWifiDetail(name))
      const res = await Promise.all(taskList)
      console.log('🚀 ~ file: wifi.ts:24 ~ getWifiDetailList ~ res:', res)

      const parsedRes = res.map((r) => (r ? parseWifiDetail(r) : {}))
      console.log('🚀 ~ file: wifi.ts:74 ~ getWifiDetailList ~ parsedRes:', parsedRes)

      const newVal = wifiNameList.value.map((name, index) => {
        return {
          name,
          value: parsedRes[index]
        }
      })

      wifiDetailList.value = newVal
    } catch (error) {
      console.log(error)
    }
  }

  const nameSearchKeyWord = ref<string>()
  const filteredWifiDetailList = computed(() => {
    if (!nameSearchKeyWord.value) {
      return wifiDetailList.value
    } else {
      return wifiDetailList.value.filter((wifi) =>
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
        wifiDetailList.value.sort((a, b) => {
          return a.name.localeCompare(b.name, 'zh-Hans-CN', { sensitivity: 'accent' })
        })
      } else {
        wifiDetailList.value.sort((a, b) => {
          return -a.name.localeCompare(b.name, 'zh-Hans-CN', { sensitivity: 'accent' })
        })
      }
    },
    { immediate: true }
  )

  return {
    wifiNameList,
    getWifiNameList,
    wifiDetailList,
    getWifiDetailList,
    nameSearchKeyWord,
    filteredWifiDetailList,
    sort,
    toggleSort
  }
})
