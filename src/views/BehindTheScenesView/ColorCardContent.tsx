import { defineComponent, type PropType } from 'vue'

const ColorCard = defineComponent({
  props: {
    color: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  setup(props) {
    return () => (
      <div class="space-y-2">
        <div
          class="h-12 w-16 rounded-md transition-transform  hover:scale-110"
          style={`background-color:${props.color}`}
        ></div>
        <div>
          <p class="text-base font-normal text-slate-600 dark:text-neutral-200">{props.name}</p>
          <p class="text-sm font-normal text-slate-400 dark:text-neutral-400">{props.color}</p>
        </div>
      </div>
    )
  }
})

const ColorCardList = defineComponent({
  props: {
    seriesName: {
      type: String,
      required: true
    },
    colorList: {
      type: Array as PropType<{ color: string; name: string }[]>,
      required: true
    }
  },
  setup(props) {
    return () => (
      <div class="space-y-2  ">
        <p class="text-lg font-medium text-slate-600 dark:text-neutral-200">{props.seriesName}</p>
        <div class="grid grid-cols-3 gap-4 rounded-md bg-white p-4 shadow-md shadow-slate-600/5 transition-all dark:bg-neutral-800 dark:shadow-neutral-950/40 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11">
          {props.colorList.map((c) => (
            <ColorCard color={c.color} name={c.name}></ColorCard>
          ))}
        </div>
      </div>
    )
  }
})

const ColorCardContent = defineComponent({
  setup() {
    const iceCream = {
      '50': '#eff8ff',
      '100': '#d8edff',
      '200': '#b8e3ff',
      '300': '#79ccff',
      '400': '#32b2fe',
      '500': '#079af0',
      '600': '#0079ce',
      '700': '#0061a6',
      '800': '#035289',
      '900': '#094571',
      '950': '#062b4b'
    }
    const chocolate = {
      '50': '#fdf4e6',
      '100': '#fcefd8',
      '200': '#f8dbb0',
      '300': '#f3c07e',
      '400': '#ed9c4a',
      '500': '#e88027',
      '600': '#da671c',
      '700': '#b54f19',
      '800': '#903f1c',
      '900': '#74361a',
      '950': '#3f1a0b'
    }

    return () => (
      <div class="container mx-auto space-y-6  p-8 py-24 pt-32">
        <ColorCardList
          seriesName="Ice-cream"
          colorList={Object.entries(iceCream).map((e) => {
            return {
              name: e[0],
              color: e[1]
            }
          })}
        ></ColorCardList>
        <ColorCardList
          seriesName="Chocolate"
          colorList={Object.entries(chocolate).map((e) => {
            return {
              name: e[0],
              color: e[1]
            }
          })}
        ></ColorCardList>
      </div>
    )
  }
})

export default ColorCardContent
