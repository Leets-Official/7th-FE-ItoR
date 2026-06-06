import { useRef, useState } from 'react';
import { Blank } from '@/components/common/Blank';
import { Button } from '@/components/common/Button';
import { Dropdown } from '@/components/common/DropdownMenu';
import { Modal } from '@/components/common/Modal';
import { Pagination } from '@/components/common/Pagination';
import { PageHeader, PageHeaderLegacy } from '@/components/common/PageHeader';
import { ProfileCard } from '@/components/common/ProfileCard';
import { Profile } from '@/components/common/Profile';
import { TextField } from '@/components/common/TextField';
import { TextFieldSet } from '@/components/common/TextFieldSet';
import { Toast } from '@/components/common/Toast';
import { useDisclosure } from '@/hooks';

export function PlaygroundShowcase() {
  const descriptionModal = useDisclosure();
  const simpleModal = useDisclosure();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('menu 1');
  const [page, setPage] = useState(1);

  return (
    <div className="flex flex-col gap-6 p-8">
      <section className="flex flex-col gap-4"><h1 className="text-2xl font-bold text-character-title">Toast</h1><Toast message="내용을 입력해주세요" variant="error" /><Toast message="저장되었습니다!" variant="success" /></section>
      <section className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-character-title">Modal</h1>
        <div className="flex items-center gap-3"><button type="button" className="rounded-sm border border-gray-96 bg-white px-4 py-2 text-sm text-black" onClick={descriptionModal.open}>설명 있는 모달 열기</button><button type="button" className="rounded-sm border border-gray-96 bg-white px-4 py-2 text-sm text-black" onClick={simpleModal.open}>설명 없는 모달 열기</button></div>
        <Modal isOpen={descriptionModal.isOpen} onClose={descriptionModal.close} title={'Title line one\nTitle line two'} description={'description line one\ndescription line two'} />
        <Modal isOpen={simpleModal.isOpen} onClose={simpleModal.close} title={'Title line one\nTitle line two'} />
      </section>
      <section className="flex flex-col gap-4"><h1 className="text-2xl font-bold text-character-title">Dropdown</h1><Dropdown label="메뉴" value={selectedValue} options={['menu 1', 'menu 2']} isOpen={isDropdownOpen} dropdownRef={dropdownRef} onToggle={() => setIsDropdownOpen((prev) => !prev)} onSelect={(value) => { setSelectedValue(value); setIsDropdownOpen(false); }} /></section>
      <section className="flex flex-col gap-4"><h1 className="text-2xl font-bold text-character-title">PageHeader</h1><div className="rounded-md border border-gray-90"><PageHeader type="main" /></div><div className="rounded-md border border-gray-90"><PageHeader type="detail" /></div><div className="rounded-md border border-gray-90"><PageHeader type="write" /></div><div className="rounded-md border border-gray-90"><PageHeaderLegacy /></div></section>
      <section className="flex flex-col gap-4"><h1 className="text-2xl font-bold text-character-title">Blank</h1><div className="flex flex-col gap-2 bg-[#cbc5e8] p-5"><Blank size={20} /><Blank size={32} /><Blank size={64} /></div></section>
      <section className="flex flex-col gap-4"><h1 className="text-2xl font-bold text-character-title">Pagination</h1><div className="bg-[#cbc5e8] p-4"><Pagination page={page} totalPages={5} onPageChange={setPage} /></div></section>
      <section className="flex flex-col gap-4"><h1 className="text-2xl font-bold text-character-title">Button</h1><Button intent="primary">깃로그 시작하기</Button></section>
      <section className="flex flex-col gap-4"><h1 className="text-2xl font-bold text-character-title">Profile</h1><div className="flex items-end gap-8 bg-[#cbc5e8] p-5"><Profile size={1} /><Profile size={2} /><Profile size={3} /><Profile size={4} /></div></section>
      <section className="flex flex-col gap-4"><h1 className="text-2xl font-bold text-character-title">ProfileCard</h1><div className="flex gap-6 bg-[#cbc5e8] p-5"><ProfileCard /><ProfileCard variant="member" caption="%{한 줄 소개}" /></div></section>
      <section className="flex flex-col gap-4"><h1 className="text-2xl font-bold text-character-title">TextField</h1><TextField size={14} state="default" placeholder="Text filed" /></section>
      <section className="flex flex-col gap-4"><h1 className="text-2xl font-bold text-character-title">TextFieldSet</h1><TextFieldSet placeholder="Text filed" /></section>
    </div>
  );
}
