import { useState } from 'react';

import { DropdownMenu } from '@/components/DropdownMenu';
import { Modal } from '@/components/Modal';
import { Toast } from '@/components/Toast';

export function PlaygroundPage() {
  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);
  const [isSimpleModalOpen, setIsSimpleModalOpen] = useState(false);

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
            onClick={() => setIsDescriptionModalOpen(true)}
          >
            설명 있는 모달 열기
          </button>
          <button
            type="button"
            className="rounded-sm border border-gray-96 bg-white px-4 py-2 text-sm text-black"
            onClick={() => setIsSimpleModalOpen(true)}
          >
            설명 없는 모달 열기
          </button>
        </div>
        <Modal
          isOpen={isDescriptionModalOpen}
          onClose={() => setIsDescriptionModalOpen(false)}
          title={'Title line one\nTitle line two'}
          description={'description line one\ndescription line two'}
        />
        <Modal
          isOpen={isSimpleModalOpen}
          onClose={() => setIsSimpleModalOpen(false)}
          title={'Title line one\nTitle line two'}
        />
      </section>
      <section className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-character-title">Dropdown</h1>
        <div className="flex flex-col gap-8">
          <DropdownMenu
            items={[
              { id: 'menu-1', label: 'menu 1' },
              { id: 'menu-2', label: 'menu 2' },
            ]}
          />
        </div>
      </section>
    </div>
  );
}
