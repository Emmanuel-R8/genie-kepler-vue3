import { defineComponent, PropType } from 'vue'

import scss from '@/components/LayerElements/index.module.scss'

const html = (props: Record<string, any>): JSX.Element => (
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
      type: String as PropType<string>,
      required: true
    },
    click: {
      type: Function as PropType<(evt: Event) => void>,
      required: true
    },
    height: {
      type: Number as PropType<number>,
      required: true
    },
    id: {
      type: String as PropType<string>,
      required: true
    },
    src: {
      type: String as PropType<string>,
      required: true
    },
    width: {
      type: Number as PropType<number>,
      required: true
    }
  },
  setup(props: Record<string, any>) {
    return (): JSX.Element => html(props)
  }
})
