import { onMounted, defineComponent, provide, watch, type Ref } from 'vue'

import { RouterView } from 'vue-router'

import { useWifiStore } from '@/stores/wifi'

import { useStorage } from './hooks/useStorage'

import { THEME } from './types/theme'

import { themeKey, toggleThemeKey } from './symbols/theme'

export default defineComponent({
  setup() {
    const wifiStore = useWifiStore()
    onMounted(async () => {
      await wifiStore.getWifiPasswordList()
    })

    //主題深色模式淺色模式切換
    const theme = useStorage('theme', null) as Ref<THEME>
    provide(themeKey, theme)
    const toggleTheme = () => {
      theme.value = theme.value == THEME.LIGHT ? THEME.DARK : THEME.LIGHT
    }
    provide(toggleThemeKey, toggleTheme)

    watch(
      theme,
      (newVal) => {
        if (newVal === THEME.DARK) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      },
      { immediate: true }
    )

    onMounted(() => {
      if (
        theme.value === THEME.DARK ||
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
      ) {
        theme.value = THEME.DARK
      } else {
        theme.value = THEME.LIGHT
      }
    })

    return () => (
      <div class="custom-scrollbar h-screen w-screen overflow-auto bg-slate-50 dark:bg-neutral-900">
        <RouterView></RouterView>
      </div>
    )
  }
})
