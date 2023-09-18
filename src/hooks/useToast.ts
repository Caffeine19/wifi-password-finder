import { inject, provide, ref, type InjectionKey, type Ref } from 'vue'

type IIsShowingToast = boolean
interface IToastProps {
  iconClass?: string
  iconColor?: string
}
interface IShowToast {
  (iconProps: IToastProps, autoHide?: boolean): void
}
interface IHideToast {
  (): void
}

const isToastShowingKey = Symbol('isToastShowingKey') as InjectionKey<Ref<IIsShowingToast>>
const toastPropsKey = Symbol('toastProps') as InjectionKey<Ref<IToastProps>>
const showToastKey = Symbol('showToast') as InjectionKey<IShowToast>
const hideToastKey = Symbol('hideToast') as InjectionKey<IHideToast>

export const useProvideToast = () => {
  const isToastShowing = ref<IIsShowingToast>(false)
  provide(isToastShowingKey, isToastShowing)

  const toastProps = ref<IToastProps>({
    iconClass: undefined,
    iconColor: undefined
  })
  provide(toastPropsKey, toastProps)

  const showToast: IShowToast = (t: IToastProps, autoHide = true) => {
    isToastShowing.value = true
    toastProps.value = t

    if (autoHide) setTimeout(() => hideToast(), 1000)
  }
  provide(showToastKey, showToast)

  const hideToast: IHideToast = () => {
    isToastShowing.value = false
    toastProps.value = { iconClass: undefined, iconColor: undefined }
  }
  provide(hideToastKey, hideToast)
}

export const useInjectToast = () => {
  const isToastShowing = inject(isToastShowingKey)
  const toastProps = inject(toastPropsKey)

  const showToast = inject(showToastKey)
  const hideToast = inject(hideToastKey)

  return {
    isToastShowing,
    toastProps,
    showToast,
    hideToast
  }
}

export const loadingToastProps: IToastProps = {
  iconClass: 'ph ph-spinner-gap animate-spin'
}
export const succeededToastProps: IToastProps = {
  iconClass: 'ph ph-check',
  iconColor: 'text-ice-cream-800 dark:text-ice-cream-200'
}
export const failedToastProps: IToastProps = {
  iconClass: 'ph ph-bug',
  iconColor: 'text-chocolate-500 dark:text-chocolate-300'
}
