import { Container } from 'typedi';
import { defineComponent, onBeforeMount } from 'vue';

import { Header_Vue } from '@/components';

import { Application_Common_Service } from './common_services/Application/services';

export default defineComponent({
    setup() {
        onBeforeMount(async (): Promise<void> => loadData());
        return (): JSX.Element => html();
    }
});

const html = (): JSX.Element => (
    <>
        <Header_Vue />
        <router-view />
    </>
);

const loadData = async (): Promise<void> => {
    const applicaton_Service = Container.get(Application_Common_Service);
    await applicaton_Service.loadData();
};
