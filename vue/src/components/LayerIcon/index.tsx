import { defineComponent } from 'vue'

import { ILayerElements } from '@/interfaces'
import layerElements from '@/components/LayerElements/index.module.css'

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
  setup(props: Record<string, any>) {
    return (): JSX.Element => html(props)
  }
})

const html = ({ alt, height, id, src, width }: Record<string, any>): JSX.Element => (
  <img
    alt={alt}
    class={`layer-element ${layerElements[id as keyof ILayerElements]}`}
    height={height}
    id={id}
    src={src}
    width={width}
  />
)
