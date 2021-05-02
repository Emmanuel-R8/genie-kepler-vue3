import { defineComponent } from 'vue'

import scss from '@/components/Layers/index.module.scss'

export default defineComponent({
  props: {
    alt: {
      type: String,
      required: true
    },
    click: {
      type: Function,
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
  setup() {
    return (props: Record<string, any>) => (
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
  }
})
