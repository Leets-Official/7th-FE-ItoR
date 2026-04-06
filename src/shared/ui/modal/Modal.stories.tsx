import type { Meta, StoryObj } from '@storybook/react-vite';
import { ConfirmModal } from './ConfirmModal';

type ModalCardStoryArgs = {
  showDescription: boolean;
};

function ModalCardStory({ showDescription }: ModalCardStoryArgs) {
  return (
    <div className='min-h-screen bg-[#d8d0fb] px-[1.6rem] py-[4rem] sm:px-[3.2rem]'>
      <ConfirmModal
        open
        description={
          showDescription ? (
            <>
              <span className='block'>description line one</span>
              <span className='block'>description line two</span>
            </>
          ) : undefined
        }
        onOpenChange={() => {}}
        overlayClassName='bg-transparent backdrop-blur-0'
        title={
          <>
            <span className='block'>Title line one</span>
            <span className='block'>Title line two</span>
          </>
        }
      />
    </div>
  );
}

const meta = {
  title: 'Shared/UI/Modal',
  component: ModalCardStory,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ModalCardStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithDescription: Story = {
  args: {
    showDescription: true,
  },
  render: (args) => <ModalCardStory {...args} />,
};

export const WithoutDescription: Story = {
  args: {
    showDescription: false,
  },
  render: (args) => <ModalCardStory {...args} />,
};
