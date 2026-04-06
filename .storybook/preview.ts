import type { Preview } from '@storybook/react-vite';
import '../src/apps/styles/styles.css';

const preview: Preview = {
  parameters: {
    controls: {
      expanded: true,
    },
    layout: 'fullscreen',
  },
};

export default preview;
