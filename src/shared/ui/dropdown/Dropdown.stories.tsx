import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Dropdown } from './index';

function DropdownDemo({ itemCount = 1 }: { itemCount?: 1 | 2 }) {
  return (
    <div className='min-h-screen bg-[#d8d0fb] p-[4rem]'>
      <Dropdown.Root align='end' defaultOpen>
        <Dropdown.Trigger className='sr-only'>open</Dropdown.Trigger>
        <Dropdown.Content className='static translate-y-0'>
          <Dropdown.Item>menu 1</Dropdown.Item>
          {itemCount === 2 ? <Dropdown.Item>menu 1</Dropdown.Item> : null}
        </Dropdown.Content>
      </Dropdown.Root>
    </div>
  );
}

function ControlledDropdownDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className='min-h-screen bg-[#d8d0fb] p-[4rem]'>
      <Dropdown.Root open={open} onOpenChange={setOpen}>
        <button
          className='rounded-full border border-[#9f9f9f] bg-white px-[1.6rem] py-[0.8rem] text-[1.4rem] text-[#111111]'
          type='button'
          onClick={() => setOpen((prev) => !prev)}
        >
          external open
        </button>
        <Dropdown.Content>
          <Dropdown.Item>menu 1</Dropdown.Item>
          <Dropdown.Item>menu 2</Dropdown.Item>
        </Dropdown.Content>
      </Dropdown.Root>
    </div>
  );
}

const meta = {
  title: 'Shared/UI/Dropdown',
  component: DropdownDemo,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DropdownDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SingleItem: Story = {
  render: () => <DropdownDemo itemCount={1} />,
};

export const TwoItems: Story = {
  render: () => <DropdownDemo itemCount={2} />,
};

export const Controlled: Story = {
  render: () => <ControlledDropdownDemo />,
};
