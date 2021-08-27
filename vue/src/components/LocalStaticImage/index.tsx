import { Container } from 'typedi'
import { defineComponent, onBeforeMount, onBeforeUnmount, onMounted, onUnmounted } from 'vue'

// // Import all relevant interfaces
import { ILocalStaticImage_StaticProps, ILocalStaticImage_ReactiveProps } from './interfaces'

/* eslint-disable-next-line */
import { localstaticimage } from './index.module.css'

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

        onMounted((): void => {
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
