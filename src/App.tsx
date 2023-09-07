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
      <div class="w-screen h-screen bg-slate-50 overflow-auto custom-scrollbar">
        <Header></Header>
        <Main></Main>
        <Footer></Footer>
      </div>
    )
  }
})
