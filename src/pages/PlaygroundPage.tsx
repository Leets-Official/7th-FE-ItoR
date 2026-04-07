import { useRef, useState } from 'react';

import { Dropdown } from '@/components/common/DropdownMenu';
import { Modal } from '@/components/common/Modal';
import { Toast } from '@/components/common/Toast';
import { useDisclosure } from '@/hooks';

export function PlaygroundPage() {
  const descriptionModal = useDisclosure();
  const simpleModal = useDisclosure();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('menu 1');

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
    </div>
  );
}
