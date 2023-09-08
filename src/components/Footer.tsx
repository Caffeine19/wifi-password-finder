import { defineComponent } from 'vue'

const ActionButton = defineComponent({
  props: {
    iconClass: {
      type: String,
      required: true
    }
  },
  setup(props) {
    return () => (
      <button class="group flex items-center justify-center rounded-md p-1 transition-colors hover:bg-ice-cream-700/5 dark:hover:bg-ice-cream-200/10">
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

const actionButtonOption = [
  {
    iconClass: 'ph-sort-ascending'
  },
  { iconClass: 'ph-palette' },
  { iconClass: 'ph-confetti' }
]

const Footer = defineComponent({
  setup() {
    return () => (
      <div class="fixed bottom-0 left-0 right-0 z-10  flex w-full items-center justify-center space-x-6 border-t border-slate-100 bg-white p-3 shadow-md shadow-slate-600/5 dark:border-neutral-700 dark:bg-neutral-800 dark:shadow-neutral-950/40">
        {actionButtonOption.map((bt) => (
          <ActionButton iconClass={bt.iconClass}></ActionButton>
        ))}
      </div>
    )
  }
})
export default Footer
