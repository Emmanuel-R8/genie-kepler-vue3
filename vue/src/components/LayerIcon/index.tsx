import { defineComponent, PropType } from 'vue'

import scss from '@/components/LayerElements/index.module.scss'

type Props = {
  alt: string
  click: (evt: Event) => void
  height: number
  id: string
  src: string
  width: number
}

const html = (props: Props): JSX.Element => (
  <img
    alt={props.alt}
    class={scss[props.id]}
    height={props.height}
    id={props.id}
    onClick={props.click}
    src={props.src}
    width={props.width}
  />
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
  setup(props: Props) {
    return (): JSX.Element => html(props)
  }
})
