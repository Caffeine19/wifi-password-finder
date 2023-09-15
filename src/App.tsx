import { defineComponent } from 'vue'

import { RouterView } from 'vue-router'

import { useProvideToast } from './hooks/useToast'

import { useProvideTheme } from './hooks/useTheme'

import Toast from './components/Toast'

export default defineComponent({
  setup() {
    useProvideToast()

    useProvideTheme()

    return () => (
      <div class="custom-scrollbar h-screen w-screen overflow-auto bg-slate-50 dark:bg-neutral-900">
        <Toast></Toast>

        <RouterView></RouterView>
      </div>
    )
  }
})
