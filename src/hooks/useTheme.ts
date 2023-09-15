import { provide, type InjectionKey, type Ref, watch, onMounted, inject } from 'vue'

import { useStorage } from '@/hooks/useStorage'

export enum THEME {
  LIGHT,
  DARK
}

interface IToggleTheme {
  (): void
}

const themeKey = Symbol('theme') as InjectionKey<Ref<THEME>>

const toggleThemeKey = Symbol('toggleTheme') as InjectionKey<IToggleTheme>

export const useProvideTheme = () => {
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
}

export const useInjectTheme = () => {
  const theme = inject(themeKey)
  const toggleTheme = inject(toggleThemeKey)

  return {
    theme,
    toggleTheme
  }
}
