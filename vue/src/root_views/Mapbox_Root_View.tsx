import { Container } from 'typedi';
import { computed, ComputedRef, defineComponent } from 'vue';

import { LayerElements_Vue, Mapbox_Vue, Modal_Vue, Trails_Vue } from '@/components';
import { mapbox_Config } from '../components/Mapbox/config';
import { IModal_ReactiveProps } from '../components/Modal/interfaces';
import { Modal_Service } from '../components/Modal/services';

export default defineComponent({
    setup() {
        const { container } = mapbox_Config.reactiveProps;
        const modalState = getModalState();
        return (): JSX.Element => html(modalState.value, container);
    }
});

const html = ({ isActive }: IModal_ReactiveProps, container: string): JSX.Element => (
    <>
        <Mapbox_Vue container={container} />
        <Modal_Vue isActive={isActive} />
        <LayerElements_Vue />
        <Trails_Vue />
    </>
);

const getModalState = (): ComputedRef<IModal_ReactiveProps> => {
    const modalService = Container.get(Modal_Service);
    return computed((): IModal_ReactiveProps => modalService.state);
};
