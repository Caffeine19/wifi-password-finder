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
        class="group hover:border-ice-cream-700 border border-slate-400 rounded-md p-1 flex items-center justify-center hover:bg-ice-cream-700/5 transition-colors"
      >
        <i class="ph ph-copy text-slate-400 text-2xl group-hover:text-ice-cream-700 transition-colors"></i>
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
      <div class=" bg-white p-3 px-4 shadow-md shadow-slate-600/5 rounded-md flex justify-between items-center transition-all hover:shadow-xl hover:scale-105 hover:shadow-slate-600/5">
        <div class="space-y-0.5">
          <div class="flex items-center space-x-3">
            <i class="ph ph-wifi-high text-xl text-slate-400"></i>
            <p class="text-slate-600 font-medium text-lg">{name.value}</p>
          </div>
          <div class="flex items-center space-x-3">
            {password.value ? (
              <i class="ph ph-lock-key-open text-xl text-slate-400"></i>
            ) : (
              <i class="ph ph-warning text-xl text-chocolate-300"></i>
            )}

            <p
              class={
                'font-medium text-lg' +
                ' ' +
                (password.value ? 'text-slate-600' : 'text-chocolate-300 italic')
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
      <div class="mx-auto container grid grid-cols-1 gap-y-4 p-8 py-24 pt-32 md:grid-cols-2 md:gap-x-4 lg:grid-cols-3">
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
