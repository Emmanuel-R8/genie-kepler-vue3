# Get started

## Build

The project includes 4 sub-parts:

  - A Vue 3 frontend wrapping Deck.gl
  - A Go server to access a PSQL PostGIS server and serve that to the app in Geo/JSON.
  - A PostGIS server
  - A NGinx server


To run the project, start up the Dockoer-compose set-up with the local script `start-docker-compose.sh`.


## Required before running

- Install all JS/TS modules. `yarn` has been used. `npm` should be OK too.
- Create a `.env` file in the top directory (where `package.json` is) containing various environment variables. `env.template` indicates what is needed.


# Code structure

The code is commented as it is read and modified/refactored.

NGinx serves ------> Vue 3 pages/components ---(Axios)---> Go app ------> Prepopulated PSQL


## Frontend / Vue 3

## Of note

- Bundling is done with [`Vite`](https://vitejs.dev/) which uses `esbuild`.
- A `Vite` plugin handles `Vue` and the JSX/TSX files transpilation.
- As a consequence of `Vite`, the format of the JSX/TSX files has a couple of requirements to be properly detected (see the documentation of the [Vite Vue JSX plugin](https://github.com/vitejs/vite/tree/main/packages/plugin-vue-jsx)):

  - component must be exported.
  - The component must be declared by calling defineComponent via a root-level statement, either variable declaration or export declaration.

- Extensive use of interfaces (Typescript linguo for structs/types, since types are what other languages simetimes call type aliases or type synonyms).
- Interfaces are then used for Dependency injections. Useful pattern for class-based object languages. Multiple dispatch, where are thou?
- No use of the Vue 2 _Options API_. Everything is under the _Composition API_.


### Type definitions.

Warning: All Vue 3 props are [reactive by default](https://v3.vuejs.org/guide/composition-api-setup.html#arguments).

`src\types\index.ts` collects all defined types. Types are defined in the `src\interfaces\index.ts`.



  - Classes are defined in `src/services` using injecting the interfaces as services. See
    [Wikipedia](https://en.wikipedia.org/wiki/Dependency_injection) for a refresher on the vocabulary.
    Each service (a definition as an _injectable interface_ in  `src/services`)
  - New data types (Typescript interfaces) in `src/interfaces/index.ts`. As expected for new types, only
    type signatures and no methods which come in. A `struct` definition within `src/interfaces/index.ts`.
  - A corresponding config file (in `src/config`) which it imports
  - If this structure reflects a Vue module, its component difinition in `src/Components/_COM_`.



Starting the app:

1. `main.ts` sets up an app (defined in `App.tsx`) and routes.
2. `router/router.ts` creates 2 routes presented by 2 views defined in `views/Deckgl.tsx` and `views/Mapbox.tsx`.
3. Each view sets up a page layout as a component regrouping several sub-components.
4. Sub-components are all defined in `src/components/`.


The app:

1. Called from `main.ts`, prepares a promise even before being _mounted_. The promise creates an `AppService` (`src/Apps.tsx`) and requests its `loadData()` method.
2. The `AppService` creates an `HttpClient` (`src/services/axios.ts`) and then loads data on that client connection
   (`DataService.loadData()` in `src/services/data.ts`).
3. From there on, see from 4. below.

Regarding the `Deck.gl` sub-component:

1. Defined in `src/components/Deckgl/index.tsx`
2. When _mounted_ (included in the component ready for rendering), a data-loader is defined (?) by a class method
  `hexagonLayerService.loadHexagonLayer()`.
3. `hexagonLayerService` is defined in `src/services/hexagon-layer.ts`.

`loadData()` loads 3 data:

#### Layer data

1. Its constructor requires a `DataService` (defined in `src/services/data.ts`). `DataService` has a field `_urls`
   containing the data source (host and port as a `Record<HOST: string, PORT: string>`).
2. The field is initialised from a list of enumerations `Urls` in `src/enums/index.ts` as `API_BASE_URL =
   'http://localhost:8000/api/'` and `HEXAGON_LAYER_DATA_URL = 'assets/data/3d-heatmap/heatmap-data.csv'`.
4. `localhost:8000` is the end point allocated to the `Go` intermediary (then connecting to the PostGres DB).
5. Still in `src/services/data.ts`, a succession of calls reaches `getGeoJsonFeatureCollection()` to load layers from
   the `GEOJSON`endpoint.
6. The end point is reached through the `DataService._httpService` field which contains the relevant `AxiosService`
   (in `src/services/axios.ts`)

Note that the ADDRESS:HOST is specified in `src/services/axios.ts`, whereas the end point `GEOJSON`is in
`getGeoJsonFeatureCollection()`. Unclear why they are not kept together in a single structure.


#### Hexagon layer data

This data is loaded with `getHexagonLayerData()` (defined in `src/services/data.ts`) with an `await` load from a CSV
file.


#### Marker data

[TO BE COMPLETED]


# Additions

Follows a list of additions in order of complexity. One component = one `Vue`. But one component could be several interfaces and/or services.

## Local static image


### State

Modify `src/Global_State.ts` to add an entry that will contain the reactive and static state of the image (even if
not used). Then modify the methods in `src/common_services/state.ts`.

### Route

Modify `src/route/routers`

# Origins
This code base started from [Geospatial Web](http://www.geospatialweb.ca) available at
[https://gitlab.com/geospatialweb/go-vue3-tsx]().

It was developped as a sandboxed docker-ed website to showcase the application integration of Go, Vue 3 Composition
API, TypeScript, TSX, Mapbox GL, Deck.GL, PostGIS 3.0 and Docker. This implementation features dedicated Map
instances in separate routes.

In essence, this implementation is a Proof Of Concept and Prototype that embodies what
[John Cambell](https://gitlab.com/geospatialweb) *considered* to be the major tenets of the three leading JavaScript
front-end frameworks, namely:

* Angular: TypeScript, Dependency Injection and RxJS asynchronous programming

* React: Functional components (React Hooks), JSX/TSX and virtual DOM

* Vue 3: Composition API, reactive ES6 proxies and reactive local/global state management without Vuex

His conclusions: "To that end, this experiment has been a huge success. Employing Vite and Volar in lieu of Vue CLI and Vetur is highly recommended. Everything coalesces perfectly. Including Vuex or Redux if required. You be the judge..."


# Change log

## Adding a new route to load a static local image

### Routes

Modify `src/router/router.ts` to add a new route `localstaticimage`. This route requires a _view_ and a _component_.

### View

New `src/views/LocalStaticImageView.tsx` file. This in turn references a Vue and a config file.

### Interface

Define structs associated with the image. By default, we create static and reactive props, and options.

In this case, static = the name of the local file.

### Config

Add a config in a new file in `src/config/local-static-image.ts`. The config exported as default in that file is associated to an identifier in `src/config/index.ts`.


### Config file

The file contains information to initialise fields defined in the interface.

