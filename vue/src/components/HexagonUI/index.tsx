import { defineComponent } from 'vue'

import { IHexagonLayerReactiveProps } from '@/interfaces'

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
  setup(props: IHexagonLayerReactiveProps) {
    return (): JSX.Element => html(props)
  }
})

const html = ({ coverage, elevationScale, radius, upperPercentile }: IHexagonLayerReactiveProps): JSX.Element => (
  <div>
    <header id="header" aria-labelledby="header">
      GB Road Accidents
    </header>
    <hr />
    <div>
      <label for="coverage" class="props">
        Coverage
      </label>
      <input id="coverage" name="coverage" class="props" type="range" min="0" max="1" step="0.1" value={coverage} />
      <span>{coverage}</span>
    </div>
    <hr />
    <div>
      <label for="elevationScale" class="props">
        Elevation Scale
      </label>
      <input
        id="elevationScale"
        name="elevationScale"
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
      <label for="radius" class="props">
        Radius
      </label>
      <input id="radius" name="radius" class="props" type="range" min="1000" max="5000" step="500" value={radius} />
      <span>{radius}</span>
    </div>
    <hr />
    <div>
      <label for="upperPercentile" class="props">
        Upper Percentile
      </label>
      <input
        id="upperPercentile"
        name="upperPercentile"
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
    <button id="reset" aria-labelledby="reset">
      Reset Parameters
    </button>
    <button id="mapbox" aria-labelledby="mapbox">
      Return to Trails
    </button>
  </div>
)
