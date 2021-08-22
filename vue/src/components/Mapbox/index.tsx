import { Container } from 'typedi'
import { defineComponent, onBeforeMount, onBeforeUnmount, onMounted, onUnmounted } from 'vue'

import { IMapboxProps } from '@/interfaces'
import {
    DataService,
    EventListenerService,
    MapService,
    MapboxService,
    MapStyleService,
    MarkerService,
    ModalService
} from '@/services'
import { outdoors, satellite } from './index.module.css'

export default defineComponent({
    props: {
        container: {
            type: String,
            required: true
        }
    },

    setup(props: IMapboxProps) {
        const { mapStyle } = Container.get(MapStyleService)
        onBeforeMount((): void => {
            setMarkerVisibility()
            showModal()
        })

        onMounted(async (): Promise<void> => {
            await getMapboxAccessToken()
            loadMapLayer()
            addEventListeners()
        })

        onBeforeUnmount((): void => {
            setMarkerVisibility()
            removeEventListeners()
        })

        onUnmounted((): void => removeMapInstance())
        return (): JSX.Element => html(props, mapStyle)
    }
})

const html = ({ container }: IMapboxProps, mapStyle: string): JSX.Element => (
    <div id={container} class={mapStyle.includes('outdoors') ? outdoors : satellite}></div>
)

const getMapboxAccessToken = async (): Promise<void> => {
    const dataService = Container.get(DataService)
    const { mapboxAccessToken } = dataService
    mapboxAccessToken ?? (await dataService.getMapboxAccessToken())
}

const loadMapLayer = (): void => {
    const mapService = Container.get(MapService)
    mapService.loadMapLayer()
}

const addEventListeners = (): void => {
    const eventListenerService = Container.get(EventListenerService)
    eventListenerService.addDisplayLayerElementEventListener()
    eventListenerService.addSelectTrailChangeEventListener()
}

const removeEventListeners = (): void => {
    const eventListenerService = Container.get(EventListenerService)
    eventListenerService.removeDisplayLayerElementEventListener()
    eventListenerService.removeSelectTrailChangeEventListener()
}

const removeMapInstance = (): void => {
    const mapboxService = Container.get(MapboxService)
    mapboxService.removeMapInstance()
}

const setMarkerVisibility = (): void => {
    const markerService = Container.get(MarkerService)
    const { mapStyle } = Container.get(MapStyleService)
    mapStyle.includes('outdoors')
        ? setTimeout((): void => markerService.setMarkerVisibility(), 2000)
        : setTimeout((): void => markerService.setMarkerVisibility(), 250)
}

const showModal = (): void => {
    const modalService = Container.get(ModalService)
    modalService.showModal()
}
