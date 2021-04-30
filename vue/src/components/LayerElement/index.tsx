import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    class: {
      type: String,
      default: '',
      required: true
    },
    click: {
      type: Function,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  setup() {
    return (props: Record<string, any>) => (
      <li>
        <div id={props.id} class={props.class} onClick={props.click}>
          {props.name}
        </div>
      </li>
    )
  }
})
