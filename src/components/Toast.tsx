import { computed, defineComponent } from 'vue'

import { useInjectToast } from '@/hooks/useToast'
const Toast = defineComponent({
  setup() {
    const { isToastShowing, toastProps } = useInjectToast()
    const phIconStyle = computed(() => {
      const newVal =
        'text-7xl' +
        ' ' +
        (toastProps?.value.iconClass || '') +
        ' ' +
        (toastProps?.value.iconColor || 'text-slate-400 dark:text-neutral-400')

      return newVal
    })
    return () =>
      isToastShowing?.value ? (
        <div class="fixed  left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl bg-white p-4 shadow-2xl shadow-slate-600/5 dark:bg-neutral-800 dark:shadow-neutral-950/40">
          <i class={phIconStyle.value}></i>
        </div>
      ) : undefined
  }
})

export default Toast
