import { render } from "@testing-library/vue";
import Battle from './Battle';

test('increments value on click', async () => {
    const { getByText } = render(Battle, { store: { state: {
        war: {
            war: null
        }
    }}});
    return true;
});