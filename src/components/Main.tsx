import { defineComponent, toRefs } from 'vue'

import { useWifiStore } from '@/stores/wifi'
import { storeToRefs } from 'pinia'

const writeToClipboard = (text: string) => {
  const textarea = document.createElement('textarea')
  document.body.appendChild(textarea)
  textarea.value = ''
  textarea.select()
  navigator.clipboard
    .writeText(text)
    .then(function () {
      alert('save to clipboard!') // success
    })
    .catch(function () {
      alert('copy failed') // error
    })
  document.body.removeChild(textarea)
}
const CopyButton = defineComponent({
  props: {
    text: {
      type: String
    }
  },
  setup(props) {
    return () => (
      <button
        onClick={() => writeToClipboard(props.text || '')}
        class="group flex items-center justify-center rounded-md border border-slate-400 p-1 transition-colors hover:border-ice-cream-700 hover:bg-ice-cream-700/5 dark:border-neutral-400 dark:hover:border-ice-cream-200 dark:hover:bg-ice-cream-200/10"
      >
        <i class=" ph ph-copy text-2xl text-slate-400 transition-colors group-hover:text-ice-cream-700 dark:text-neutral-400 dark:group-hover:text-ice-cream-200"></i>
      </button>
    )
  }
})

const WifiCard = defineComponent({
  props: {
    name: {
      type: String,
      required: true
    },
    password: {
      type: String
    }
  },
  setup(props) {
    const { name, password } = toRefs(props)
    return () => (
      <div class=" flex items-center justify-between rounded-md bg-white p-3 px-4 shadow-md shadow-slate-600/5 transition-all hover:scale-105 hover:shadow-xl hover:shadow-slate-600/5 dark:bg-neutral-800 dark:shadow-neutral-950/40 dark:hover:shadow-neutral-950/40">
        <div class="space-y-0.5">
          <div class="flex items-center space-x-3">
            <i class="ph ph-wifi-high text-xl text-slate-400 dark:text-neutral-400"></i>
            <p class="text-lg font-medium text-slate-600 dark:text-neutral-200">{name.value}</p>
          </div>
          <div class="flex items-center space-x-3">
            {password.value ? (
              <i class="ph ph-lock-key-open text-xl text-slate-400 dark:text-neutral-400"></i>
            ) : (
              <i class="ph ph-warning text-xl text-chocolate-300 dark:text-chocolate-500"></i>
            )}

            <p
              class={
                'text-lg font-medium' +
                ' ' +
                (password.value
                  ? 'text-slate-600 dark:text-neutral-200'
                  : 'italic text-chocolate-300 dark:text-chocolate-500')
              }
            >
              {password.value || "Didn't find it"}
            </p>
          </div>
        </div>
        {password.value ? <CopyButton text={password.value}></CopyButton> : undefined}
      </div>
    )
  }
})

const WifiCardList = defineComponent({
  setup() {
    const wifiStore = useWifiStore()
    const { filteredWifiDetailList } = storeToRefs(wifiStore)

    return () => (
      <div class="container mx-auto grid grid-cols-1 gap-y-4 p-8 py-24 pt-32 md:grid-cols-2 md:gap-x-4 lg:grid-cols-3">
        {filteredWifiDetailList.value.map((wifi) => (
          <WifiCard
            name={wifi.name}
            password={wifi.value.security ? wifi.value.security['Key Content'] : undefined}
          ></WifiCard>
        ))}
      </div>
    )
  }
})

export default WifiCardList
