import { defineComponent } from 'vue'

const WindowControllerButton = defineComponent({
  props: {
    id: {
      type: String,
      required: true
    },
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
        id={props.id}
        class="rounded-md p-1 flex items-center justify-center hover:bg-ice-cream-700/5 group"
        style="-webkit-app-region:no-drag"
        onClick={() => props.action()}
      >
        <i
          class={
            'ph text-2xl text-slate-400 group-hover:text-ice-cream-700' + ' ' + props.iconClass
          }
        ></i>
      </button>
    )
  }
})

const windowControllerButtonOption = [
  {
    id: 'minimize',
    iconClass: 'ph-minus',
    action: () => {
      window.electronAPI.minimizeWindow()
    }
  },
  {
    id: 'fullscreen ',
    iconClass: 'ph-corners-out',
    action: () => {
      window.electronAPI.fullscreenWindow()
    }
  },
  {
    id: 'close',
    iconClass: 'ph-x',
    action: () => {
      window.electronAPI.closeWindow()
    }
  }
]

const TitleBar = defineComponent({
  setup() {
    return () => (
      <div
        class="bg-slate-50 flex items-center justify-end p-2 space-x-1"
        style="-webkit-app-region:drag"
      >
        {windowControllerButtonOption.map((bt) => (
          <WindowControllerButton
            id={bt.id}
            iconClass={bt.iconClass}
            action={bt.action}
          ></WindowControllerButton>
        ))}
      </div>
    )
  }
})

export default TitleBar
