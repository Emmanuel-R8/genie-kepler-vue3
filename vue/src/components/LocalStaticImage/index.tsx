import { Container } from 'typedi'
import { defineComponent, onBeforeMount, onBeforeUnmount, onMounted, onUnmounted } from 'vue'

// Import all relevant interfaces
import {
    ILocalStaticImage_Settings,
    ILocalStaticImage_StaticProps,
    ILocalStaticImage_ReactiveProps
} from '@/interfaces'

/* eslint-disable-next-line */
import localstaticimage from './index.module.css'

import { EventListener_Service, HexagonLayer_Service, LocalStaticImage_Service } from '@/services'

//
//
export default defineComponent({
    props: {
        filename: { type: String, required: true }
    },

    setup(props: ILocalStaticImage_StaticProps) {
        onBeforeMount((): void => {
            return
        })

        onMounted(async (): Promise<void> => {
            // await getMapboxAccessToken()
            // loadHexagonLayer()
            // addEventListeners()
        })

        onBeforeUnmount((): void => removeEventListeners())

        onUnmounted((): void => {
            removeDeckInstance()
        })

        return (): JSX.Element => html(props)
    }
})

const html = ({ filename }: ILocalStaticImage_StaticProps): JSX.Element => (
    <>
        <div id={container} class={localstaticimage}></div>
    </>
)

const addEventListeners = (): void => {
    const eventListenerService = Container.get(EventListener_Service)
    eventListenerService.addHexagonLayerEventListeners()
}

const removeEventListeners = (): void => {
    const eventListenerService = Container.get(EventListener_Service)
    eventListenerService.removeHexagonLayerEventListeners()
}

const removeDeckInstance = (): void => {
    const deckglService = Container.get(LocalStaticImage_Service)
    deckglService.removeDeckInstance()
}

const removeMapInstance = (): void => {
    const deckglService = Container.get(LocalStaticImage_Service)
    deckglService.removeMapInstance()
}
