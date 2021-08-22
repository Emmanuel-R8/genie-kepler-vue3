import { Container } from 'typedi'
import { defineComponent, onBeforeMount, onBeforeUnmount, onMounted, onUnmounted } from 'vue'

import { IDeckglProps } from '@/interfaces'
import {
    DataService,
    DeckglService,
    EventListenerService,
    HexagonLayerService,
    ModalService
} from '@/services'
import { deckgl, hexagonLayer } from './index.module.css'

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
    setup(props: IDeckglProps) {
        onBeforeMount((): void => showModal())
        onBeforeUnmount((): void => removeEventListeners())
        onMounted(async (): Promise<void> => {
            await getMapboxAccessToken()
            loadHexagonLayer()
            addEventListeners()
        })
        onUnmounted((): void => {
            removeDeckInstance()
            removeMapInstance()
        })
        return (): JSX.Element => html(props)
    }
})

const html = ({ canvas, container }: IDeckglProps): JSX.Element => (
    <>
        <div id={container} class={deckgl}></div>
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
    const deckglService = Container.get(DeckglService)
    deckglService.removeDeckInstance()
}

const removeMapInstance = (): void => {
    const deckglService = Container.get(DeckglService)
    deckglService.removeMapInstance()
}

const showModal = (): void => {
    const modalService = Container.get(ModalService)
    modalService.showModal()
}
