import type { Meta, StoryObj } from '@storybook/react-vite';
import { Header } from './index';

function MenuIcon() {
  return (
    <svg fill='none' viewBox='0 0 24 24'>
      <path
        d='M5 7h14M5 12h14M5 17h14'
        stroke='currentColor'
        strokeLinecap='round'
        strokeWidth='2'
      />
    </svg>
  );
}

function WriteIcon() {
  return (
    <svg fill='none' viewBox='0 0 24 24'>
      <path
        d='M4 17.25V20h2.75L17.8 8.94l-2.75-2.75L4 17.25Zm15.71-9.04a1 1 0 0 0 0-1.42l-2.5-2.5a1 1 0 0 0-1.42 0l-.98.98 3.92 3.92.98-.98Z'
        fill='currentColor'
      />
    </svg>
  );
}

function CommentIcon() {
  return (
    <svg fill='none' viewBox='0 0 24 24'>
      <path
        d='M5 6.5A1.5 1.5 0 0 1 6.5 5h11A1.5 1.5 0 0 1 19 6.5v8A1.5 1.5 0 0 1 17.5 16H9l-4 3v-4.5A1.5 1.5 0 0 1 3.5 13V6.5A1.5 1.5 0 0 1 5 5Z'
        stroke='currentColor'
        strokeLinejoin='round'
        strokeWidth='1.7'
      />
    </svg>
  );
}

function MoreIcon() {
  return (
    <svg fill='none' viewBox='0 0 24 24'>
      <path
        d='M12 6.75a1.25 1.25 0 1 0 0 .001V6.75Zm0 4a1.25 1.25 0 1 0 0 .001v-.001Zm0 4a1.25 1.25 0 1 0 0 .001v-.001Z'
        fill='currentColor'
      />
    </svg>
  );
}

function HeaderGallery() {
  return (
    <div className='flex w-[66rem] flex-col gap-[1rem] bg-[#d8d0fb] p-[0.8rem]'>
      <Header.Root>
        <Header.Left>
          <Header.MenuButton aria-label='메뉴' icon={<MenuIcon />} />
          <Header.Brand>GITLOG</Header.Brand>
        </Header.Left>
        <Header.Right>
          <Header.ActionButton className='gap-[0.4rem] text-[#8f8f8f]'>
            <WriteIcon />
            깃로그 쓰기
          </Header.ActionButton>
        </Header.Right>
      </Header.Root>

      <Header.Root>
        <Header.Left>
          <Header.MenuButton aria-label='메뉴' icon={<MenuIcon />} />
          <Header.Brand>GITLOG</Header.Brand>
        </Header.Left>
        <Header.Right>
          <Header.MenuButton aria-label='댓글' icon={<CommentIcon />} />
          <Header.MenuButton aria-label='더보기' icon={<MoreIcon />} />
        </Header.Right>
      </Header.Root>

      <Header.Root>
        <Header.Left>
          <Header.MenuButton aria-label='메뉴' icon={<MenuIcon />} />
          <Header.Brand>GITLOG</Header.Brand>
        </Header.Left>
        <Header.Right className='gap-[1.2rem]'>
          <Header.ActionButton tone='danger'>삭제하기</Header.ActionButton>
          <Header.ActionButton>게시하기</Header.ActionButton>
        </Header.Right>
      </Header.Root>
    </div>
  );
}

const meta = {
  title: 'Shared/UI/Header',
  component: Header.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Header.Root>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Variants: Story = {
  render: () => <HeaderGallery />,
};
