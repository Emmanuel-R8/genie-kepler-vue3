import { defineComponent } from 'vue'

import scss from './index.module.scss'

const html = (props: Record<string, any>): JSX.Element => (
  <div class={scss.Hexagon}>
    <p class={scss.header}>UK Road Accidents</p>
    <div class={scss.spacer}></div>
    <div>
      <label>Coverage</label>
      <input
        id="coverage"
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={props.coverage}
        onChange={props.onChangeInputValue}
      />
      <span class="coverage">{props.coverage}</span>
    </div>
    <div class={scss.spacer}></div>
    <div>
      <label>Elevation Scale</label>
      <input
        id="elevationScale"
        type="range"
        min="0"
        max="100"
        step="10"
        value={props.elevationScale}
        onChange={props.onChangeInputValue}
      />
      <span class="elevationScale">{props.elevationScale}</span>
    </div>
    <div class={scss.spacer}></div>
    <div>
      <label>Radius</label>
      <input
        id="radius"
        type="range"
        min="1000"
        max="5000"
        step="500"
        value={props.radius}
        onChange={props.onChangeInputValue}
      />
      <span class="radius">{props.radius}</span>
    </div>
    <div class={scss.spacer}></div>
    <div>
      <label>Upper Percentile</label>
      <input
        id="upperPercentile"
        type="range"
        min="80"
        max="100"
        step="1"
        value={props.upperPercentile}
        onChange={props.onChangeInputValue}
      />
      <span class="upperPercentile">{props.upperPercentile}</span>
    </div>
    <div class={scss.spacer}></div>
    <button onClick={props.resetHexagonSettings}>Reset Coordinates</button>
    <button onClick={props.resetHexagonParams}>Reset Parameters</button>
    <div class={scss.spacer}></div>
    <button onClick={props.returnToTrails}>Return to Trails</button>
    <div class={scss.spacer}></div>
  </div>
)

export default defineComponent({
  props: {
    coverage: {
      type: Number,
      required: true
    },
    elevationScale: {
      type: Number,
      required: true
    },
    radius: {
      type: Number,
      required: true
    },
    upperPercentile: {
      type: Number,
      required: true
    },
    // onChangeInputValue: {
    //   type: Function,
    //   required: true
    // },
    // resetHexagonParams: {
    //   type: Function,
    //   required: true
    // },
    resetHexagonSettings: {
      type: Function,
      required: true
    },
    returnToTrails: {
      type: Function,
      required: true
    }
  },
  setup(props: Record<string, any>) {
    return (): JSX.Element => html(props)
  }
})
