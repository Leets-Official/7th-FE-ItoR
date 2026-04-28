import { useRef, useState } from 'react';

import { Blank } from '@/components/common/Blank';
import { Button } from '@/components/common/Button';
import { Dropdown } from '@/components/common/DropdownMenu';
import { Modal } from '@/components/common/Modal';
import { Pagination } from '@/components/common/Pagination';
import { PageHeader, PageHeaderLegacy } from '@/components/common/PageHeader';
import { Profile } from '@/components/common/Profile';
import { TextField } from '@/components/common/TextField';
import { TextFieldSet } from '@/components/common/TextFieldSet';
import { Toast } from '@/components/common/Toast';
import { useDisclosure } from '@/hooks';

export function PlaygroundPage() {
  const descriptionModal = useDisclosure();
  const simpleModal = useDisclosure();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('menu 1');
  const [page, setPage] = useState(1);

  return (
    <div className="flex flex-col gap-6 p-8">
      <section className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-character-title">Toast</h1>
        <div className="flex flex-col gap-4">
          <Toast message="내용을 입력해주세요" variant="error" />
          <Toast message="저장되었습니다!" variant="success" />
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-character-title">Modal</h1>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="rounded-sm border border-gray-96 bg-white px-4 py-2 text-sm text-black"
            onClick={descriptionModal.open}
          >
            설명 있는 모달 열기
          </button>
          <button
            type="button"
            className="rounded-sm border border-gray-96 bg-white px-4 py-2 text-sm text-black"
            onClick={simpleModal.open}
          >
            설명 없는 모달 열기
          </button>
        </div>
        <Modal
          isOpen={descriptionModal.isOpen}
          onClose={descriptionModal.close}
          title={'Title line one\nTitle line two'}
          description={'description line one\ndescription line two'}
        />
        <Modal
          isOpen={simpleModal.isOpen}
          onClose={simpleModal.close}
          title={'Title line one\nTitle line two'}
        />
      </section>
      <section className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-character-title">Dropdown</h1>
        <div className="flex flex-col gap-8">
          <Dropdown
            label="메뉴"
            value={selectedValue}
            options={['menu 1', 'menu 2']}
            isOpen={isDropdownOpen}
            dropdownRef={dropdownRef}
            onToggle={() => setIsDropdownOpen((prev) => !prev)}
            onSelect={(value) => {
              setSelectedValue(value);
              setIsDropdownOpen(false);
            }}
          />
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-character-title">PageHeader</h1>
        <div className="flex flex-col gap-6">
          <div className="rounded-md border border-gray-90">
            <PageHeader type="main" />
          </div>
          <div className="rounded-md border border-gray-90">
            <PageHeader type="detail" />
          </div>
          <div className="rounded-md border border-gray-90">
            <PageHeader type="write" />
          </div>
          <div className="rounded-md border border-gray-90">
            <PageHeaderLegacy />
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-character-title">Blank</h1>
        <div className="flex flex-col gap-2 bg-[#cbc5e8] p-5">
          <Blank size={20} />
          <Blank size={32} />
          <Blank size={64} />
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-character-title">Pagination</h1>
        <div className="bg-[#cbc5e8] p-4">
          <Pagination page={page} totalPages={5} onPageChange={setPage} />
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-character-title">Button</h1>
        <div className="flex flex-col gap-6 bg-[#cbc5e8] p-5">
          <div className="flex flex-wrap items-center gap-4">
            <Button intent="primary">깃로그 시작하기</Button>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Button intent="gray">깃로그 시작하기</Button>
            <Button intent="gray" pressed>
              깃로그 시작하기
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Button intent="gray" disabled>
              깃로그 시작하기
            </Button>
            <Button intent="gray" pressed disabled>
              깃로그 시작하기
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Button intent="dark">
              깃로그 시작하기
            </Button>
            <Button intent="dark" pressed>
              깃로그 시작하기
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Button size="text" intent="gray">
              깃로그 시작하기
            </Button>
            <Button size="text" intent="gray" pressed disabled>
              깃로그 시작하기
            </Button>
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-character-title">Profile</h1>
        <div className="flex items-end gap-8 bg-[#cbc5e8] p-5">
          <Profile size={1} />
          <Profile size={2} />
          <Profile size={3} />
          <Profile size={4} />
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-character-title">TextField</h1>
        <div className="flex flex-col gap-6 bg-[#cbc5e8] p-5">
          <div className="flex flex-col gap-2">
            <span className="text-sm text-gray-56">32</span>
            <div className="flex flex-col gap-3">
              <TextField size={32} state="default" placeholder="Text filed" />
              <TextField size={32} state="input" value="Text filed" readOnly />
              <TextField size={32} state="click" value="Text filed" readOnly />
              <TextField size={32} state="disabled" placeholder="Text filed" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm text-gray-56">14</span>
            <div className="flex flex-col gap-3">
              <TextField size={14} state="default" placeholder="Text filed" />
              <TextField size={14} state="input" value="Text filed" readOnly />
              <TextField size={14} state="click" value="Text filed" readOnly />
              <TextField size={14} state="disabled" placeholder="Text filed" />
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-character-title">TextFieldSet</h1>
        <div className="flex flex-col gap-1 bg-[#cbc5e8] p-5">
          <TextFieldSet placeholder="Text filed" />
          <TextFieldSet placeholder="Text filed" showHelperText helperText="* 주의 문구" />
        </div>
      </section>
    </div>
  );
}
