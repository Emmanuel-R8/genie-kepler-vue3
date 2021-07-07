import { defineComponent, PropType } from 'vue'

import { IHexagonUIProps } from '@/interfaces'

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
  setup(props: IHexagonUIProps) {
    return (): JSX.Element => html(props)
  }
})

const html = ({
  coverage,
  elevationScale,
  radius,
  upperPercentile,
  setHexagonLayerReactiveProps,
  resetHexagonLayerReactiveProps,
  returnToTrails
}: IHexagonUIProps): JSX.Element => (
  <div>
    <header>GB Road Accidents</header>
    <hr />
    <div>
      <label>Coverage</label>
      <input
        id="coverage"
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={coverage}
        onChange={setHexagonLayerReactiveProps}
      />
      <span>{coverage}</span>
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
        value={elevationScale}
        onChange={setHexagonLayerReactiveProps}
      />
      <span>{elevationScale}</span>
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
        value={radius}
        onChange={setHexagonLayerReactiveProps}
      />
      <span>{radius}</span>
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
        value={upperPercentile}
        onChange={setHexagonLayerReactiveProps}
      />
      <span>{upperPercentile}</span>
    </div>
    <hr />
    <button onClick={resetHexagonLayerReactiveProps}>Reset Parameters</button>
    <button id="mapbox" onClick={returnToTrails}>
      Return to Trails
    </button>
  </div>
)
