import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Pagination } from './Pagination';

function ControlledPaginationDemo() {
  const [page, setPage] = useState(7);

  return (
    <div className='bg-[#d8d0fb] p-[2rem]'>
      <Pagination currentPage={page} totalPages={15} onPageChange={setPage} />
    </div>
  );
}

const meta = {
  title: 'Shared/UI/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    currentPage: 3,
    totalPages: 7,
  },
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ManyPages: Story = {
  args: {
    currentPage: 8,
    totalPages: 20,
  },
};

export const Controlled: Story = {
  render: () => <ControlledPaginationDemo />,
};
