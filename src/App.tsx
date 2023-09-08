import { onMounted, defineComponent } from 'vue'

import { useWifiStore } from '@/stores/wifi'

import Main from './components/Main'
import Header from './components/Header'
import Footer from './components/Footer'

export default defineComponent({
  setup() {
    const wifiStore = useWifiStore()
    onMounted(async () => {
      await wifiStore.getWifiNameList()
      await wifiStore.getWifiDetailList()
    })

    return () => (
      <div class="custom-scrollbar h-screen w-screen overflow-auto bg-slate-50 dark:bg-neutral-900">
        <Header></Header>
        <Main></Main>
        <Footer></Footer>
      </div>
    )
  }
})
