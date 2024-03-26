import { setCustomElementsManifest, type Preview } from "@storybook/web-components";
import customElements from '../src/custom-elements.json';
import '../src';

setCustomElementsManifest(customElements);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
