import { onMounted, defineComponent, provide, watch, type Ref } from 'vue'

import { RouterView } from 'vue-router'

import { useStorage } from './hooks/useStorage'
import { useProvideToast } from './hooks/useToast'

import { THEME } from './types/theme'

import { themeKey, toggleThemeKey } from './symbols/theme'

import Toast from './components/Toast'

export default defineComponent({
  setup() {
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

    useProvideToast()

    return () => (
      <div class="custom-scrollbar h-screen w-screen overflow-auto bg-slate-50 dark:bg-neutral-900">
        <Toast></Toast>

        <RouterView></RouterView>
      </div>
    )
  }
})
