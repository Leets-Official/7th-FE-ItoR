import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@shared/ui/button';
import { Flex, List, Top } from './index';

function LayoutGallery() {
  return (
    <div className='flex min-h-screen flex-col gap-[3.2rem] bg-[#f5f5f7] p-[3.2rem]'>
      <section className='rounded-[1.6rem] bg-white p-[2.4rem]'>
        <Top.Root>
          <Top.Text>
            <Top.Title>레이아웃 기본 컴포넌트</Top.Title>
            <Top.Description>
              화면 상단 설명 영역과 액션을 한 번에 조합할 수 있습니다.
            </Top.Description>
          </Top.Text>
          <Top.Right>
            <Button shape='pill' variant='accentOutline'>
              더보기
            </Button>
          </Top.Right>
        </Top.Root>
      </section>

      <section className='rounded-[1.6rem] bg-white p-[2.4rem]'>
        <Flex direction='column' gap={16}>
          <Flex align='center' gap={12} justify='between'>
            <span className='text-[1.6rem] font-medium text-[#111111]'>Flex</span>
            <span className='text-[1.4rem] text-[#8f8f8f]'>정렬과 간격을 props로 제어</span>
          </Flex>
          <Flex gap={12} wrap='wrap'>
            <div className='rounded-[1.2rem] bg-[#d8d0fb] px-[1.6rem] py-[1.2rem] text-[1.4rem]'>
              item 1
            </div>
            <div className='rounded-[1.2rem] bg-[#d8d0fb] px-[1.6rem] py-[1.2rem] text-[1.4rem]'>
              item 2
            </div>
            <div className='rounded-[1.2rem] bg-[#d8d0fb] px-[1.6rem] py-[1.2rem] text-[1.4rem]'>
              item 3
            </div>
          </Flex>
        </Flex>
      </section>

      <section className='rounded-[1.6rem] bg-white p-[2.4rem]'>
        <List.Root withDivider>
          <List.Item>
            <List.Row>
              <List.Content>
                <List.Title>메뉴 1</List.Title>
                <List.Description>설명 텍스트를 붙일 수 있습니다.</List.Description>
              </List.Content>
              <List.Right>
                <Button variant='text'>이동</Button>
              </List.Right>
            </List.Row>
          </List.Item>
          <List.Item>
            <List.Row>
              <List.Content>
                <List.Title>메뉴 2</List.Title>
                <List.Description>리스트 아이템 액션 영역 예시입니다.</List.Description>
              </List.Content>
              <List.Right>
                <Button shape='pill' variant='neutral'>
                  선택
                </Button>
              </List.Right>
            </List.Row>
          </List.Item>
        </List.Root>
      </section>
    </div>
  );
}

const meta = {
  title: 'Shared/Layouts',
  component: LayoutGallery,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LayoutGallery>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  render: () => <LayoutGallery />,
};
