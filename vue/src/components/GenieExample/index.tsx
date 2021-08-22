import { Container } from 'typedi'
import { IGenieExampleProps } from '@/interfaces'

/* eslint-disable-next-line */
import { genie_example_element, hexagonLayer } from './index.module.css'

import { defineComponent, onBeforeMount, onBeforeUnmount, onMounted, onUnmounted } from 'vue'
import { DataService, GenieExampleService, EventListenerService, HexagonLayerService, ModalService } from '@/services'

export default defineComponent({
    props: {
        canvas: {
            type: String,
            required: true
        },
        container: {
            type: String,
            required: true
        }
    },

    setup(props: IGenieExampleProps) {
        onBeforeMount((): void => showModal())

        onMounted(async (): Promise<void> => {
            await getMapboxAccessToken()
            loadHexagonLayer()
            addEventListeners()
        })

        onBeforeUnmount((): void => removeEventListeners())

        onUnmounted((): void => {
            removeDeckInstance()
            removeMapInstance()
        })
        return (): JSX.Element => html(props)
    }
})

const html = ({ canvas, container }: IGenieExampleProps): JSX.Element => (
    <>
        <div id={container} class={genie_example_element}></div>
        <canvas id={canvas} class={hexagonLayer}></canvas>
    </>
)

const getMapboxAccessToken = async (): Promise<void> => {
    const dataService = Container.get(DataService)
    const { mapboxAccessToken } = dataService
    mapboxAccessToken ?? (await dataService.getMapboxAccessToken())
}

const loadHexagonLayer = (): void => {
    const hexagonLayerService = Container.get(HexagonLayerService)
    hexagonLayerService.loadHexagonLayer()
}

const addEventListeners = (): void => {
    const eventListenerService = Container.get(EventListenerService)
    eventListenerService.addHexagonLayerEventListeners()
}

const removeEventListeners = (): void => {
    const eventListenerService = Container.get(EventListenerService)
    eventListenerService.removeHexagonLayerEventListeners()
}

const removeDeckInstance = (): void => {
    const deckglService = Container.get(GenieExampleService)
    /* eslint-disable-next-line @typescript-eslint/no-unsafe-call */
    GenieExampleService.removeDeckInstance()
}

const removeMapInstance = (): void => {
    const deckglService = Container.get(GenieExampleService)
    /* eslint-disable-next-line @typescript-eslint/no-unsafe-call */
    GenieExampleService.removeMapInstance()
}

const showModal = (): void => {
    const modalService = Container.get(ModalService)
    modalService.showModal()
}
