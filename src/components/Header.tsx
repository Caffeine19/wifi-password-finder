import { defineComponent, ref, watch } from 'vue'

import { storeToRefs } from 'pinia'

import { useWifiStore } from '@/stores/wifi'

import TitleBar from '@/components/TitleBar'

const NameSearchInput = defineComponent({
  setup() {
    const wifiStore = useWifiStore()
    const { nameSearchKeyWord } = storeToRefs(wifiStore)
    return () => (
      <div class="relative w-3/5 lg:w-2/5 max-w-md">
        <i class="ph ph-magnifying-glass text-2xl text-slate-400 absolute top-1/2 right-2 -translate-y-1/2"></i>
        <input
          onInput={(event) => {
            nameSearchKeyWord.value = (event.target as HTMLInputElement).value
          }}
          type="text"
          placeholder="Search By Name"
          style="-webkit-app-region:no-drag"
          class="rounded-full  border-slate-400 placeholder-slate-400 border py-1 px-3 text-lg font-normal hover:border-ice-cream-700 transition-colors hover:bg-ice-cream-700/5 outline-none text-slate-600 pr-10 focus:border-ice-cream-700 focus:bg-ice-cream-700/5 w-full"
        />
      </div>
    )
  }
})

const Header = defineComponent({
  setup() {
    return () => (
      <div class="fixed top-0 left-0 right-0 w-full  z-10  bg-white shadow-md shadow-slate-600/5 border-t border-slate-200">
        <TitleBar></TitleBar>
        <div class="flex items-center justify-center p-3 ">
          <NameSearchInput></NameSearchInput>
        </div>
      </div>
    )
  }
})
export default Header
