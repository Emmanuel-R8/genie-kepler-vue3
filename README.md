# Build

The project includes 4 sub-parts:

  - A Vue 3 frontend wrapping Deck.gl
  - A Go server to access a PSQL PostGIS server and serve that to the app in Geo/JSON.
  - A PostGIS server
  - A NGinx server

To run the project, start up the Dockoer-compose set-up with the local script `start-docker-compose.sh`.



# Geospatial Web

http://www.geospatialweb.ca

Development sandbox website to showcase the application integration of Go, Vue 3 Composition API, TypeScript, TSX, Mapbox GL, Deck.GL, PostGIS 3.0 and Docker. This implementation features dedicated Map instances in separate routes.

In essence, this implementation is a Proof Of Concept and Prototype that embodies what I *consider* to be the major tenets of the three leading JavaScript front-end frameworks, namely:

* Angular: TypeScript, Dependency Injection and RxJS asynchronous programming

* React: Functional components (React Hooks), JSX/TSX and virtual DOM

* Vue 3: Composition API, reactive ES6 proxies and reactive local/global state management without Vuex

To that end, this experiment has been a huge success. Employing Vite and Volar in lieu of Vue CLI and Vetur is highly recommended. Everything coalesces perfectly. Including Vuex or Redux if required. You be the judge...
