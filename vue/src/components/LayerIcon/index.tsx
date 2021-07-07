import { defineComponent, PropType } from 'vue'

import { ILayerElements } from '@/interfaces'
import layerIcon from '@/components/LayerElements/index.module.scss'

export default defineComponent({
  props: {
    alt: {
      type: String,
      required: true
    },
    click: {
      type: Function as PropType<(evt: Event) => void>,
      required: true
    },
    height: {
      type: Number,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    src: {
      type: String,
      required: true
    },
    width: {
      type: Number,
      required: true
    }
  },
  setup({ alt, click, height, id, src, width }) {
    return (): JSX.Element => (
      <img
        alt={alt}
        class={layerIcon[id as keyof ILayerElements]}
        height={height}
        id={id}
        onClick={click}
        src={src}
        width={width}
      />
    )
  }
})
