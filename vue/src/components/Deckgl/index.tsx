import { Container } from 'typedi'
import { defineComponent, onBeforeMount, onBeforeUnmount, onMounted, onUnmounted } from 'vue'

/* eslint-disable-next-line */
import { deckgl, hexagonLayer } from './index.module.css'

import { Data_Common_Service } from '../../common_services/Data/services'
import { EventListener_Common_Service } from '../../common_services/EventListener/services'

import { Deckgl_Service } from './services'
import { IDeckgl_ReactiveProps } from './interfaces'

import { HexagonLayer_Service } from '../HexagonLayer/services'

import { Modal_Service } from '../Modal/services'

export default defineComponent({
    props: {
        canvas: { type: String, required: true },
        container: { type: String, required: true }
    },

    setup(props: IDeckgl_ReactiveProps) {
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

const html = ({ canvas, container }: IDeckgl_ReactiveProps): JSX.Element => (
    <>
        <div id={container} class={deckgl}></div>
        <canvas id={canvas} class={hexagonLayer}></canvas>
    </>
)

const getMapboxAccessToken = async (): Promise<void> => {
    const dataService = Container.get(Data_Common_Service)
    const { mapboxAccessToken } = dataService
    mapboxAccessToken ?? (await dataService.getMapboxAccessToken())
}

const loadHexagonLayer = (): void => {
    const hexagonLayerService = Container.get(HexagonLayer_Service)
    hexagonLayerService.loadHexagonLayer()
}

const addEventListeners = (): void => {
    const eventListenerService = Container.get(EventListener_Common_Service)
    eventListenerService.addHexagonLayerEventListeners()
}

const removeEventListeners = (): void => {
    const eventListenerService = Container.get(EventListener_Common_Service)
    eventListenerService.removeHexagonLayerEventListeners()
}

const removeDeckInstance = (): void => {
    const deckglService = Container.get(Deckgl_Service)
    deckglService.removeDeckInstance()
}

const removeMapInstance = (): void => {
    const deckglService = Container.get(Deckgl_Service)
    deckglService.removeMapInstance()
}

const showModal = (): void => {
    const modalService = Container.get(Modal_Service)
    modalService.showModal()
}
