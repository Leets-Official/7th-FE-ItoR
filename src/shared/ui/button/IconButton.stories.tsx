import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconAdd } from '@shared/assets/icons';
import { IconButton } from './IconButton';

function IconButtonGallery() {
  return (
    <div className='flex items-center gap-[1.6rem]'>
      <IconButton aria-label='추가' icon={<IconAdd />} variant='ghost' />
      <IconButton aria-label='추가' icon={<IconAdd />} variant='outline' />
      <IconButton aria-label='추가' icon={<IconAdd />} variant='danger' />
      <IconButton aria-label='추가' icon={<IconAdd />} shape='circle' size='lg' variant='outline' />
    </div>
  );
}

const meta = {
  title: 'Shared/UI/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    'aria-label': '추가',
    icon: <IconAdd />,
    size: 'md',
    shape: 'square',
    variant: 'ghost',
  },
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => <IconButtonGallery />,
};
