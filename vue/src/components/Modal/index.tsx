import { defineComponent } from 'vue'

import { IModal } from '@/interfaces'
import { active, inactive } from './index.module.css'

export default defineComponent({
    props: {
        isActive: { type: Boolean, required: true }
    },

    setup(props: IModal) {
        return (): JSX.Element => html(props)
    }
})

const html = ({ isActive }: IModal): JSX.Element => <div class={isActive ? active : inactive}></div>
