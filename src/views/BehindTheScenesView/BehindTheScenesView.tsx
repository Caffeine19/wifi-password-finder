import { defineComponent } from 'vue'

import { useRouter } from 'vue-router'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ThemeActionButton, ActionButton, type ActionButtonOption } from '@/components/ActionButton'
import ColorCardContent from './ColorCardContent'

const RoadMap = defineComponent({
  setup() {
    return () => (
      <div class="flex items-center space-x-2 text-slate-400 dark:text-neutral-400">
        <i class="ph ph-confetti text-xl font-normal"></i>
        <p class="text-base font-normal">Behind The Scenes</p>
      </div>
    )
  }
})
export default defineComponent({
  setup() {
    const router = useRouter()
    const actionButtonOption: ActionButtonOption[] = [
      {
        iconClass: 'ph-house-line',
        action: () => router.back()
      }
    ]
    return () => (
      <div>
        <Header>
          <RoadMap></RoadMap>
        </Header>
        <ColorCardContent></ColorCardContent>
        <Footer>
          {...[
            actionButtonOption.map((bt) => (
              <ActionButton iconClass={bt.iconClass} action={bt.action}></ActionButton>
            )),
            <ThemeActionButton></ThemeActionButton>
          ]}
        </Footer>
      </div>
    )
  }
})
