import { Container } from 'typedi'
import { defineComponent, onBeforeMount, onBeforeUnmount, onMounted, onUnmounted } from 'vue'

// Common Services
import { Data_Service, EventListener_Service } from '@/common_services'

import { Marker_Service } from '../Marker/services'
import { Modal_Service } from '../Modal/services'

import { IMapbox_Props } from './interfaces'
import { Map_Service, Mapbox_Service, MapStyle_Service } from '../Mapbox/services'

/* eslint-disable-next-line */
import { outdoors, satellite } from './index.module.css'

export default defineComponent({
    props: {
        container: {
            type: String,
            required: true
        }
    },

    setup(props: IMapbox_Props) {
        const { mapStyle } = Container.get(MapStyle_Service)
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

const html = ({ container }: IMapbox_Props, mapStyle: string): JSX.Element => (
    <div id={container} class={mapStyle.includes('outdoors') ? outdoors : satellite}></div>
)

const getMapboxAccessToken = async (): Promise<void> => {
    const dataService = Container.get(Data_Service)
    const { mapboxAccessToken } = dataService
    mapboxAccessToken ?? (await dataService.getMapboxAccessToken())
}

const loadMapLayer = (): void => {
    const mapService = Container.get(Map_Service)
    mapService.loadMapLayer()
}

const addEventListeners = (): void => {
    const eventListenerService = Container.get(EventListener_Service)
    eventListenerService.addDisplayLayerElementEventListener()
    eventListenerService.addSelectTrailChangeEventListener()
}

const removeEventListeners = (): void => {
    const eventListenerService = Container.get(EventListener_Service)
    eventListenerService.removeDisplayLayerElementEventListener()
    eventListenerService.removeSelectTrailChangeEventListener()
}

const removeMapInstance = (): void => {
    const mapboxService = Container.get(Mapbox_Service)
    mapboxService.removeMapInstance()
}

const setMarkerVisibility = (): void => {
    const markerService = Container.get(Marker_Service)
    const { mapStyle } = Container.get(MapStyle_Service)
    mapStyle.includes('outdoors')
        ? setTimeout((): void => markerService.setMarkerVisibility(), 2000)
        : setTimeout((): void => markerService.setMarkerVisibility(), 250)
}

const showModal = (): void => {
    const modalService = Container.get(Modal_Service)
    modalService.showModal()
}
