import { defineComponent } from 'vue'

const Footer = defineComponent({
  setup(_, { slots }) {
    return () => (
      <div class="fixed bottom-0 left-0 right-0 z-10  flex w-full items-center justify-center space-x-6 border-t border-slate-100 bg-white p-3 shadow-md shadow-slate-600/5 dark:border-neutral-700 dark:bg-neutral-800 dark:shadow-neutral-950/40">
        {slots.default?.()}
      </div>
    )
  }
})
export default Footer
