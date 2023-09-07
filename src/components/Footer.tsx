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
      <button class="flex items-center justify-center group hover:bg-ice-cream-700/5 transition-colors p-1 rounded-md border border-transparent hover:border-ice-cream-700">
        <i
          class={
            'ph  text-slate-400 text-2xl group-hover:text-ice-cream-700 transition-colors' +
            ' ' +
            props.iconClass
          }
        ></i>
      </button>
    )
  }
})

const actionButtonList = [
  {
    iconClass: 'ph-sort-ascending'
  },
  { iconClass: 'ph-palette' },
  { iconClass: 'ph-confetti' }
]

const Footer = defineComponent({
  setup() {
    return () => (
      <div class="fixed bottom-0 left-0 right-0 w-full  z-10 flex items-center justify-center bg-white shadow-md shadow-slate-600/5 p-3 border-t border-slate-200 space-x-6">
        {actionButtonList.map((bt) => (
          <ActionButton iconClass={bt.iconClass}></ActionButton>
        ))}
      </div>
    )
  }
})
export default Footer
