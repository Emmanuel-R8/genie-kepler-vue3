import { defineComponent, PropType } from 'vue'

import { LayerIconProps } from '@/types'
import scss from '@/components/LayerElements/index.module.scss'

const html = ({ alt, click, height, id, src, width }: LayerIconProps): JSX.Element => (
  <img alt={alt} class={scss[id]} height={height} id={id} onClick={click} src={src} width={width} />
)

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
  setup(props: LayerIconProps) {
    return (): JSX.Element => html(props)
  }
})
