import { Toast } from '@/components/Toast';

export function PlaygroundPage() {
  return (
    <div className="flex flex-col gap-6 p-8">
        <h1 className="text-2xl font-bold text-character-title">Toast</h1>
        <section className="flex flex-col gap-4">
          <Toast message="내용을 입력해주세요" variant="error" />
          <Toast message="저장되었습니다!" variant="success" />
        </section>
    </div>
  );
}
