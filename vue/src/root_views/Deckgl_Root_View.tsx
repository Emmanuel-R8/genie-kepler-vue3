import { Container } from 'typedi';
import { computed, ComputedRef, defineComponent } from 'vue';

import { Deckgl_Vue, Footer_Vue, Hexagon_Vue, Modal_Vue } from '@/components';
import { deckgl_Config } from '../components/Deckgl/config';
import { IModal_ReactiveProps } from '../components/Modal/interfaces';
import { Modal_Service } from '../components/Modal/services';

export default defineComponent({
    setup() {
        /* prettier-ignore */
        const { settings: { canvas, container } } = deckgl_Config
        const modalState = getModalState();
        return (): JSX.Element => html(modalState.value, canvas, container);
    }
});

const html = ({ isActive }: IModal_ReactiveProps, canvas: string, container: string): JSX.Element => (
    <>
        <Deckgl_Vue canvas={canvas} container={container} />
        <Modal_Vue isActive={isActive} />
        <Hexagon_Vue />
        <Footer_Vue />
    </>
);

const getModalState = (): ComputedRef<IModal_ReactiveProps> => {
    const modalService = Container.get(Modal_Service);
    return computed((): IModal_ReactiveProps => modalService.state);
};
