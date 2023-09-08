import { computed, defineComponent, inject } from 'vue'

import { themeKey, toggleThemeKey } from '@/symbols/theme'
import { THEME } from '@/types/theme'
import { useWifiStore } from '@/stores/wifi'
import { storeToRefs } from 'pinia'

const ActionButton = defineComponent({
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

const Footer = defineComponent({
  setup() {
    const theme = inject(themeKey)
    const toggleTheme =
      inject(toggleThemeKey) ||
      (() => {
        console.log('inject toggle theme failed')
      })

    const wifiStore = useWifiStore()
    const { sort } = storeToRefs(wifiStore)

    const actionButtonOption = computed(() => [
      {
        iconClass: sort.value === 'a-to-z' ? 'ph-sort-ascending' : 'ph-sort-descending',
        action: wifiStore.toggleSort
      },
      { iconClass: theme?.value === THEME.DARK ? 'ph-moon' : 'ph-sun', action: toggleTheme },
      { iconClass: 'ph-confetti', action: () => console.log('tada') }
    ])

    return () => (
      <div class="fixed bottom-0 left-0 right-0 z-10  flex w-full items-center justify-center space-x-6 border-t border-slate-100 bg-white p-3 shadow-md shadow-slate-600/5 dark:border-neutral-700 dark:bg-neutral-800 dark:shadow-neutral-950/40">
        {actionButtonOption.value.map((bt) => (
          <ActionButton iconClass={bt.iconClass} action={bt.action}></ActionButton>
        ))}
      </div>
    )
  }
})
export default Footer
