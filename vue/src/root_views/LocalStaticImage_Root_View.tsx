import { Container } from 'typedi'
import { computed, ComputedRef, defineComponent } from 'vue'

// // import { LocalStaticImageVue } from '@/components'
import { localStaticImage_Config } from '../components/LocalStaticImage/config'

export default defineComponent({
    setup() {
        /* prettier-ignore */
        const { settings: { filename } } = localStaticImage_Config
        return (): JSX.Element => html(filename)
    }
})

const html = (filename: string): JSX.Element => (
    <>
        {/* <MapboxVue container={container} />
        <ModalVue isActive={isActive} />
        <LayerElementsVue />
        <TrailsVue /> */}
    </>
)
