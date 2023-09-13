import { defineComponent } from 'vue'

import Main from '@/views/MainVIew/WifiCardContent'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

import { storeToRefs } from 'pinia'
import { useWifiStore } from '@/stores/wifi'

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
          class="peer  w-full rounded-full bg-slate-50 px-3 py-1 pr-10 text-lg font-normal text-slate-600 placeholder-slate-400  outline-none transition-colors  hover:bg-slate-100 focus:bg-ice-cream-700/5 focus:outline-ice-cream-700  dark:bg-neutral-900 dark:text-neutral-200 dark:placeholder-neutral-400 dark:hover:bg-neutral-700/80 dark:focus:bg-ice-cream-200/10 dark:focus:outline-ice-cream-200"
        />
        <i class="ph ph-magnifying-glass absolute right-2 top-1/2 -translate-y-1/2 text-2xl text-slate-400 transition-colors  peer-focus:text-ice-cream-700 dark:text-neutral-400  peer-focus:dark:text-ice-cream-200"></i>
      </div>
    )
  }
})

export default defineComponent({
  setup() {
    return () => (
      <div>
        <Header>
          <NameSearchInput></NameSearchInput>
        </Header>
        <Main></Main>
        <Footer></Footer>
      </div>
    )
  }
})
