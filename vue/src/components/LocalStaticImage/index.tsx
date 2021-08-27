import { Container } from 'typedi'
import { defineComponent, onBeforeMount, onBeforeUnmount, onMounted, onUnmounted } from 'vue'

//
// Global state
//
import { IAbstractReactiveState, IAbstractStaticState } from '../../common_services/State/interfaces'
import { States } from '../../Global_State'

//
// Imports common to all components
//
import { EventListener_Common_Service } from '../../common_services/EventListener/services'

//
// Imports of individual components
//
import { ILocalStaticImage_StaticProps, ILocalStaticImage_ReactiveProps } from './interfaces'

/* eslint-disable-next-line */
import localstaticimage from './index.module.css'

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
            return
        })

        onBeforeUnmount((): void => {
            return
        })

        onUnmounted((): void => {
            return
        })

        return (): JSX.Element => html(props)
    }
})

const html = ({ filename }: ILocalStaticImage_StaticProps): JSX.Element => (
    <>
        <img src={filename} />
    </>
)
