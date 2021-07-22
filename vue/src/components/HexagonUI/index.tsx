import { defineComponent } from 'vue'

import { IHexagonLayerProps } from '@/interfaces'

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
    }
  },
  setup(props: IHexagonLayerProps) {
    return (): JSX.Element => html(props)
  }
})

const html = ({
  coverage,
  elevationScale,
  radius,
  upperPercentile
}: IHexagonLayerProps): JSX.Element => (
  <div>
    <header>GB Road Accidents</header>
    <hr />
    <div>
      <label class="props">Coverage</label>
      {/* prettier-ignore */}
      <input
        id="coverage"
        class="props"
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={coverage}
      />
      <span>{coverage}</span>
    </div>
    <hr />
    <div>
      <label class="props">Elevation Scale</label>
      <input
        id="elevationScale"
        class="props"
        type="range"
        min="0"
        max="100"
        step="20"
        value={elevationScale}
      />
      <span>{elevationScale}</span>
    </div>
    <hr />
    <div>
      <label class="props">Radius</label>
      <input
        id="radius"
        class="props"
        type="range"
        min="1000"
        max="5000"
        step="500"
        value={radius}
      />
      <span>{radius}</span>
    </div>
    <hr />
    <div>
      <label class="props">Upper Percentile</label>
      <input
        id="upperPercentile"
        class="props"
        type="range"
        min="80"
        max="100"
        step="1"
        value={upperPercentile}
      />
      <span>{upperPercentile}</span>
    </div>
    <hr />
    <button id="reset">Reset Parameters</button>
    <button id="mapbox">Return to Trails</button>
  </div>
)
