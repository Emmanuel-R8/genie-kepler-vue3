import { trails_Config } from './config';
import { trail } from './index.module.css';

import { defineComponent } from 'vue';

export default defineComponent({
    setup() {
        return (): JSX.Element => html();
    }
});

const html = (): JSX.Element => (
    <select class={`trails ${trail}`}>
        {trails_Config.map(({ name }) => (
            <option key={name}>{name}</option>
        ))}
    </select>
);
