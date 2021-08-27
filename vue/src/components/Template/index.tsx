import { Container } from 'typedi';
import { defineComponent, onBeforeMount, onBeforeUnmount, onMounted, onUnmounted } from 'vue';

// Import all relevant interfaces

/* eslint-disable-next-line */
import template from './index.module.css';
import { ITemplate_ReactiveProps } from './interfaces';

export default defineComponent({
    props: {
        unused: { type: String, required: true }
    },

    setup(props: ITemplate_ReactiveProps) {
        onBeforeMount((): void => {
            return;
        });

        // onMounted(async (): Promise<void> => {
        //     await function()
        // })

        onBeforeUnmount((): void => {
            return;
        });

        onUnmounted((): void => {
            return;
        });

        return (): JSX.Element => html(props);
    }
});

const html = ({ UNUSED }: ITemplate_ReactiveProps): JSX.Element => <div></div>;
