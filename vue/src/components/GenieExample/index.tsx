// import { Container } from 'typedi'
// import { IGenieExampleProps } from './interfaces'

// /* eslint-disable-next-line */
// import { 'genie-example-element', hexagonLayer } from './index.module.css'

// import { defineComponent, onBeforeMount, onBeforeUnmount, onMounted, onUnmounted } from 'vue'
// import { Data_Service, GenieExample_Service, EventListener_Service, HexagonLayer_Service, Modal_Service } from '@/services'

// export default defineComponent({
//     props: {
//         canvas: {
//             type: String,
//             required: true
//         },
//         container: {
//             type: String,
//             required: true
//         }
//     },

//     setup(props: IGenieExampleProps) {
//         onBeforeMount((): void => showModal())

//         onMounted(async (): Promise<void> => {
//             await getMapboxAccessToken()
//             loadHexagonLayer()
//             addEventListeners()
//         })

//         onBeforeUnmount((): void => removeEventListeners())

//         onUnmounted((): void => {
//             removeDeckInstance()
//             removeMapInstance()
//         })
//         return (): JSX.Element => html(props)
//     }
// })

// const html = ({ canvas, container }: IGenieExampleProps): JSX.Element => (
//     <>
//         <div id={container} class={genie-example_-element}></div>
//         <canvas id={canvas} class={hexagonLayer}></canvas>
//     </>
// )

// const getMapboxAccessToken = async (): Promise<void> => {
//     const dataService = Container.get(Data_Service)
//     const { mapboxAccessToken } = dataService
//     mapboxAccessToken ?? (await dataService.getMapboxAccessToken())
// }

// const loadHexagonLayer = (): void => {
//     const hexagonLayerService = Container.get(HexagonLayer_Service)
//     hexagonLayerService.loadHexagonLayer()
// }

// const addEventListeners = (): void => {
//     const eventListenerService = Container.get(EventListener_Service)
//     eventListenerService.addHexagonLayerEventListeners()
// }

// const removeEventListeners = (): void => {
//     const eventListenerService = Container.get(EventListener_Service)
//     eventListenerService.removeHexagonLayerEventListeners()
// }

// const removeDeckInstance = (): void => {
//     const genieExampleService = Container.get(GenieExample_Service)
//     /* eslint-disable-next-line @typescript-eslint/no-unsafe-call */
//     GenieExample_Service.removeDeckInstance()
// }

// const removeMapInstance = (): void => {
//     const genieExampleService = Container.get(GenieExample_Service)
//     /* eslint-disable-next-line @typescript-eslint/no-unsafe-call */
//     GenieExample_Service.removeMapInstance()
// }

// const showModal = (): void => {
//     const modalService = Container.get(Modal_Service)
//     modalService.showModal()
// }
