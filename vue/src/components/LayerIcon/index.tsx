import { defineComponent } from 'vue'

import { ILayerIcon, ILayerIconProps } from '@/interfaces'
import layerElements from '@/components/LayerElements/index.module.css'

export default defineComponent({
  props: {
    height: {
      type: Number,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    name: {
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
  setup(props: ILayerIconProps) {
    return (): JSX.Element => html(props)
  }
})

const html = ({ height, id, name, src, width }: ILayerIconProps): JSX.Element => (
  <img
    alt={name}
    aria-label={name}
    class={`layer-element ${layerElements[id as keyof ILayerIcon]}`}
    height={height}
    id={id}
    src={src}
    width={width}
  />
)
