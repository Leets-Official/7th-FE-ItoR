import { Toast } from '@/components/Toast';

const toastExamples = [
  {
    id: 'error',
    variant: 'error' as const,
    message: '내용을 입력해주세요',
  },
  {
    id: 'success',
    variant: 'success' as const,
    message: '저장되었습니다!',
  },
];

export function PlaygroundPage() {
  return (
    <main className="min-h-screen bg-gray-96 px-6 py-16">
      <div className="mx-auto flex w-full max-w-[720px] flex-col gap-6 rounded-[32px] bg-white p-10 shadow-lg">
        <h1 className="text-2xl font-bold text-character-title">Toast</h1>

        <section className="flex flex-col gap-4 rounded-3xl border border-dashed border-gray-78 bg-gray-96/60 p-8">
          {toastExamples.map((example) => (
            <div key={example.id} className="flex items-center">
              <Toast message={example.message} variant={example.variant} />
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
