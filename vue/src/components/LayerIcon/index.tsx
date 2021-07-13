import { defineComponent } from 'vue'

import { ILayerElements } from '@/interfaces'
import layerIcon from '@/components/LayerElements/index.module.css'

export default defineComponent({
  props: {
    alt: {
      type: String,
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
  setup({ alt, height, id, src, width }) {
    return (): JSX.Element => (
      <img
        alt={alt}
        class={`layer-element ${layerIcon[id as keyof ILayerElements]}`}
        height={height}
        id={id}
        src={src}
        width={width}
      />
    )
  }
})
