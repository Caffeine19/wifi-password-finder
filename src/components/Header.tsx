import { defineComponent } from 'vue'

import TitleBar from '@/components/TitleBar'

const Header = defineComponent({
  setup(_, { slots }) {
    return () => (
      <div class="fixed left-0 right-0 top-0 z-10  w-full border-b  border-slate-100 bg-white shadow-md shadow-slate-600/5  dark:border-neutral-700  dark:bg-neutral-800 dark:shadow-neutral-950/40">
        <TitleBar></TitleBar>
        <div class="flex items-center justify-center p-3 ">{slots.default?.()}</div>
      </div>
    )
  }
})
export default Header
