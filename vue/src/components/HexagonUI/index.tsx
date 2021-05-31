import { defineComponent, PropType } from 'vue'

import scss from './index.module.scss'

const html = (props: Record<string, any>): JSX.Element => (
  <div class={scss.Hexagon}>
    <div class={scss.spacer}></div>
    <div class={scss.header}>GB Road Accidents</div>
    <hr />
    <div>
      <label>Coverage</label>
      <input
        id="coverage"
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={props.coverage}
        onChange={props.setHexagonLayerReactiveProps}
      />
      <span>{props.coverage}</span>
    </div>
    <hr />
    <div>
      <label>Elevation Scale</label>
      <input
        id="elevationScale"
        type="range"
        min="0"
        max="100"
        step="20"
        value={props.elevationScale}
        onChange={props.setHexagonLayerReactiveProps}
      />
      <span>{props.elevationScale}</span>
    </div>
    <hr />
    <div>
      <label>Radius</label>
      <input
        id="radius"
        type="range"
        min="1000"
        max="5000"
        step="500"
        value={props.radius}
        onChange={props.setHexagonLayerReactiveProps}
      />
      <span>{props.radius}</span>
    </div>
    <hr />
    <div>
      <label>Upper Percentile</label>
      <input
        id="upperPercentile"
        type="range"
        min="80"
        max="100"
        step="1"
        value={props.upperPercentile}
        onChange={props.setHexagonLayerReactiveProps}
      />
      <span>{props.upperPercentile}</span>
    </div>
    <hr />
    <div class={scss.spacer}></div>
    <button onClick={props.resetHexagonLayerReactiveProps}>Reset Parameters</button>
    <div class={scss.spacer}></div>
    <button onClick={props.returnToTrails}>Return to Trails</button>
    <div class={scss.spacer}></div>
    <div class={scss.spacer}></div>
  </div>
)

export default defineComponent({
  props: {
    coverage: {
      type: Number as PropType<number>,
      required: true
    },
    elevationScale: {
      type: Number as PropType<number>,
      required: true
    },
    radius: {
      type: Number as PropType<number>,
      required: true
    },
    upperPercentile: {
      type: Number as PropType<number>,
      required: true
    },
    setHexagonLayerReactiveProps: {
      type: Function as PropType<(evt: Event) => void>,
      required: true
    },
    resetHexagonLayerReactiveProps: {
      type: Function as PropType<(evt: Event) => void>,
      required: true
    },
    returnToTrails: {
      type: Function as PropType<(evt: Event) => void>,
      required: true
    }
  },
  setup(props) {
    return (): JSX.Element => html(props)
  }
})
