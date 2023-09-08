import { defineComponent } from 'vue'

import { storeToRefs } from 'pinia'

import { useWifiStore } from '@/stores/wifi'

import TitleBar from '@/components/TitleBar'

const NameSearchInput = defineComponent({
  setup() {
    const wifiStore = useWifiStore()
    const { nameSearchKeyWord } = storeToRefs(wifiStore)
    return () => (
      <div class="relative w-3/5 max-w-md lg:w-2/5">
        <input
          onInput={(event) => {
            nameSearchKeyWord.value = (event.target as HTMLInputElement).value
          }}
          type="text"
          placeholder="Search By Name"
          style="-webkit-app-region:no-drag"
          class="peer  w-full rounded-full border   border-transparent bg-white px-3 py-1 pr-10 text-lg font-normal text-slate-600 placeholder-slate-400  outline-none transition-colors focus:border-ice-cream-700 focus:bg-ice-cream-700/5 dark:bg-neutral-900 dark:text-neutral-200 dark:placeholder-neutral-400  dark:hover:bg-neutral-700/80 dark:focus:border-ice-cream-200 dark:focus:bg-ice-cream-200/10"
        />
        <i class="ph ph-magnifying-glass absolute right-2 top-1/2 -translate-y-1/2 text-2xl text-slate-400 transition-colors  peer-focus:text-ice-cream-700 dark:text-neutral-400  peer-focus:dark:text-ice-cream-200"></i>
      </div>
    )
  }
})

const Header = defineComponent({
  setup() {
    return () => (
      <div class="fixed left-0 right-0 top-0 z-10  w-full border-b  border-slate-100 bg-white shadow-md shadow-slate-600/5  dark:border-neutral-700  dark:bg-neutral-800 dark:shadow-neutral-950/40">
        <TitleBar></TitleBar>
        <div class="flex items-center justify-center p-3 ">
          <NameSearchInput></NameSearchInput>
        </div>
      </div>
    )
  }
})
export default Header
