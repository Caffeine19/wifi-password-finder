import { computed, defineComponent } from 'vue'

import { storeToRefs } from 'pinia'

import { useWifiStore } from '@/stores/wifi'

import { THEME, useInjectTheme } from '@/hooks/useTheme'

export interface ActionButtonOption {
  iconClass: string
  action: Function
}

export const ActionButton = defineComponent({
  props: {
    iconClass: {
      type: String,
      required: true
    },
    action: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    return () => (
      <button
        class="group flex items-center justify-center rounded-md p-1 transition-colors hover:bg-ice-cream-700/5 dark:hover:bg-ice-cream-200/10"
        onClick={() => props.action()}
      >
        <i
          class={
            'ph  text-2xl text-slate-400 transition-colors group-hover:text-ice-cream-700 dark:text-neutral-400 dark:group-hover:text-ice-cream-200' +
            ' ' +
            props.iconClass
          }
        ></i>
      </button>
    )
  }
})

export const ThemeActionButton = defineComponent({
  setup() {
    const { theme, toggleTheme } = useInjectTheme()

    const iconClass = computed(() => {
      return theme?.value === THEME.DARK ? 'ph-moon' : 'ph-sun'
    })

    return () => (
      <ActionButton
        iconClass={iconClass.value}
        action={toggleTheme || (() => console.log('inject toggleTheme failed'))}
      ></ActionButton>
    )
  }
})

export const SortActionButton = defineComponent({
  setup() {
    const wifiStore = useWifiStore()
    const { sort } = storeToRefs(wifiStore)

    const iconClass = computed(() => {
      return sort.value === 'a-to-z' ? 'ph-sort-ascending' : 'ph-sort-descending'
    })

    return () => (
      <ActionButton iconClass={iconClass.value} action={wifiStore.toggleSort}></ActionButton>
    )
  }
})
