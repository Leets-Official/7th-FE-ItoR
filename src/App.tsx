import { useState } from 'react';

import { Avatar, Button, Icon, Input, Modal, Pagination, Tag } from './components/common';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(3);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#e9e4ff,_#f8fafc_45%,_#e2e8f0)] p-6 text-slate-900 md:p-10">
      <section className="mx-auto flex max-w-6xl flex-col gap-8">
        <div className="space-y-3">
          <Tag variant="accent">Basic Components</Tag>
          <h1 className="text-4xl font-black tracking-tight">공통 UI 컴포넌트 샘플</h1>
          <p className="max-w-2xl text-sm leading-6 text-slate-600 md:text-base">
            재사용 가능한 버튼, 인풋, 태그, 아바타, 페이지네이션, 모달을 한 화면에서 확인할 수 있도록
            구성했습니다.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-[28px] border-2 border-dashed border-violet-400/80 bg-[#ece6ff]/70 p-6 shadow-xl shadow-slate-200/40 backdrop-blur lg:col-span-2">
            <h2 className="mb-5 text-lg font-semibold">Reference Buttons</h2>

            <div className="grid gap-8 xl:grid-cols-[280px_1fr]">
              <div className="space-y-8">
                <Button
                  variant="status-error"
                  leftIcon={<Icon name="alert-circle" size={22} />}
                  className="h-14 px-5 text-[18px] font-semibold"
                >
                  내용을 입력해주세요
                </Button>

                <Button
                  variant="status-success"
                  leftIcon={<Icon name="check" size={22} />}
                  className="h-14 px-5 text-[18px] font-semibold"
                >
                  저장되었습니다!
                </Button>
              </div>

              <div className="space-y-8">
                <div className="grid gap-5 md:grid-cols-2">
                  <Button
                    variant="cta-outline"
                    leftIcon={<Icon name="edit" size={20} />}
                    className="h-14 justify-start px-7 text-[18px] font-medium"
                  >
                    깃로그 시작하기
                  </Button>

                  <Button
                    variant="cta-outline-muted"
                    leftIcon={<Icon name="edit" size={20} />}
                    className="h-14 justify-start px-7 text-[18px] font-medium"
                  >
                    깃로그 시작하기
                  </Button>

                  <Button
                    variant="cta-outline-muted"
                    leftIcon={<Icon name="edit" size={20} />}
                    className="h-14 justify-start px-7 text-[18px] font-medium opacity-60"
                  >
                    깃로그 시작하기
                  </Button>

                  <Button
                    variant="cta-solid-muted"
                    leftIcon={<Icon name="edit" size={20} />}
                    className="h-14 justify-start px-7 text-[18px] font-medium"
                  >
                    깃로그 시작하기
                  </Button>

                  <Button
                    variant="cta-solid-light"
                    leftIcon={<Icon name="edit" size={20} />}
                    className="h-14 justify-start px-7 text-[18px] font-medium"
                  >
                    깃로그 시작하기
                  </Button>

                  <Button
                    variant="cta-solid-dark"
                    leftIcon={<Icon name="edit" size={20} />}
                    className="h-14 justify-start px-7 text-[18px] font-medium"
                  >
                    깃로그 시작하기
                  </Button>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <Button
                    variant="text-muted"
                    leftIcon={<Icon name="edit" size={18} />}
                    className="justify-start text-[18px] font-medium"
                  >
                    깃로그 시작하기
                  </Button>

                  <Button
                    variant="surface-muted"
                    leftIcon={<Icon name="edit" size={18} />}
                    className="h-9 justify-start px-5 text-[18px] font-medium"
                  >
                    깃로그 시작하기
                  </Button>
                </div>
              </div>
            </div>
          </article>

          <article className="rounded-[28px] border border-white/70 bg-white/80 p-6 shadow-xl shadow-slate-200/50 backdrop-blur">
            <h2 className="mb-4 text-lg font-semibold">Buttons</h2>
            <div className="flex flex-wrap gap-3">
              <Button leftIcon={<Icon name="edit" size={16} />}>작성하기</Button>
              <Button variant="secondary">저장하기</Button>
              <Button variant="outline">미리보기</Button>
              <Button variant="ghost">임시 저장</Button>
              <Button variant="danger">삭제</Button>
            </div>
          </article>

          <article className="rounded-[28px] border border-white/70 bg-white/80 p-6 shadow-xl shadow-slate-200/50 backdrop-blur">
            <h2 className="mb-4 text-lg font-semibold">Inputs</h2>
            <div className="space-y-4">
              <Input
                id="search"
                label="검색"
                placeholder="제목이나 태그를 검색해보세요"
                leftAddon={<Icon name="search" size={16} />}
                helperText="Enter 키로 바로 검색할 수 있어요."
              />
              <Input
                id="email"
                label="이메일"
                placeholder="you@example.com"
                error="올바른 이메일 형식이 아닙니다."
              />
            </div>
          </article>

          <article className="rounded-[28px] border border-white/70 bg-white/80 p-6 shadow-xl shadow-slate-200/50 backdrop-blur">
            <h2 className="mb-4 text-lg font-semibold">Tags & Avatar</h2>
            <div className="mb-5 flex flex-wrap gap-2">
              <Tag variant="default">Frontend</Tag>
              <Tag variant="accent">React</Tag>
              <Tag variant="success">Published</Tag>
              <Tag variant="warning">Draft</Tag>
              <Tag variant="danger">Blocked</Tag>
            </div>

            <div className="flex items-center gap-4">
              <Avatar name="Leets Team" status="online" />
              <Avatar name="Design System" size="lg" />
              <div>
                <p className="font-semibold">Leets Team</p>
                <p className="text-sm text-slate-500">공통 컴포넌트 운영 중</p>
              </div>
            </div>
          </article>

          <article className="rounded-[28px] border border-white/70 bg-white/80 p-6 shadow-xl shadow-slate-200/50 backdrop-blur">
            <h2 className="mb-4 text-lg font-semibold">Pagination & Modal</h2>
            <div className="flex flex-col gap-5">
              <Pagination currentPage={page} totalPages={9} onPageChange={setPage} />
              <Button variant="primary" onClick={() => setIsModalOpen(true)} fullWidth>
                모달 열기
              </Button>
            </div>
          </article>
        </div>
      </section>

      <Modal
        open={isModalOpen}
        title="게시글을 저장할까요?"
        description="지금 저장하면 작성 중인 내용이 초안으로 보관됩니다."
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => setIsModalOpen(false)}
        confirmLabel="저장"
      >
        마지막 수정 시간은 방금 전이며, 저장 후에도 다시 이어서 편집할 수 있습니다.
      </Modal>
    </main>
  );
}

export default App;
