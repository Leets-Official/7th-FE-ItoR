import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconAdd } from '@shared/assets/icons';
import { Button } from './button';

function ButtonGallery() {
  return (
    <div className='flex w-[42rem] flex-wrap gap-x-[1.2rem] gap-y-[1.6rem] bg-[#d8d0fb] p-[2rem]'>
      <Button shape='pill' startIcon={<IconAdd />} variant='accentOutline'>
        깃로그 시작하기
      </Button>
      <Button shape='pill' startIcon={<IconAdd />} variant='neutralOutline'>
        깃로그 시작하기
      </Button>
      <Button disabled shape='pill' startIcon={<IconAdd />} variant='neutralOutline'>
        깃로그 시작하기
      </Button>
      <Button shape='pill' startIcon={<IconAdd />} variant='neutral'>
        깃로그 시작하기
      </Button>
      <Button disabled shape='pill' startIcon={<IconAdd />} variant='neutral'>
        깃로그 시작하기
      </Button>
      <Button shape='pill' startIcon={<IconAdd />} variant='dark'>
        깃로그 시작하기
      </Button>
      <Button disabled shape='pill' startIcon={<IconAdd />} variant='dark'>
        깃로그 시작하기
      </Button>
      <Button startIcon={<IconAdd />} variant='text'>
        깃로그 시작하기
      </Button>
      <Button disabled startIcon={<IconAdd />} variant='text'>
        깃로그 시작하기
      </Button>
    </div>
  );
}

const meta = {
  title: 'Shared/UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    children: '버튼',
    variant: 'outline',
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Outline: Story = {};

export const Danger: Story = {
  args: {
    children: '삭제하기',
    variant: 'danger',
  },
};

export const Disabled: Story = {
  args: {
    children: '비활성화',
    disabled: true,
  },
};

export const Variants: Story = {
  render: () => <ButtonGallery />,
};
